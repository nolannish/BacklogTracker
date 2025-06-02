import Header from '@/components/Header'
import authenticateUser from '../api/auth/authentication';
import GameCard from '@/components/GameCard';
import { fetchGameDetails } from '../lib/steam/steam';

export default async function Dashboard() {
  await authenticateUser();
  const gameData = await fetchGameDetails('1245620');

  const games = [
    {
      title: "Elden Ring",
      coverUrl: "https://shared.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg?t=1748630546",
      description: "elden ring go brrrrr",
      genres: ['soulslike', 'actions', 'rpg'],
      status: "Completed"
    },
    {
      title: gameData.title,
      coverUrl: gameData.coverUrl,
      description: gameData.description,
      genres: gameData.genres,
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Header />
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard!</h1>
          <p>Your authentication is working successfully!</p>
        </div>
        <div className="space-y-4 p-4 max-w-4xl mx-auto">
          {games.map((game) => (
            <GameCard key={game.title} {...game} />
          ))}
        </div>
      </div>
    </>
  )
}
