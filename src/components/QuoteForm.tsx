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
      setResults(topicEntry.quotes)
    } else {
      setResults(["No quotes found for this topic. Try 'success', 'motivation', or 'focus'."])
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-12 px-4">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <Input
          placeholder="Enter a topic (e.g. success, motivation)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button type="submit">Get Quotes</Button>
      </form>

      <div className="space-y-4">
        {results.map((quote, idx) => (
          <Card key={idx}>
            <CardContent className="p-4 text-gray-800 dark:text-gray-100">
              {quote}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
