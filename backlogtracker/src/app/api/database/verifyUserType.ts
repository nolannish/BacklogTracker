import sql from "@/app/lib/data";

export async function VerifyUserType(userId: string) {
  let userType: string;

  try{
    const result1 = await sql`SELECT * FROM users WHERE id = ${userId}`;
    const result2 = await sql`SELECT * FROM steamusers WHERE id = ${userId}`;

    if (result1.length > 0) {
      userType = 'users';
    } else if (result2.length > 0) {
      userType= 'steamusers';
    } else {
      userType = 'unknown';
    }

    return userType;
  } catch (error) {
    console.error('Error verifying user type: ', error);
    userType = 'error';
    return userType;
  }
}