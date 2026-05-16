"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Filters from "@/components/Filters";
import { getAllGamesFromFirestore } from "@/lib/games";

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [types, setTypes] = useState([]);

  async function loadGames() {
    const allGames = await getAllGamesFromFirestore();
    setGames(allGames);

    const uniqueTypes = [...new Set(allGames.map((g) => g.type).filter(Boolean))];
    setTypes(uniqueTypes);

    setLoading(false);
  }

  useEffect(() => {
    loadGames();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading games...</div>;

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <Filters games={games} types={types} onRefresh={loadGames} />
        {games.length === 0 && (
          <p className="text-center mt-10">There are no games yet.</p>
        )}
      </main>
    </>
  );
}