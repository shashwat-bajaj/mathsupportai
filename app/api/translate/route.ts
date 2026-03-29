import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const ALLOWED_LANGUAGES = new Set([
  'Spanish',
  'Hindi',
  'French',
  'Arabic',
  'Portuguese',
  'Chinese',
  'Russian'
]);

export async function POST(request: NextRequest) {
  try {
    const { text, language } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text is required.' }, { status: 400 });
    }

    if (!language || typeof language !== 'string' || !ALLOWED_LANGUAGES.has(language)) {
      return NextResponse.json({ error: 'Invalid language selection.' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is missing in environment variables.' },
        { status: 500 }
      );
    }

    const prompt = `
You are translating a math explanation into ${language}.

Rules:
- Translate the explanation into ${language}.
- Preserve markdown structure.
- Preserve headings, bullets, and numbering.
- Do NOT translate mathematical equations.
- Do NOT alter LaTeX expressions.
- Do NOT remove or simplify steps.
- Keep the meaning accurate and clear.
- Return only the translated content.

Content to translate:
${text}
`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      contents: prompt
    });

    const translated = response.text || '';

    return NextResponse.json({ translated });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Translation failed.' },
      { status: 500 }
    );
  }
}