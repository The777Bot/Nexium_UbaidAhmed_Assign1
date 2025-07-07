// app/layout.tsx
import "@/styles/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Footer from "../components/Footer";
import ThemeButton from "@/components/ThemeButton";

export const metadata: Metadata = {
  title: "Quote Generator",
  description: "A simple quote generator app.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white dark:bg-black text-foreground font-sans">
        {/* Background Blurred Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover z-[-1] blur-lg opacity-40"
          src="/bg-video.mp4"
        />
        <header className="w-full shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <span className="text-2xl font-extrabold tracking-tight text-blue-700 dark:text-blue-300">
              QuoteGen
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2">
              by Ubaid Ahmed
              <ThemeButton />
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
