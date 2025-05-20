import { NextRequest, NextResponse } from 'next/server';
import { UpdateEmail } from '../database/updateEmail';

export async function POST(req: NextRequest){
  const { userId, newEmail } = await req.json();

  if (!newEmail) { 
    return NextResponse.json({ error: 'Missing email' }, {status: 400 });
  }

  await UpdateEmail(userId, newEmail);

  return NextResponse.json({ success: true });
}