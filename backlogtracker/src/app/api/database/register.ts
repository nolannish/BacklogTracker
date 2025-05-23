'use server';

import sql from "../../lib/data";
import bcrypt from "bcrypt";

export async function RegisterUser(firstName: string, lastName: string, email: string, password: string) {
    // const firstName = formData.get('firstName') as string;
    // const lastName = formData.get('lastName') as string;
    // const email = formData.get('email') as string;
    // const password = formData.get('password') as string;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const users = await sql`insert into users (first_name, last_name, email, password) values (${firstName}, ${lastName}, ${email}, ${hashedPassword}) returning *`
    return users
}