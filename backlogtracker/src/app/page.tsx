import Image from "next/image";
import Link from 'next/link';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <Header />

      <div className="flex flex-col items-center text-center mt-12 space-y-6">
        <h1 className="text-4xl font-bold text-center mt-8">Manage your backlog with ease</h1>
        <h2 className="text-2xl font-semibold text-center mt-4">Track your games, save money, and actually finish what you start.</h2>
        <Link href="/login">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 active:scale-95 active:bg-blue-800 transition">Log In</button>
        </Link>
        <Link href="/register">
          <button className="bg-green-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-700 active:scale-95 active:bg-green-800 transition">Register</button>
        </Link>
      </div>
    </main>
  );
}
