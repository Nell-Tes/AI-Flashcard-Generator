import Groq from "groq-sdk"
import { NextResponse } from 'next/server';

const systemPrompt = `
You are a flashcard creator. Based on the input text, create EXACTLY 20 flashcards. Ensure the output is in the following strict JSON format:

{
  "flashcards": [
    {
      "front": "Front of the card",
      "back": "Back of the card"
    },
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
    // Repeat for exactly 20 flashcards
  ]
}

Both the front and back should be one sentence long.
Replace "Front of the card" and "Back of the card" with the actual content for each flashcard. Ensure there is no additional content or formatting outside this structure.
`;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
    const data = await req.text()

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt }, 
                { role: 'user', content: data },
            ],  
            model: 'llama-3.1-8b-instant',
            temperature: 0.1,
            max_tokens: 4000,
            top_p: 1,
            stream: false,
            stop: null,
            response_format: { type: 'json_object' },
        });

        const content = completion.choices[0]?.message?.content;
        if (!content) {
            throw new Error('No content in response');
        }

        const flashcards = JSON.parse(content);
        return NextResponse.json(flashcards.flashcards);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to generate flashcards' }, { status: 500 });
    }
}