"use client";

import { useMemo, useState } from "react";
import GameCard from "./GameCard";

export default function Filters({ games, types }) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [onlyBaseGames, setOnlyBaseGames] = useState(false);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch = game.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesType =
        selectedType === "" || game.type === selectedType;

      const matchesExpansion =
        onlyBaseGames === false || game.is_expansion === false;

      return matchesSearch && matchesType && matchesExpansion;
    });
  }, [games, search, selectedType, onlyBaseGames]);

  return (
    <>
      <section className="filters">
        <input
          type="text"
          placeholder="Szukaj gry po nazwie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input"
        />

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="select"
        >
          <option value="">Wszystkie typy</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <label className="checkboxLabel">
          <input
            type="checkbox"
            checked={onlyBaseGames}
            onChange={(e) => setOnlyBaseGames(e.target.checked)}
          />
          Tylko gry podstawowe
        </label>
      </section>

      <p className="resultsInfo">
        Liczba wyników: {filteredGames.length}
      </p>

      <section className="grid">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))
        ) : (
          <p>Brak wyników dla podanych filtrów.</p>
        )}
      </section>
    </>
  );
}