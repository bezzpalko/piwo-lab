"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";
import { buyGameInFirestore } from "@/lib/games";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, game) => sum + (game.price_pln || 0), 0);

  const handleCheckout = async () => {
    try {
      for (const game of cart) {
        await buyGameInFirestore(game.id);
      }
      alert("Zamówienie zostało pomyślnie złożone!");
      clearCart();
    } catch (error) {
      console.error(error);
      alert("Wystąpił błąd podczas składania zamówienia.");
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-4" style={{ maxWidth: "800px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Twój koszyk</h1>

        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>Twój koszyk jest pusty.</p>
            <Link 
              href="/" 
              style={{ 
                padding: "10px 20px", 
                backgroundColor: "#0070f3", 
                color: "white", 
                borderRadius: "5px", 
                textDecoration: "none" 
              }}
            >
              Wróć do sklepu
            </Link>
          </div>
        ) : (
          <div>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {cart.map((game) => (
                <li key={game.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ccc", padding: "15px 0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <img 
                      src={game.images?.[0] || "/img/no-image.png"} 
                      alt={game.title} 
                      style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "5px" }} 
                      onError={(e) => { e.target.src = "/img/no-image.png"; }}
                    />
                    <div>
                      <h3 style={{ margin: 0 }}>{game.title}</h3>
                      <p style={{ margin: 0, color: "#666" }}>{game.price_pln?.toFixed(2)} PLN</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(game.id)}
                    style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Usuń
                  </button>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ margin: 0 }}>Razem: {total.toFixed(2)} PLN</h2>
              <button 
                onClick={handleCheckout}
                style={{ backgroundColor: "#28a745", color: "white", border: "none", padding: "15px 30px", borderRadius: "5px", fontSize: "1.1rem", cursor: "pointer", fontWeight: "bold" }}
              >
                Złóż zamówienie
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}