"use client";
import { useState, useEffect } from "react";

interface VoteButtonsProps {
  quote: string;
  author?: string;
}

// Helper to generate a unique key for each quote
function getVoteKey(quote: string, author?: string) {
  return `vote_${quote}_${author || ''}`;
}

export default function VoteButtons({ quote, author }: VoteButtonsProps) {
  const [vote, setVote] = useState<0 | 1 | -1>(0); // 1 = up, -1 = down, 0 = none

  useEffect(() => {
    const key = getVoteKey(quote, author);
    const stored = window.localStorage.getItem(key);
    if (stored === "1" || stored === "-1") {
      setVote(Number(stored) as 1 | -1);
    }
    // Optionally, you could store a count in localStorage or fetch from backend
    // For now, just show user's own vote
  }, [quote, author]);

  const handleVote = (val: 1 | -1) => {
    const key = getVoteKey(quote, author);
    if (vote === val) {
      setVote(0);
      window.localStorage.removeItem(key);
    } else {
      setVote(val);
      window.localStorage.setItem(key, String(val));
    }
  };

  return (
    <div className="flex items-center gap-2 select-none">
      <button
        type="button"
        aria-label="Upvote"
        onClick={() => handleVote(1)}
        className={`p-1 rounded-full border border-gray-200 dark:border-gray-700 transition-colors ${vote === 1 ? 'bg-yellow-200 text-yellow-700 dark:bg-yellow-400 dark:text-yellow-900' : 'hover:bg-yellow-100 dark:hover:bg-yellow-800'}`}
      >
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 10.75A2.75 2.75 0 0 1 4.75 8h3.19a.75.75 0 0 0 .75-.75V5.62c0-.97.39-1.9 1.08-2.59l.13-.13a1.75 1.75 0 0 1 2.97 1.23v2.02a.75.75 0 0 0 .75.75h2.25A2.75 2.75 0 0 1 19 9.75v.5a2.75 2.75 0 0 1-2.75 2.75h-1.1a.75.75 0 0 0-.75.75v2.25A2.75 2.75 0 0 1 11.65 19H7.25A2.75 2.75 0 0 1 4.5 16.25v-5.5a.75.75 0 0 0-.75-.75H2.75A.75.75 0 0 1 2 10.75Z"/>
        </svg>
      </button>
      <span className="text-sm font-semibold min-w-[1.5em] text-center">{vote === 1 ? '+1' : vote === -1 ? '-1' : '0'}</span>
      <button
        type="button"
        aria-label="Downvote"
        onClick={() => handleVote(-1)}
        className={`p-1 rounded-full border border-gray-200 dark:border-gray-700 transition-colors ${vote === -1 ? 'bg-blue-200 text-blue-700 dark:bg-blue-400 dark:text-blue-900' : 'hover:bg-blue-100 dark:hover:bg-blue-800'}`}
      >
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 9.25A2.75 2.75 0 0 0 15.25 12h-3.19a.75.75 0 0 1-.75.75v2.13c0 .97-.39 1.9-1.08 2.59l-.13.13a1.75 1.75 0 0 1-2.97-1.23v-2.02a.75.75 0 0 1-.75-.75H3.75A2.75 2.75 0 0 1 1 10.25v-.5A2.75 2.75 0 0 1 3.75 7h1.1a.75.75 0 0 1 .75-.75V4a2.75 2.75 0 0 1 2.75-2.75h4.4A2.75 2.75 0 0 1 15.5 3.75v5.5c0 .41.34.75.75.75h1.75c.41 0 .75.34.75.75v.5Z"/>
        </svg>
      </button>
    </div>
  );
} 