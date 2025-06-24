// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import Steam from 'next-auth-steam';
import { NextRequest } from 'next/server';
import { SteamSignIn } from '../../database/SteamSignIn';

interface SteamProfile {
  steamid: string;
  personaname: string;
}

export async function GET(req: NextRequest): Promise<Response> {
  return handleAuth(req);
}

export async function POST(req: NextRequest): Promise<Response> {
  return handleAuth(req);
}

async function handleAuth(req: NextRequest): Promise<Response> {
  // 👇 manually reconstruct the ctx that next-auth expects
  const { pathname } = new URL(req.url);
  const nextauth = pathname
    .split('/api/auth/')[1]
    ?.split('/')
    .filter(Boolean) ?? [];

  const ctx = { params: { nextauth } };

  if(!process.env.STEAM_API_KEY) {
    console.error('STEAM_API_KEY is not set in environment variables');
  }

  try {
    return await NextAuth(req, ctx, {
      providers: [
        Steam(req, {
          clientSecret: process.env.STEAM_API_KEY!,
        }),
      ],
      callbacks: {
        async signIn({ profile }) {
          if (!profile || !('steamid' in profile) || !('personaname' in profile)) {
            console.error('Missing or invalid steam profile');
            return false;
          }

          const steamId = (profile as SteamProfile).steamid;
          const username = (profile as SteamProfile).personaname;

          const result = await SteamSignIn(steamId, username);
          return result.success;
        },

        async session({ session, token }) {
          if (session.user) {
            session.user.id = token.sub;
          }
          return session;
        }
      },
      secret: process.env.NEXTAUTH_SECRET,
    });
  } catch (error) {
    console.error('NextAuth error: ', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
