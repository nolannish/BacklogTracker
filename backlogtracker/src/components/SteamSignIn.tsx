'use client';

import { signIn } from 'next-auth/react';
import { FaSteam } from 'react-icons/fa';

export default function SteamLogin() {
   return (
    <button 
    onClick={() => signIn('steam')}
    className="flex items-center justify-center gap-2 bg-[#171A21] hover:bg-[#1b1f27] text-white px-4 py-2 rounded-lg shadow-md transition active:scale-95"
    >
      <FaSteam size={20} />
      <span>Sign in with Steam</span>
    </button>
   )
}