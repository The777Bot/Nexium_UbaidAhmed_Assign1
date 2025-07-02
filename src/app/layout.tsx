// app/layout.tsx
import "@/styles/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Quote Generator",
  description: "A simple quote generator app.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 text-foreground font-sans">
        <header className="w-full shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <span className="text-2xl font-extrabold tracking-tight text-blue-700 dark:text-blue-300">
              QuoteGen
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              by Ubaid Ahmed
              <ThemeToggle />
            </span>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8 flex-1 flex flex-col justify-center items-center w-full">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
