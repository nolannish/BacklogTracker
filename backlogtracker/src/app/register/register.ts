'use server';

import sql from "../lib/data";

export default async function registerUser(formData: FormData) {
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const users = await sql`insert into users (first_name, last_name, email, password) values (${firstName}, ${lastName}, ${email}, ${password}) returning *`
    return users
}