'use server';

import sql from "../lib/data";
import bcrypt from "bcrypt";

export default async function LoginUser(formData: FormData){
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if(!email){
        return { success: false, error: "Missing email" };
    }

    if(!password){
        return { success: false, error: "Missing password"}
    }
    
    try{
        const users = await sql`
            select * from users where email = ${email}`;
        if(users.length > 0) {
            const user = users[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return { success: false, error: "Invalid password" };
            }
            return { success: true };
        } else {
            return { success: false, error: "Invalid email or password" };
        }
    } catch (error) { 
        console.error("Login error: ", error);
        return { success: false, error: "Server error, please try again later." };
    }
}