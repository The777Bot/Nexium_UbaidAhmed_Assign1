'use client'

import { useState } from 'react'
import quotesData from '@/data/quotes.json'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function QuoteForm() {
  const [topic, setTopic] = useState('')
  const [results, setResults] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const topicEntry = quotesData.find(q => q.topic.toLowerCase() === topic.toLowerCase())

    if (topicEntry) {
      // Always show only the first 3 quotes for the topic
      setResults(topicEntry.quotes.slice(0, 3))
    } else {
      setResults(["No quotes found for this topic. Try 'success', 'motivation', 'focus', 'leadership', 'perseverance', or 'creativity'."])
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto mt-4 px-4 relative">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-3 md:gap-2 mb-8 items-center justify-center bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg p-6 border border-blue-100 dark:border-gray-700"
      >
        <Input
          placeholder="Enter a topic (e.g. success, motivation)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="flex-1 py-3 px-4 text-lg border-2 border-blue-200 dark:border-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 transition-all text-neutral-900 dark:text-neutral-100 bg-white dark:bg-gray-900"
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
              {quote}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
