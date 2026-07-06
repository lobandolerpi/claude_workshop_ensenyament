import type { Metadata } from "next";
import "./globals.css";

import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Reserva de Sessions de Treball",
  description:
    "Reserva sessions 1-a-1 amb els nostres professors i mentors interns en pocs clics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="antialiased">
      <body className="min-h-screen bg-muted/30">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
