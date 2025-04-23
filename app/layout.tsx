// Root Layout - layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DineMind | AI-Powered Food Journey",
  description: "Personalized culinary recommendations powered by artificial intelligence",
  keywords: "food, AI, recommendations, recipes, dining",
  openGraph: {
    title: "DineMind | AI-Powered Food Journey",
    description: "Discover your next favorite meal with our AI-powered recommendations",
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen w-full max-w-[1440px] mx-auto bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300`}
      >
        <Header />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
