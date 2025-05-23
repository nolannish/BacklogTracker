import { NextRequest, NextResponse } from 'next/server';
import { RegisterUser } from '../database/register';

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, password } = await req.json();

  if (!firstName || !lastName || !email || !password) {
     return NextResponse.json({ error: 'Missing register information' }, { status: 400 });
  }

  try { 
    await RegisterUser(firstName, lastName, email, password);

    return NextResponse.json({ success: true }) 
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error registering user' });
  }
}