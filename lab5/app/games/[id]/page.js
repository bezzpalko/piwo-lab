"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getGameById, buyGameInFirestore } from "@/lib/games";

export default function GameDetailsPage() {
  const params = useParams();
  const id = params.id;

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGame() {
      try {
        const data = await getGameById(id);
        setGame(data);
      } catch (err) {
        console.error(err);
        setError("Nie udało się pobrać gry.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadGame();
    }
  }, [id]);

  const handleBuy = async () => {
    try {
      await buyGameInFirestore(game.id);
      // Aktualizujemy stan lokalny, aby zablokować przycisk natychmiast po kliknięciu
      setGame((prev) => ({ ...prev, available: false }));
      alert("Gra została pomyślnie kupiona!");
    } catch (err) {
      console.error(err);
      alert("Nie udało się kupić gry.");
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading game...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-600">{error}</div>;
  }

  if (!game) {
    return <div className="p-10 text-center">Game not found.</div>;
  }

  const isAvailable = game.available !== false;

  return (
    <main className="detailsPage">
      <div className="container">
        <Link href="/" className="backLink">
          ← Powrót do listy
        </Link>

        <section className="detailsTop">
          <div className="detailsImages">
            {game.images?.length > 0 ? (
              game.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${game.title} ${index + 1}`}
                  className="detailsImage"
                  onError={(e) => {
                    e.target.src = "/img/no-image.png";
                  }}
                />
              ))
            ) : (
              <img
                src="/img/no-image.png"
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
              <strong>Cena:</strong> {game.price_pln?.toFixed(2)} PLN
            </p>

            <p>
              <strong>Rodzaj:</strong> {game.is_expansion ? "Dodatek" : "Gra podstawowa"}
            </p>

            <button
              onClick={handleBuy}
              disabled={!isAvailable}
              className="detailsButton"
              style={{
                backgroundColor: isAvailable ? "#111" : "#999",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                cursor: isAvailable ? "pointer" : "not-allowed",
                marginTop: "15px",
                borderRadius: "4px",
                display: "block"
              }}
            >
              {isAvailable ? "Kup teraz" : "Niedostępne"}
            </button>

            {game.auction && (
              <div className="auctionBox" style={{ marginTop: "20px" }}>
                <h2>Aukcja</h2>
                <p>
                  <strong>Cena startowa:</strong> {game.auction.starting_price?.toFixed(2)} PLN
                </p>
                <p>
                  <strong>Aktualna oferta:</strong> {game.auction.current_bid?.toFixed(2)} PLN
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
          {game.description?.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </section>
      </div>
    </main>
  );
}