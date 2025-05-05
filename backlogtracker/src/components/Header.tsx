import Link from 'next/link';

export default function Header() {
  return (
  	<header className = "bg-white shadow-md w-full">
    	<div className="max-w-6x1 mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-3xl">🎮</span>
          <h1 className="text-2x1 font-bold text-gray-800">Backlog Tracker</h1>
      	</div>
      	<nav className="space-x-4">
          	<Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">
              	Home
          	</Link>
          	<Link href="/library" className="text-gray-600 hover:text-blue-600 font-medium">
              	My Games
          	</Link>
          	<Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium">
              	About
          	</Link>
          	<Link href="/settings" className="text-gray-600 hover:text-blue-600 font-medium">
              	Settings
          	</Link>
      	</nav>
      </div>
    </header>
  )
}