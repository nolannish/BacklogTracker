import { NextRequest, NextResponse } from 'next/server';
import { DeleteAccount } from '../database/deleteAccount';

export async function POST(req: NextRequest){
  const { userId } = await req.json();

  if(!userId){
    return NextResponse.json({ error: 'No account selected for deletion' }, { status: 400 });
  }

  await DeleteAccount(userId);

  const response = NextResponse.json({ success: true });

  response.cookies.delete('auth_token');

  return response;
}