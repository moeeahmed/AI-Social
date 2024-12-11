import { NextResponse } from "next/server";

export async function GET() {
  //Check if API is in env file
  if (!process.env.INSTAGRAM_TOKEN) {
    return NextResponse.json(
      { output: "Missing Instagram token" },
      { status: 500 }
    );
  }

  try {
    const url = `https://graph.facebook.com/v21.0/${process.env.INSTAGRAM_ACCOUNT}/media?fields=id,caption,media_url,media_type,timestamp,permalink&access_token=${process.env.INSTAGRAM_TOKEN}`;

    const response = await fetch(url);

    const theResponse = await response.json();

    //In the case where there is no response from API
    if (!theResponse) {
      return NextResponse.json({ data: "No results found" }, { status: 200 });
    }

    return NextResponse.json({ data: theResponse.data }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.json(
      { data: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
