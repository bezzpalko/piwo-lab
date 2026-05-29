import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "Board Games Market",
  description: "Aplikacja do przeglądania gier planszowych",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}