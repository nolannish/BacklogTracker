'use client';

import registerUser from "../api/database/register";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import LoginButton from "@/components/LoginButton";
import HomeButton from "@/components/HomeButton";

export default function Register() {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if(!formData.get("firstName")){
      alert("First Name is required");
      return;
    }

    if(!formData.get("lastName")){
      alert("Last name is required");
      return;
    }

    if(!formData.get("email")){
      alert("Email is required");
      return;
    }

    if(!formData.get("password")){
      alert("Password is required");
      return;
    }

    if(!formData.get("confirmPassword")){
      alert("Confirm Password is required");
      return;
    }
    
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await registerUser(formData);
      alert("Account created");
      router.push("/");
    } catch (error) {
      console.error("Registration error: ", error);
      alert("Failed to register user");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      {/* Register Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="absolute top-4 left-4">
          <HomeButton />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm relative">
          <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-vlue-500"
                placeholder="First Name"
                required
              />

              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-vlue-500"
                placeholder="Last Name"
                required
              />

              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-vlue-500"
                placeholder="you@example.com"
                required
              />

              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-vlue-500"
                placeholder="Password"
                required
              />

              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-vlue-500"
                placeholder="Confirm Password"
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-700 active:scale-95 transition"
              >
                Create Account
              </button>
            </div>
          </form>
          <h2 className="text-sm text-gray-500 font-bold mt-4 text-center">
            Already have an account?
          </h2>
          <div className="mt-2 flex justify-center">
            <LoginButton />
          </div>
        </div>
      </div>
    </main>
  );
}
