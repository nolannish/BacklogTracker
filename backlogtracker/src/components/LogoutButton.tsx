'use client';

export default function LogoutButton() {
	const handleLogout = async () => {
		await fetch('/api/logout', { method: 'POST' });
		window.location.href = '/';
	};

	return (
		<button
			onClick={handleLogout}
			className="text-red-600 hover:text-red-800 font-medium"
		>
			Logout
		</button>
	);
}
