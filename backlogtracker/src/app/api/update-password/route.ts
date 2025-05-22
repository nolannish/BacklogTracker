import { NextRequest, NextResponse } from 'next/server';
import { UpdatePassword } from '../database/updatePassword';

export async function POST(req: NextRequest){
  const { userId, oldPassword, newPassword } = await req.json();

  if (!newPassword || !oldPassword) {
    return NextResponse.json({ error: 'Missing password' }, { status: 400 });
  }

  await UpdatePassword(userId, oldPassword, newPassword);
  
  return NextResponse.json({ success: true });
}