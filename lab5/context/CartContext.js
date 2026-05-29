"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Завантажуємо кошик з пам'яті браузера при першому рендері
  useEffect(() => {
    const savedCart = localStorage.getItem("board_game_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setIsLoaded(true);
  }, []);

  // Зберігаємо кошик у пам'ять при кожній зміні
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("board_game_cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (game) => {
    setCart((prevCart) => {
      // Перевіряємо, чи гри ще немає в кошику, щоб не додати двічі
      if (prevCart.some((item) => item.id === game.id)) return prevCart;
      return [...prevCart, game];
    });
  };

  const removeFromCart = (gameId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== gameId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);