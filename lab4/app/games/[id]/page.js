import Link from "next/link";
import { notFound } from "next/navigation";
import { getGameById } from "@/lib/games";

export default async function GameDetailsPage({ params }) {
  const { id } = await params;
  const game = getGameById(id);

  if (!game) {
    notFound();
  }

  return (
    <main className="detailsPage">
      <div className="container">
        <Link href="/" className="backLink">
          ← Powrót do listy
        </Link>

        <section className="detailsTop">
          <div className="detailsImages">
            {game.images.length > 0 ? (
              game.images.map((_, index) => (
                <img
                  key={index}
                  src="/no-image.png"
                  alt={`${game.title} ${index + 1}`}
                  className="detailsImage"
                />
              ))
            ) : (
              <img
                src="/no-image.png"
                alt={game.title}
                className="detailsImage"
              />
            )}
          </div>

          <div className="detailsInfo">
            <h1>{game.title}</h1>
            <p className="type">{game.type}</p>

            <p>
              <strong>Wydawca:</strong> {game.publisher}
            </p>

            <p>
              <strong>Liczba graczy:</strong> {game.min_players} - {game.max_players}
            </p>

            <p>
              <strong>Średni czas gry:</strong> {game.avg_play_time_minutes} min
            </p>

            <p>
              <strong>Cena:</strong> {game.price_pln.toFixed(2)} PLN
            </p>

            <p>
              <strong>Rodzaj:</strong> {game.is_expansion ? "Dodatek" : "Gra podstawowa"}
            </p>

            {game.auction && (
              <div className="auctionBox">
                <h2>Aukcja</h2>
                <p>
                  <strong>Cena startowa:</strong> {game.auction.starting_price.toFixed(2)} PLN
                </p>
                <p>
                  <strong>Aktualna oferta:</strong> {game.auction.current_bid.toFixed(2)} PLN
                </p>
                <p>
                  <strong>Najwyższy oferent:</strong> {game.auction.highest_bidder_uid}
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="descriptionBox">
          <h2>Opis gry</h2>

          {game.description.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </section>
      </div>
    </main>
  );
}