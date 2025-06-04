// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import Steam from 'next-auth-steam';
import { NextRequest } from 'next/server';

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

  return await NextAuth(req, ctx, {
    providers: [
      Steam(req, {
        clientSecret: process.env.STEAM_API_KEY!,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
  });
}
