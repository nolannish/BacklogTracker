import { NextRequest, NextResponse } from 'next/server';
import { UpdateLastName } from '../database/updateLastName';

export async function POST(req: NextRequest){
  const { userId, newName } = await req.json();

  if(!newName){
    return NextResponse.json({ error: 'Missing last name' }, { status:400 });
  }

  await UpdateLastName(userId, newName);

  return NextResponse.json({ success: true });
}