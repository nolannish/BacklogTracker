'use client';

import LoginUser from "../api/database/login";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import RegisterButton from "@/components/RegisterButton";
import HomeButton from "@/components/HomeButton";
import { useState } from "react";

export default function Login() {
  const router = useRouter();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setEmailError('');
    setPasswordError('');
    setFormError('');

    let hasError = false;

    if(!email || !/\S+@\S+\.\S+/.test(email)) { 
      setEmailError('Please enter a valid email address.');
      hasError = true;
    }

    if(!password){
      setPasswordError('Please enter your password');
    }

    if (hasError) return;

    try{
      const results = await LoginUser(formData);
      if((!results.success)){
        setFormError(results.error || "Invalid email or password");
        return;
      }
      
      router.push("/dashboard");
    } catch (error) {
      console.error("Login Error: ", error);
      alert("Failed to log in. Please check your credentials and try again.");
    }
  }
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      {/* Login Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="absolute top-4 left-4">
          <HomeButton />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm relative">
          <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                required
              />
              {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
              {passwordError && <p className="text-sm text-red-500 mt-1">{passwordError}</p>}
            </div>

            {formError && <p className="text-center text-red-500 text-sm mt-4">{formError}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 active:scale-95 transition"
            >
              Log In
            </button>
          </form>
          <h2 className="text-sm text-gray-500 font-bold mt-4 text-center">
            Don't have an account?
          </h2>
          <div className="mt-2 flex justify-center">
            <RegisterButton />
          </div>
        </div>
      </div>
    </main>
  );
}
