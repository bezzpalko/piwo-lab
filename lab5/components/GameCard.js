"use client";

import Link from "next/link";

export default function GameCard({ game, onBuy }) {
  const imageUrl = game.images?.[0] || "/img/no-image.png";
  const price = game.price_pln != null ? game.price_pln.toFixed(2) : "—";
  const isAvailable = game.available !== false;

  return (
    <article
      className="card"
      style={{
        opacity: isAvailable ? 1 : 0.6,
        filter: isAvailable ? "none" : "grayscale(40%)",
      }}
    >
      <img
        src={imageUrl}
        alt={game.title}
        className="cardImage"
        onError={(e) => {
          e.target.src = "/img/no-image.png";
        }}
      />

      <div className="cardBody">
        <h2>{game.title}</h2>

        <p className="type">{game.type}</p>

        <p>
          <strong>Wydawca:</strong> {game.publisher}
        </p>

        <p>
          <strong>Gracze:</strong> {game.min_players} – {game.max_players}
        </p>

        <p>
          <strong>Czas gry:</strong> {game.avg_play_time_minutes} min
        </p>

        <p className="price">{price} PLN</p>

        {game.is_expansion && <p className="expansion">Dodatek</p>}

        <div style={{ display: "flex", gap: "10px", marginTop: "12px", flexWrap: "wrap" }}>
          <Link href={`/games/${game.id}`} className="detailsButton">
            Zobacz szczegóły
          </Link>

          <button
            onClick={() => onBuy(game.id)}
            disabled={!isAvailable}
            className="detailsButton"
            style={{
              backgroundColor: isAvailable ? "#111" : "#999",
              color: "#fff",
              border: "none",
              cursor: isAvailable ? "pointer" : "not-allowed",
            }}
          >
            {isAvailable ? "Kup teraz" : "Niedostępne"}
          </button>
        </div>
      </div>
    </article>
  );
}