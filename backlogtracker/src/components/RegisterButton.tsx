'use client';

import Link from 'next/link';

export default function RegisterButton(){
  return (
    <Link href="/register">
      <button className="bg-green-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-700 active:scale-95 active:bg-gren-800 transition">Register</button>
    </Link>
  )
}