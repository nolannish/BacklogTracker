import { NextRequest, NextResponse } from 'next/server';
import { FetchSteamUserData } from '../database/fetchSteamUserData';

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  if(!userId){
    return NextResponse.json({ success: false, message: 'Steam user data cannot be fetched', userData: 'error' } , { status: 400 });
  }

  try{
    const userData = await FetchSteamUserData(userId);
    
    if(!userData) {
      return NextResponse.json({ success: false, message: 'Steam user data not found', userData: 'none' }, { status: 404 });
    }

    if (userData === null) {
      return NextResponse.json({ success: false, message: 'No steam user data for that user id', userData: 'none' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Steam user data found', userData: userData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'error fetching steam user data', userData: 'error' }, { status: 500 });
  }
}