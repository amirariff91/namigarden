import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nami Garden",
  description: "A gentle couple-finance garden for Amir and Ayunni.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
