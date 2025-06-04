import Image from "next/image";
import Link from 'next/link';
import Header from '@/components/Header';
import LoginButton from "@/components/LoginButton";
import RegisterButton from "@/components/RegisterButton";
import SteamLogin from "@/components/SteamSignIn";
import headerAuthentication from "./lib/auth/headerAuthentication";
import { redirect } from 'next/navigation';

export default async function Home() {
  const isLoggedIn = await headerAuthentication();

  if(isLoggedIn) {
    redirect('/dashboard');
  }
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <Header />

      <div className="flex flex-col items-center text-center mt-12 space-y-6">
        <h1 className="text-4xl font-bold text-center mt-8">Manage your backlog with ease</h1>
        <h2 className="text-2xl font-semibold text-center mt-4">Track your games, save money, and actually finish what you start.</h2>
        <LoginButton />
        <RegisterButton />
        <SteamLogin />
      </div>
    </main>
  );
}
