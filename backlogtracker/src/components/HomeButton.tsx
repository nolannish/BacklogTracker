'use client';

import Link from 'next/link';
import { House } from 'lucide-react';

export default function HomeButton() {
	return (
    <Link href="/">
      <button
        aria-label="Home Button"
        className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-md transition-all"
      >
        <House className="w-5 h-5" />
      </button>
    </Link>
	);
}