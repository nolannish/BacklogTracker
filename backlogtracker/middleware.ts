import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(request: NextRequest){
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
        if(request.nextUrl.pathname.startsWith('/')){
            const loginUrl = new URL('/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
        return NextResponse.next();
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        return NextResponse.next();
    } catch (error) {
        console.error('Invalid JWT: ', error);

        if(request.nextUrl.pathname.startsWith('/')){
            const loginUrl = new URL('/login', request.url);
            return NextResponse.redirect(loginUrl);
        }

        return NextResponse.next();
    }
}