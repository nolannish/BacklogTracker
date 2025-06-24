import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const STEAM_API_KEY = process.env.STEAM_API_KEY!;
const JWT_SECRET = process.env.JWT_SECRET!;

interface AuthTokenPayload {
  id: string;
  username: string;
  steamId?: string;
}

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get('auth_token')?.value;

  if (!cookie) {
    return NextResponse.json({ error: 'Missing auth token' }, { status: 401 });
  }

  let steamId: string | undefined;

  try {
    const decoded = jwt.verify(cookie, JWT_SECRET) as AuthTokenPayload;
    steamId = decoded.steamId;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }

  if (!steamId) {
    return NextResponse.json({ error: 'No Steam ID associated with user' }, { status: 400 });
  }

  const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${steamId}&include_appinfo=1&include_played_free_games=1`;

  console.log('calling steam api with url: ', url);
  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data.response, { status: 200 });
  } catch (error) {
    console.error('Error fetching steam library: ', error);
    return NextResponse.json({ error: 'Failed to fetch Steam Library' }, { status: 500 });
  }
}
