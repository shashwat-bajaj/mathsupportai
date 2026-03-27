import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { buildTutorPrompt } from '@/lib/prompts';
import { createAdminSupabase } from '@/lib/supabase-admin';
import { createClient as createAuthClient } from '@/lib/supabase/server';

const DAILY_FREE_LIMIT = 20;

async function getSymbolicCheck(question: string) {
  const checkerUrl = process.env.MATH_CHECKER_URL;
  if (!checkerUrl) return '';

  try {
    const res = await fetch(`${checkerUrl}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: question })
    });

    if (!res.ok) return '';
    const data = await res.json();
    return JSON.stringify(data, null, 2);
  } catch {
    return '';
  }
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  return 'unknown';
}

function buildConversationContext(turns: Array<{ prompt: string; response: string }>) {
  if (!turns.length) return '';

  const recentTurns = turns.slice(-6);

  return recentTurns
    .map(
      (turn, index) => `
Previous turn ${index + 1}
Student/User:
${turn.prompt}

Tutor:
${turn.response}
`
    )
    .join('\n---\n');
}

function makeConversationTitle(question: string) {
  const cleaned = question.replace(/\s+/g, ' ').trim();
  if (!cleaned) return 'New session';
  return cleaned.length > 70 ? `${cleaned.slice(0, 70)}...` : cleaned;
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    const {
      question,
      gradeLevel = 'high-school',
      mode = 'teach',
      email = '',
      audience = 'student',
      conversationId = null
    } = await request.json();

    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'Question is required.' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is missing in .env.local' },
        { status: 500 }
      );
    }

    const authClient = await createAuthClient();
    const {
      data: { user }
    } = await authClient.auth.getUser();

    const supabase = createAdminSupabase();

    const normalizedEmail =
      typeof email === 'string' && email.trim()
        ? email.trim().toLowerCase()
        : user?.email?.toLowerCase() || null;

    const ipAddress = getClientIp(request);
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    let countQuery = supabase
      .from('learner_sessions')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', since);

    if (user?.id) {
      countQuery = countQuery.eq('user_id', user.id);
    } else if (normalizedEmail) {
      countQuery = countQuery.eq('email', normalizedEmail);
    } else {
      countQuery = countQuery.eq('ip_address', ipAddress);
    }

    const { count, error: countError } = await countQuery;

    if (countError) {
      console.error('SUPABASE COUNT ERROR:', countError);
      return NextResponse.json(
        { error: 'Could not verify daily limit.' },
        { status: 500 }
      );
    }

    if ((count || 0) >= DAILY_FREE_LIMIT) {
      return NextResponse.json(
        {
          error: `Free beta limit reached. You can send up to ${DAILY_FREE_LIMIT} tutor requests in a 24-hour period. Please try again later.`
        },
        { status: 429 }
      );
    }

    let activeConversationId: string | null = conversationId;
    let existingTurns: Array<{ prompt: string; response: string }> = [];

    if (activeConversationId) {
      const { data: previousTurns, error: turnsError } = await supabase
        .from('learner_sessions')
        .select('prompt, response, turn_index, created_at')
        .eq('conversation_id', activeConversationId)
        .order('turn_index', { ascending: true })
        .order('created_at', { ascending: true });

      if (turnsError) {
        console.error('SUPABASE LOAD TURNS ERROR:', turnsError);
      } else {
        existingTurns = (previousTurns || []).map((t) => ({
          prompt: t.prompt,
          response: t.response
        }));
      }
    }

    if (!activeConversationId) {
      const { data: conversation, error: conversationError } = await supabase
        .from('learner_conversations')
        .insert({
          user_id: user?.id || null,
          email: normalizedEmail,
          audience,
          title: makeConversationTitle(question)
        })
        .select('id')
        .single();

      if (conversationError || !conversation) {
        console.error('SUPABASE CREATE CONVERSATION ERROR:', conversationError);
        return NextResponse.json(
          { error: 'Could not create conversation.' },
          { status: 500 }
        );
      }

      activeConversationId = conversation.id;
    }

    const symbolicCheck = await getSymbolicCheck(question);
    const conversationContext = buildConversationContext(existingTurns);

    const prompt = buildTutorPrompt({
      question: conversationContext
        ? `${question}\n\nConversation context:\n${conversationContext}`
        : question,
      gradeLevel,
      mode,
      symbolicCheck,
      audience
    });

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      contents: prompt
    });

    const answer = response.text || 'No response returned.';
    const turnIndex = existingTurns.length + 1;

    try {
      await supabase.from('learner_sessions').insert({
        user_id: user?.id || null,
        conversation_id: activeConversationId,
        turn_index: turnIndex,
        email: normalizedEmail,
        ip_address: ipAddress,
        mode,
        level: gradeLevel,
        prompt: question,
        response: answer
      });
    } catch (dbError) {
      console.error('SUPABASE SAVE ERROR:', dbError);
    }

    return NextResponse.json({
      answer,
      conversationId: activeConversationId
    });
  } catch (error: any) {
    console.error('CHAT API ERROR:', error);
    return NextResponse.json(
      { error: error?.message || 'Tutor request failed. Check terminal logs.' },
      { status: 500 }
    );
  }
}