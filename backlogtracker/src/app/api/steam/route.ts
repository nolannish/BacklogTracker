import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const appid = req.nextUrl.searchParams.get('appid');

  if (!appid) {
    return NextResponse.json(
      { error: 'Missing appid parameter' },
      { status: 400 }
    );
  }

  const res = await fetch(
    `https://store.steampowered.com/api/appdetails?appids=${appid}&l=en`
  );

  const data = await res.json();

  return NextResponse.json(data[appid]);
}