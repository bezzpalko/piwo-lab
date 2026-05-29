"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import {
  logout,
  loginWithGoogle,
  loginWithEmail,
  registerWithEmail,
} from "@/lib/auth";

export default function Header() {
  const { user, loading } = useAuth();
  const { cart } = useCart();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleEmailLogin() {
    try {
      setError("");
      await loginWithEmail(email, password);
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Nie udało się zalogować. Sprawdź email i hasło.");
    }
  }

  async function handleEmailRegister() {
    try {
      setError("");
      await registerWithEmail(email, password);
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Nie udało się utworzyć konta.");
    }
  }

  async function handleGoogleLogin() {
    try {
      setError("");
      await loginWithGoogle();
    } catch (err) {
      setError("Logowanie przez Google nie powiodło się.");
    }
  }

  async function handleLogout() {
    try {
      setError("");
      await logout();
    } catch (err) {
      setError("Nie udało się wylogować.");
    }
  }

  return (
    <header className="header">
      <div className="container">
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <h1 style={{ margin: 0 }}>Board Games Market</h1>
            </Link>
            <p style={{ margin: "5px 0 0 0" }}>Przeglądanie, wyszukiwanie i filtrowanie gier planszowych</p>
          </div>

          <Link 
            href="/cart" 
            style={{ 
              backgroundColor: '#750c5e', 
              border: 'none', 
              color: '#fff', 
              padding: "10px 15px", 
              borderRadius: "5px", 
              textDecoration: "none", 
              fontWeight: "bold",
              display: "inline-block"
            }}
          >
            Koszyk ({cart.length})
          </Link>
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          {loading ? (
            <span>Ładowanie...</span>
          ) : user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <span>Zalogowano jako: {user.displayName || user.email}</span>
              <button onClick={handleLogout} style={{ padding: "5px 10px", cursor: "pointer" }}>Wyloguj</button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                maxWidth: "300px",
              }}
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />

              <input
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button onClick={handleEmailLogin} style={{ padding: "5px 10px", cursor: "pointer" }}>Zaloguj</button>
                <button onClick={handleEmailRegister} style={{ padding: "5px 10px", cursor: "pointer" }}>Zarejestruj</button>
                <button onClick={handleGoogleLogin} style={{ padding: "5px 10px", cursor: "pointer" }}>Google</button>
              </div>

              {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}
            </div>
          )}
        </div>

      </div>
    </header>
  );
}