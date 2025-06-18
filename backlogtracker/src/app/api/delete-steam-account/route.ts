import { NextRequest, NextResponse } from 'next/server';
import { DeleteSteamAccount } from '../database/deleteSteamAccount';

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ success: false, message: 'No steam linked account selected for deletion' }, { status: 400 });
  }

  try {
    const results = await DeleteSteamAccount(userId);

    if(!results) {
      return NextResponse.json({ success: false, message: 'Failed to delete steam linked account' }, {status: 500 });
    }

    const response = NextResponse.json({ success: true, message: 'Steam linked account deleted successfully!' }, { status: 200 });

    response.cookies.delete('auth_token');

    return response;
  } catch (error) {
    console.error("Error deleting steam account: ", error);
    return NextResponse.json({ success: false, message: 'An error occurred while deleting steam linked account' }, { status: 500 });
  }
}