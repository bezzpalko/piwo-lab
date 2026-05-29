"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  logout,
  loginWithGoogle,
  loginWithEmail,
  registerWithEmail,
} from "@/lib/auth";

export default function Header() {
  const { user, loading } = useAuth();

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
        <h1>Board Games Market</h1>
        <p>Przeglądanie, wyszukiwanie i filtrowanie gier planszowych</p>

        <div style={{ marginTop: "1rem" }}>
          {loading ? (
            <span>Ładowanie...</span>
          ) : user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <span>Zalogowano jako: {user.displayName || user.email}</span>
              <button onClick={handleLogout}>Wyloguj</button>
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
              />

              <input
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button onClick={handleEmailLogin}>Zaloguj</button>
              <button onClick={handleEmailRegister}>Zarejestruj</button>
              <button onClick={handleGoogleLogin}>Zaloguj przez Google</button>

              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}