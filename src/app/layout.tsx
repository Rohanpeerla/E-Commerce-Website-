import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import SlideOutCart from "@/components/SlideOutCart";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "StoreCheckd — Premium Tech Store",
  description:
    "Shop the latest laptops, MacBooks, iPhones, iPads, tablets and phones at StoreCheckd. Premium tech, competitive prices, trusted by thousands.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-gray-900 antialiased font-sans">
        <CartProvider>
          <Header />
          <SlideOutCart />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
