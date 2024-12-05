import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  //Check if API is in env file
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { output: "Missing OpenAI API key" },
      { status: 500 }
    );
  }

  try {
    const prompt = await req.json();

    //Check if the prompt has been passed
    if (!prompt || !prompt.text) {
      return NextResponse.json(
        { output: "Invalid request: Missing prompt text." },
        { status: 400 }
      );
    }

    const response = await new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    }).chat.completions.create({
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

    //In the case where there is no response from API
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
