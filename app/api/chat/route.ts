import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { buildTutorPrompt } from '@/lib/prompts';
import { createAdminSupabase } from '@/lib/supabase-admin';

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
      audience = 'student'
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

    const supabase = createAdminSupabase();
    const normalizedEmail =
      typeof email === 'string' && email.trim()
        ? email.trim().toLowerCase()
        : null;

    const ipAddress = getClientIp(request);
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    let countQuery = supabase
      .from('learner_sessions')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', since);

    if (normalizedEmail) {
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

    const symbolicCheck = await getSymbolicCheck(question);

    const prompt = buildTutorPrompt({
      question,
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

    try {
      await supabase.from('learner_sessions').insert({
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

    return NextResponse.json({ answer });
  } catch (error: any) {
    console.error('CHAT API ERROR:', error);
    return NextResponse.json(
      { error: error?.message || 'Tutor request failed. Check terminal logs.' },
      { status: 500 }
    );
  }
}