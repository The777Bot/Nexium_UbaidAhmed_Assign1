// components/Footer.tsx
'use client'

export default function Footer() {
  return (
    <footer className="w-full py-4 border-t bg-white/70 dark:bg-gray-900/70 text-center text-xs text-gray-500 dark:text-gray-400 mt-auto">
      &copy; {new Date().getFullYear()} QuoteGen. All rights reserved.
    </footer>
  )
}
