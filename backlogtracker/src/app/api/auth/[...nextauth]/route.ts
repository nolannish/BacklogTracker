import NextAuth from 'next-auth';
import SteamProvider from 'next-auth-steam';
import type { NextRequest } from 'next/server';
import { SteamSignIn } from '../../database/SteamSignIn';
 
interface SteamProfile {
  steamid: string;
  personaname: string;
}

interface RouteContext {
  params: {
    nextauth: string[];
  }
}

const handler = async (req: NextRequest, ctx: { params: { nextauth: string[] } }) => {
  return NextAuth(req, ctx, {
    providers: [
      SteamProvider(req, {
        clientSecret: process.env.STEAM_API_KEY!,
      }),
    ],
    callbacks: {
      async signIn({ profile }) {
        if (!profile || !('steamid' in profile) || !('personaname' in profile)) {
          console.error('Missing or invalid Steam profile');
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
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
};


export const GET = async(req: NextRequest, ctx: RouteContext) => {
  return handler(req, ctx);
}

export const POST = async(req: NextRequest, ctx: RouteContext) => {
  return handler(req, ctx);
}
