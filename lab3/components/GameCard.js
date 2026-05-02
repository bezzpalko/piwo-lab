import Link from "next/link";

export default function GameCard({ game }) {
  return (
    <article className="card">
      <img src="/no-image.png" alt={game.title} className="cardImage" />

      <div className="cardBody">
        <h2>{game.title}</h2>

        <p className="type">{game.type}</p>

        <p>
          <strong>Wydawca:</strong> {game.publisher}
        </p>

        <p>
          <strong>Gracze:</strong> {game.min_players} - {game.max_players}
        </p>

        <p>
          <strong>Czas gry:</strong> {game.avg_play_time_minutes} min
        </p>

        <p className="price">{game.price_pln.toFixed(2)} PLN</p>

        {game.is_expansion && <p className="expansion">Dodatek</p>}

        <Link href={`/games/${game.id}`} className="detailsButton">
          Zobacz szczegóły
        </Link>
      </div>
    </article>
  );
}