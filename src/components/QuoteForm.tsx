'use client'

import { useState } from 'react'
import quotesData from '@/data/quotes.json'
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Updated quotesData to support authors
const topics = quotesData.map(q => q.topic);

// Helper to get a random quote from all topics
function getRandomQuote() {
  const allQuotes = quotesData.flatMap(q =>
    (q.quotes as (string | { text: string; author: string })[]).map(quote =>
      typeof quote === 'string'
        ? { text: quote, author: undefined, topic: q.topic }
        : { ...quote, topic: q.topic }
    )
  );
  const idx = Math.floor(Math.random() * allQuotes.length);
  return allQuotes[idx];
}

export function QuoteForm() {
  const [topic, setTopic] = useState('');
  const [results, setResults] = useState<{ text: string; author?: string }[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const topicEntry = quotesData.find(q => q.topic.toLowerCase() === topic.toLowerCase());
    if (topicEntry) {
      // Support both string and object quotes
      setResults(
        (topicEntry.quotes as (string | { text: string; author: string })[])
          .slice(0, 3)
          .map(q => typeof q === 'string' ? { text: q } : q)
      );
    } else {
      setResults([
        { text: "No quotes found for this topic. Try one from the dropdown above." }
      ]);
    }
  };

  // Random quote feature
  const handleRandom = () => {
    const random = getRandomQuote();
    setResults([{ text: random.text, author: random.author }]);
    setTopic(random.topic);
  };

  return (
    <Card className="w-full max-w-xl mx-auto mt-4 px-4 relative">
      <CardContent>
        <div className="flex flex-col md:flex-row gap-3 md:gap-2 mb-4 items-center justify-center">
          <select
            value={topic}
            onChange={e => setTopic(e.target.value)}
            className="flex-1 py-3 px-4 text-lg border-2 border-blue-200 dark:border-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 transition-all text-neutral-900 dark:text-neutral-100 bg-white dark:bg-gray-900"
          >
            <option value="">Select a topic...</option>
            {topics.map(t => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
          <Button type="button" onClick={handleRandom} className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:from-green-600 hover:to-blue-600 transition-all text-lg">
            Random Quote
          </Button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-3 md:gap-2 mb-8 items-center justify-center"
        >
          <Input
            placeholder="Enter a topic (e.g. success, motivation)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-600 transition-all text-lg">
            Get Quotes
          </Button>
        </form>
        <div className="space-y-4">
          {results.map((quote, idx) => (
            <Card key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-md">
              <CardContent className="p-6 text-gray-800 dark:text-gray-100 text-lg font-medium italic flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-400 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 0 1 4-4h1V7a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h1m10 0v-2a4 4 0 0 1 4-4h1V7a4 4 0 0 0-4-4h-4a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h1" /></svg>
                <span>{quote.text}</span>
                {quote.author && (
                  <span className="ml-4 text-base not-italic font-normal text-gray-500 dark:text-gray-400">— {quote.author}</span>
                )}
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="ml-auto text-xs text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-100"
                  onClick={() => {
                    navigator.clipboard.writeText(quote.text + (quote.author ? ` — ${quote.author}` : ''));
                  }}
                >
                  Copy
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
