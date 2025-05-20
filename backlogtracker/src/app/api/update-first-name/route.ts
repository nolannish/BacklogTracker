import { NextRequest, NextResponse } from 'next/server';
import { UpdateFirstName } from '../database/updateFirstName';

export async function POST(req: NextRequest){
  const { userId, newName } = await req.json();

  if(!newName){
    return NextResponse.json({ error: 'Missing first name' }, { status: 400 });
  }

  await UpdateFirstName(userId, newName);

  return NextResponse.json({ success: true });
}