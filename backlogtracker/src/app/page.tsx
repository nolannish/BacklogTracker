import Image from "next/image";
import Link from 'next/link';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <Header />"

      <section className="bg-white p-6 rounded-2xl shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
        <p className="text-gray-700">
          This is your personal game backlog manager. Add games, log progress, and stay focused on what you already own.
        </p>

        <div className="mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>

        <Link href="/about" className="block">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
            About
          </button>
        </Link>
      </section>
    </main>
  );
}
