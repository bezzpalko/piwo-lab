"use client";
import { useState, useEffect } from "react";
import GameCard from "@/components/GameCard";
import Filters from "@/components/Filters";
import { getGamesFromFirestore } from "@/lib/games";

export default function Home() {
  const [games, setGames] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGames() {
      const { games, lastDoc } = await getGamesFromFirestore();
      setGames(games);
      setLastDoc(lastDoc);
      setLoading(false);
    }
    loadGames();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading games...</div>;

  return (
    <main className="container mx-auto p-4">
      <Filters />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      {games.length === 0 && (
        <p className="text-center mt-10">There are no games yet.</p>
      )}
    </main>
  );
}