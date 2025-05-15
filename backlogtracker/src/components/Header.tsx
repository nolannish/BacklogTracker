'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		async function fetchUser() {
			const response = await fetch('/api/user');
			if (response.ok) {
				const user = await response.json();
				setIsLoggedIn(user);
			} else {
				setIsLoggedIn(false);
			}
		}
		fetchUser();
	}, []);

	return (
		<header className="bg-white shadow-md w-full">
			<div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<span className="text-3xl">🎮</span>
					<h1 className="text-2xl font-bold text-gray-800">Backlog Tracker</h1>
				</div>
				<nav className="space-x-4">
					{isLoggedIn ? (
						<>
							<Link href="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">
								Dashboard
							</Link>
							<Link href="/library" className="text-gray-600 hover:text-blue-600 font-medium">
								My Games
							</Link>
							<Link href="/settings" className="text-gray-600 hover:text-blue-600 font-medium">
								Settings
							</Link>
							<button
								onClick={async () => {
									await fetch('/api/logout', { method: 'POST' });
									window.location.href = '/';
								}}
								className="text-red-600 hover:text-red-800 font-medium"
							>
								Logout
							</button>
						</>
					) : (
						<>
							<Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium">
								About
							</Link>
							<Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium">
								Login
							</Link>
							<Link href="/register" className="text-gray-600 hover:text-blue-600 font-medium">
								Register
							</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	);
}
