import sql from "@/app/lib/data";

export async function UpdateEmail(id: string, newEmail: string) {
  const results = await sql`UPDATE users SET email=${newEmail} WHERE id=${id}`;
  return results;
}