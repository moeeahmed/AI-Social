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
    const url = `https://graph.instagram.com/v21.0/${process.env.INSTAGRAM_ACCOUNT}?fields=id,user_id,username,name,account_type,profile_picture_url,followers_count,follows_count,media_count&access_token=${process.env.INSTAGRAM_TOKEN}`;

    const response = await fetch(url);

    const theResponse = await response.json();

    //In the case where there is no response from API
    if (!theResponse) {
      return NextResponse.json({ data: "No results found" }, { status: 200 });
    }

    //In the case there is a token error
    if (theResponse.error) {
      return NextResponse.json({ data: "Error" }, { status: 498 });
    }

    return NextResponse.json({ data: theResponse }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { data: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
