import { cookies } from 'next/headers';
import { redirect} from 'next/navigation';
import jwt from 'jsonwebtoken';

export default async function authenticateUser(){
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if(!token){
    //redirect to unauthorized page if not logged in/authenticated
    redirect('/unauthorized');
  }

  const secret = process.env.JWT_SECRET!;

  try{
    jwt.verify(token, secret);
  } catch (error) {
    //redirect to unauthorized page if token is invalid
    redirect('/unauthorized');
  }
}