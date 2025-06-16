import sql from "../../lib/data";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function SteamSignIn(id: string, username: string) {
  
  if(!id || !username) {
    return { success: false, error: 'Missing steam ID or username'};
  }

  try{
    const existingUsers = await sql`
      select * from steamusers where steam_id = ${id}`;
    if(existingUsers.length > 0) {
      const user = existingUsers[0];

      const token = jwt.sign(
        { id: user.id, username: user.username},
        JWT_SECRET,
        { expiresIn: '168h' } //7 days
      );

      (await cookies()).set({
        name: 'auth_token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })

      return { success: true };

    } else {
      const newUser = await sql`
        insert into steamusers (steam_id, username) values (${id}, ${username}) returning *`;

      const user = newUser[0];
      
      console.log(user.id);
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '168h' } //7 days
      );

      (await cookies()).set({
        name: 'auth_token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 //7 days
      })
      return { success: true }
    }
  } catch (error) {
    console.error("Steam sing in error: ", error);
    return { success: false, error: "Error signing in with steam, try again later."};
  }
}