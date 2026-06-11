import type { Metadata } from "next";
import { Bebas_Neue, Fira_Code, Instrument_Serif, Inter } from "next/font/google";
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

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jonathanbrink.com"),
  title: {
    default: "Jonathan Brink — Design. Build. Ship.",
    template: "%s — Jonathan Brink",
  },
  description:
    "Twenty-five years of product design and development. Now I close the gap between concept and code using AI as my build partner. Products that exist — not just decks that could.",
  openGraph: {
    siteName: "Jonathan Brink",
    type: "website",
    url: "https://jonathanbrink.com",
    title: "Jonathan Brink — Design. Build. Ship.",
    description:
      "Twenty-five years of product design. Now I close the gap between concept and code using AI as my build partner.",
    images: [
      {
        url: "/images/work/flowos/screen-delivered-dataset.jpg",
        width: 1516,
        height: 758,
        alt: "FlowOS — typed intent to a governed dataset in under 60 seconds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jonathan Brink — Design. Build. Ship.",
    description:
      "Twenty-five years of product design. Now I close the gap between concept and code using AI as my build partner.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${firaCode.variable} ${inter.variable} ${instrumentSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
