// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "DineMind | AI-Powered Food Journey",
  description: "Personalized culinary recommendations powered by artificial intelligence",
  keywords: "food, AI, recommendations, recipes, dining",
  openGraph: {
    title: "DineMind | AI-Powered Food Journey",
    description: "Discover your next favorite meal with our AI-powered recommendations",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-neutral-50 dark:bg-neutral-900 antialiased">
        {/* This wrapper allows layout to stay consistent */}
        <div className="flex flex-col md:flex-row min-h-screen max-w-[1440px] mx-auto relative">
          {/* Header includes mobile sidebar toggle logic */}
          <Header />
          {/* Main content wrapper */}
          <main className="flex-1 w-full flex flex-col overflow-x-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
