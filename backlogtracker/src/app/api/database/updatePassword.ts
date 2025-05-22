import sql from "@/app/lib/data";
import bcrypt from 'bcrypt';

export async function UpdatePassword(id: string, oldPassword: string, newPassword: string){
  const data = await sql`SELECT password FROM users WHERE id=${id}`;
  const hashedPassword = data[0]?.password;
  const isMatch = await bcrypt.compare(oldPassword, hashedPassword);

  if (!isMatch) {
    throw new Error('Incorrect current password');
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  const results = await sql`UPDATE users SET password=${newHashedPassword} WHERE id=${id}`;
  return results;
}