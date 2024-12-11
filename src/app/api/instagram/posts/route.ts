import { NextResponse } from "next/server";

export async function GET() {
  //Check if API is in env file
  if (!process.env.FACEBOOK_TOKEN) {
    return NextResponse.json(
      { output: "Missing Facebook token" },
      { status: 500 }
    );
  }

  try {
    const url = `https://graph.facebook.com/v21.0/${process.env.INSTAGRAM_ACCOUNT}/media?fields=id,caption,media_url,media_type,timestamp,permalink&access_token=${process.env.FACEBOOK_TOKEN}`;

    const response = await fetch(url);

    const theResponse = await response.json();

    //In the case where there is no response from API
    if (!theResponse) {
      return NextResponse.json({ data: "No results found" }, { status: 200 });
    }

    //In the case there is a token error
    if (theResponse.error) {
      console.log(theResponse.error);
      return NextResponse.json({ data: "Error" }, { status: 498 });
    }

    return NextResponse.json({ data: theResponse.data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { data: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
