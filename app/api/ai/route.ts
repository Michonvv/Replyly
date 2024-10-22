import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { commentText } = await request.json();

    if (!commentText) {
      return NextResponse.json({ error: 'Comment text is required' }, { status: 400 });
    }

    const prompt = `You are replying to a YouTube comment. Keep it short but useful. Here is the comment: "${commentText}"`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a friendly, relatable assistant that generates thoughtful replies to YouTube comments. Be sincere, avoid being overly formal or promotional." },
        { role: "user", content: prompt }
      ],
      max_tokens: 150,
    });

    const aiReply = completion.choices[0].message.content!.trim();

    return NextResponse.json({ aiReply });
  } catch (error) {
    console.error('Error generating AI reply:', error);
    return NextResponse.json({ error: 'Error generating AI reply' }, { status: 500 });
  }
}