"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function QuoteOfTheDay() {
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchQuote() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/quote-of-the-day");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setQuote({ text: data.text, author: data.author });
    } catch (e) {
      setError("Could not fetch quote. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Fetch on mount
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto mt-8 mb-8">
      <h2 className="text-center text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">Quote of the Day</h2>
      <Card className="mb-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-md">
        <CardContent className="p-6 text-gray-800 dark:text-gray-100 text-lg font-medium italic flex flex-col items-center gap-2 min-h-[80px]">
          {loading ? (
            <span className="text-gray-400">Loading...</span>
          ) : error ? (
            <span className="text-red-500">{error}</span>
          ) : quote ? (
            <>
              <span>"{quote.text}"</span>
              <span className="mt-2 text-base not-italic font-normal text-gray-500 dark:text-gray-400">— {quote.author}</span>
            </>
          ) : null}
        </CardContent>
      </Card>
      <div className="flex justify-center">
        <Button onClick={fetchQuote} disabled={loading} className="bg-gradient-to-r from-blue-600 to-purple-500 text-white font-bold px-6 py-2 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-600 transition-all">
          {loading ? "Refreshing..." : "New Random Quote"}
        </Button>
      </div>
    </div>
  );
}
