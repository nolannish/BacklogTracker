import sql from "@/app/lib/data";

export async function UpdateLastName(id: string, newName: string){
  const results = await sql`UPDATE users SET last_name = ${newName} WHERE id=${id}`;
  return results;
}