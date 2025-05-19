'use client';

import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/'); // redirect to home after logout
  };

  const handleCancel = () => {
    router.back(); // go back to previous page
  };

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Are you sure you want to logout?
      </h1>
      <div className="space-x-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-800 px-6 py-2 rounded font-semibold"
        >
          Yes, Logout
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded font-semibold"
        >
          Cancel
        </button>
      </div>
    </main>
  );
}
