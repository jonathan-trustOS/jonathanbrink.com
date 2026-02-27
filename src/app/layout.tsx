import type { Metadata } from "next";
import { Bebas_Neue, Fira_Code, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jonathan Brink — Design. Build. Ship.",
  description:
    "Twenty-five years of product design and development. Now I close the gap between concept and code using AI as my build partner. Products that exist — not just decks that could.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${bebasNeue.variable} ${firaCode.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
