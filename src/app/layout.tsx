import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Emeline Franque - Le Sac Damiers",
  description: "Le Sac Damiers, créé par Emeline Franque, disponible maintenant",
  openGraph: {
    title: "Emeline Franque - Le Sac Damiers",
    description: "Le Sac Damiers, créé par Emeline Franque, disponible maintenant",
    images: [
      { url: "/images/logo.png" },
    ],
    type: "website",
    siteName: "Emeline Franque",
    url: "https://emelinefranque.com",
    locale: "fr_FR",
    countryName: "France"
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
        className={`${inter.variable} ${playfairDisplay.variable} antialiased`}
      >
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
