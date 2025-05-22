import sql from "@/app/lib/data";

export async function DeleteAccount(id: string){
  const results = await sql`DELETE FROM users WHERE id=${id}`;
  return results;
}