import sql from "@/app/lib/data";

export async function DeleteSteamAccount(id: string) {
  try {
    const results = await sql`DELETE FROM steamusers WHERE id = ${id}`;
    return results;
  } catch (error) {
    console.error('Error deleting steam account: ', error);
    return null;
  }
}