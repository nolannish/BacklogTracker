import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

interface JwtPayload {
  email: string
  id: string
}

export async function GET(req: Request) {
  try {
    // Get the auth token from the cookies
    const cookie = (await cookies()).get('auth_token')?.value
    if (!cookie) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // JWT secret from environment variables
    const secret = process.env.JWT_SECRET
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    // Verify the JWT
    const decoded = jwt.verify(cookie, secret) as JwtPayload;

    // Return the decoded user data (you can adjust what data you send back)
    return NextResponse.json({ email: decoded.email });
  } catch (error) {
    console.error('Error verifying JWT:', error)
    return new NextResponse('Unauthorized', { status: 401 });
  }
}
