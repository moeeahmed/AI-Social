import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY)
    return NextResponse.json(
      { output: "An error occurred while processing your request." },
      { status: 500 }
    );

  console.log(process.env.OPENAI_API_KEY);

  try {
    const prompt = await req.json();

    if (!prompt || !prompt.text) {
      return NextResponse.json(
        { output: "Invalid request: Missing prompt text." },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: JSON.stringify(prompt),
            },
          ],
        },
      ],
    });

    const theResponse = response.choices[0].message.content;

    if (!theResponse) {
      return NextResponse.json({ output: "No results found" }, { status: 200 });
    }

    return NextResponse.json({ output: theResponse }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.json(
      { output: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
