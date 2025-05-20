import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

type JwtPayload = {
  email: string;
  id: string;
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return NextResponse.json({ email: null, id: null }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    return NextResponse.json({
      email: decoded.email,
      userId: decoded.id,
    });
  } catch (error) {
    return NextResponse.json({ email: null, id: null }, { status: 401 });
  }
  // return NextResponse.json({ message: 'Hello'});
}