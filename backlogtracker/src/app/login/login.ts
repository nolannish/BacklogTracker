'use server';

import sql from "../lib/data";

export default async function LoginUser(formData: FormData){
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    console.log(email, password)

    if(!email){
        return { success: false, error: "Missing email" };
    }

    if(!password){
        return { success: false, error: "Missing password"}
    }
    
    try{
        const users = await sql`
            select * from users where email = ${email} and password = ${password}`;

        if(users.length > 0) {
            return { success: true };
        } else {
            return { success: false, error: "Invalid email or password" };
        }
    } catch (error) { 
        console.error("Login error: ", error);
        return { success: false, error: "Server error, please try again later." };
    }
}