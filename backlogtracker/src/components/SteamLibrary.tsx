'use client';
import { useEffect, useState } from 'react';

export default function SteamLibrary() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch('/api/steam-library', {
          method: 'GET',
          credentials: 'include' // ✅ important: includes cookies
        });


        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Unknown error');
        }

        const data = await res.json();
        setGames(data.games || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  if (loading) return <p>Loading your Steam library...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Your Steam Games</h2>
      <ul>
        {games.map((game) => (
          <li key={game.appid}>
            {game.name} ({Math.round(game.playtime_forever / 60)} hrs)
          </li>
        ))}
      </ul>
    </div>
  );
}
