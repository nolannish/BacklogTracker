
import Link from 'next/link';
import headerAuthentication from '@/app/lib/auth/headerAuthentication';


export default async function Header() {
	const isLoggedIn = await headerAuthentication();

	return (
		<header className="bg-white shadow-md w-full">
			<div className="w-full px-8 py-4 flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<span className="text-3xl">🎮</span>
					<h1 className="text-2xl font-bold text-gray-800">Backlog Tracker</h1>
				</div>
				<nav className="flex flex-wrap gap-x-4 sm:gap-x-6 md:gap-x-8">
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
							<Link href="/logout" className="text-red-600 hove:text-red-800 font-medium">
								Logout
							</Link>
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
