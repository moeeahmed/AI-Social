import { NextResponse } from "next/server";

export async function POST(req: Request) {
  //Check if API is in env file
  if (!process.env.FACEBOOK_TOKEN) {
    return NextResponse.json(
      { output: "Missing Facebook token" },
      { status: 500 }
    );
  }

  const request = await req.json();
  const { mediaId } = request;

  try {
    const url = `https://graph.facebook.com/v21.0/${mediaId}/insights?metric=impressions%2Creach&access_token=${process.env.FACEBOOK_TOKEN}`;

    const response = await fetch(url);

    const theResponse = await response.json();

    //In the case where there is no response from API
    if (!theResponse) {
      return NextResponse.json({ data: "No results found" }, { status: 200 });
    }

    return NextResponse.json(
      {
        impressions: { ...theResponse.data["0"] },
        reach: { ...theResponse.data["1"] },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.json(
      { data: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
