import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

export default async function headerAuthentication(){
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if(!token) {
    // returns false if not logged in/authenticated
    return false;
  }

  const secret = process.env.JWT_SECRET!;

  //check of token is valid
  try{
    //returns true of token is valid
    jwt.verify(token, secret);
    return true;
  } catch (error) {
    //returns false if token is invalid
    return false;
  }
}