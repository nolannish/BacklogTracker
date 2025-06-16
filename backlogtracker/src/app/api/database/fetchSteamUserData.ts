import sql from "@/app/lib/data";

export async function FetchSteamUserData(id: string) {
  try {
    const results = await sql`SELECT * FROM steamusers WHERE id = ${id}`;
    if (results.length > 0) {
      return results[0];
    } else {
      console.error('No steam user data found for id: ', id);
      return null;
    }
  } catch (error) {
    console.error('Error fetching steam user data: ', error);
    return null;
  }
}