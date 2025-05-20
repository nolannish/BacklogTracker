import sql from "@/app/lib/data";

export async function UpdateFirstName(id: string, newName: string){
  const results = await sql`UPDATE users SET first_name=${newName} WHERE id=${id}`;
  return results;
}