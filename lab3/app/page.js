import Header from "@/components/Header";
import Filters from "@/components/Filters";
import { getAllGames, getGameTypes } from "@/lib/games";

export default function HomePage() {
  const games = getAllGames();
  const types = getGameTypes();

  return (
    <main>
      <Header />
      <div className="container">
        <Filters games={games} types={types} />
      </div>
    </main>
  );
}