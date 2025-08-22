import { NextResponse } from "next/server";

export async function GET() {
  const url = new URL("https://warpcast.com/~/compose");
  url.searchParams.set("text", "Check out this app");
  url.searchParams.append("embeds[]", "https://farcaster-monad-chi.vercel.app");
  return NextResponse.redirect(url.toString(), 302);
}
