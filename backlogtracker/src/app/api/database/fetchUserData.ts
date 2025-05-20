'use server';

import sql from '../../lib/data';
import bcrypt from 'bcrypt';

export default async function FetchUserData(id: string){
  // console.log("backend: ", id);
  const results = await sql`SELECT * FROM users WHERE id = ${id}`;
  return results[0];
}