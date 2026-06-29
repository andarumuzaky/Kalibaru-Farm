import type { Metadata } from "next";
import { Source_Serif_4, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kalibaru Pastoral | Kesegaran Alami dari Peternakan Kalibaru",
  description: "Kalibaru Pastoral adalah sebuah platform web modern yang berfungsi sebagai media profil perusahaan dan katalog pengenalan produk organik.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${sourceSerif.variable} ${beVietnam.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-secondary text-neutral">{children}</body>
    </html>
  );
}
