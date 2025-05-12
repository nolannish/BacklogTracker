'use server';

import sql from "../lib/data";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET!;

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
            const token = jwt.sign(
                { id: user.id, email: user.email },
                JWT_SECRET,
                { expiresIn: '168h' } // 7 days
            );

            (await cookies()).set({
                name: 'auth_token',
                value: token,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // 7 days
            })
            return { success: true };
        } else {
            return { success: false, error: "Invalid email or password" };
        }
    } catch (error) { 
        console.error("Login error: ", error);
        return { success: false, error: "Server error, please try again later." };
    }
}