import { cookies } from "next/headers";

export async function getToken() {
  const cookieStore = await cookies(); // Await the promise
  const token = cookieStore.get('auth_token')?.value;
  return token || null;
}
