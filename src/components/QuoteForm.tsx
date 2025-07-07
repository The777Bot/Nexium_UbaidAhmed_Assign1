'use client'

import { useState } from 'react'
import quotesData from '@/data/quotes.json'
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import VoteButtons from "@/components/VoteButtons";

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
            className="flex-1 bg-white blend:bg-yellow-50 dark:bg-gray-900"
          />
          <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-600 transition-all text-lg">
            Get Quotes
          </Button>
        </form>
        <div className="space-y-4">
          {results.map((quote, idx) => (
            <Card key={idx} className="bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-800 dark:to-gray-900 border-0 shadow-md rounded-xl">
              <CardContent className="p-6 text-gray-800 dark:text-gray-100 text-lg font-medium italic flex items-center gap-4">
                {/* Voting System - now on the left */}
                <VoteButtons quote={quote.text} author={quote.author} />
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
                {/* Social Sharing Buttons */}
                <div className="flex gap-2 ml-2">
                  {/* Twitter */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('"' + quote.text + '"' + (quote.author ? ' — ' + quote.author : ''))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Twitter"
                    className="text-blue-400 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-100"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 5.92c-.8.36-1.67.6-2.58.71a4.48 4.48 0 0 0 1.97-2.48 8.94 8.94 0 0 1-2.83 1.08A4.48 4.48 0 0 0 16.11 4c-2.48 0-4.49 2.01-4.49 4.49 0 .35.04.7.11 1.03C7.69 9.36 4.07 7.6 1.64 4.94c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.95 3.65-.72-.02-1.4-.22-1.99-.55v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.72 2.16 2.97 4.07 3a9.01 9.01 0 0 1-5.59 1.93c-.36 0-.71-.02-1.06-.06A12.77 12.77 0 0 0 7.29 21c8.29 0 12.83-6.87 12.83-12.83 0-.2 0-.41-.01-.61.88-.64 1.64-1.44 2.25-2.35z"/></svg>
                  </a>
                  {/* LinkedIn */}
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://nexium-ubaid-ahmed-assign1.vercel.app/')}&summary=${encodeURIComponent('"' + quote.text + '"' + (quote.author ? ' — ' + quote.author : ''))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    className="text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/></svg>
                  </a>
                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent('"' + quote.text + '"' + (quote.author ? ' — ' + quote.author : ''))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on WhatsApp"
                    className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-200"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.828-2.05C13.41 27.634 14.686 28 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.13 0-2.238-.188-3.287-.558l-.235-.08-4.653 1.217 1.24-4.49-.153-.23C7.27 18.13 6.5 16.6 6.5 15c0-5.238 4.262-9.5 9.5-9.5s9.5 4.262 9.5 9.5-4.262 9.5-9.5 9.5zm5.07-6.13c-.277-.139-1.64-.809-1.893-.902-.253-.093-.437-.139-.62.14-.184.277-.71.902-.87 1.086-.16.184-.32.207-.597.07-.277-.139-1.17-.431-2.23-1.372-.823-.734-1.38-1.64-1.543-1.917-.16-.277-.017-.427.122-.566.125-.124.277-.32.416-.48.139-.16.184-.277.277-.462.093-.184.047-.346-.023-.485-.07-.139-.62-1.497-.85-2.05-.224-.54-.454-.467-.62-.476-.16-.007-.346-.009-.532-.009-.184 0-.482.07-.735.346-.253.277-.97 1.07-.97 2.606 0 1.536 1.11 3.022 1.267 3.23.157.208 2.08 3.19 5.08 4.345.71.273 1.263.436 1.693.558.712.203 1.36.174 1.872.106.571-.077 1.75-.715 2.002-1.406.253-.692.253-1.28.177-1.406-.07-.124-.253-.198-.53-.337z"/>
                    </svg>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
