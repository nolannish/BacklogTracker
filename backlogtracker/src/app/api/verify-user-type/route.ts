import { NextRequest, NextResponse } from 'next/server';
import { VerifyUserType } from '../database/verifyUserType';

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  try {
    const userType = await VerifyUserType(userId);

    if (!userType) {
      return NextResponse.json({ success: false, message: 'User type not found', userType: 'error' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'User type verified', userType: userType}, { status: 200 })
  } catch (error) {
    console.error('Error verifying user type: ', error);
    return NextResponse.json({ success: false, message: 'Error verifying user type', userType: 'error' }, { status: 500 });
  }
}