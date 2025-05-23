import { NextRequest, NextResponse } from 'next/server';
import { LoginUser } from '../database/login';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing login information' }, { status: 400 });
  }

  try {
    await LoginUser(email, password);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error during login' });
  }
}