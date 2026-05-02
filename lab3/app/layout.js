import "./globals.css";

export const metadata = {
  title: "Board Games Market",
  description: "Aplikacja do przeglądania gier planszowych",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}