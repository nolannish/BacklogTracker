'use client';

import Link from 'next/link';

export default function LoginButton() {
	return (
		<Link href="/login">
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 active:scale-95 active:bg-blue-800 transition">Log In</button>
    </Link>
	)
}
