import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ sucess: true });

    response.cookies.delete('auth_token');

    return response;
}