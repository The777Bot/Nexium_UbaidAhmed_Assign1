import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

// Define types for quote data
interface Quote {
  text: string;
  author?: string;
  topic?: string;
}
interface TopicQuotes {
  topic: string;
  quotes: (string | { text: string; author?: string })[];
}

export async function GET() {
  // Try public API first
  try {
    const res = await fetch("https://type.fit/api/quotes");
    if (res.ok) {
      const data: { text: string; author: string }[] = await res.json();
      const idx = Math.floor(Math.random() * data.length);
      return NextResponse.json({ text: data[idx].text, author: data[idx].author || "Unknown" });
    }
  } catch {
    // Ignore and fallback to local
  }

  // Fallback to local quotes.json
  try {
    const filePath = path.join(process.cwd(), "src/data/quotes.json");
    const file = await fs.readFile(filePath, "utf-8");
    const quotesData: TopicQuotes[] = JSON.parse(file);
    const allQuotes: Quote[] = quotesData.flatMap((q) =>
      q.quotes.map((quote) =>
        typeof quote === "string"
          ? { text: quote, author: undefined, topic: q.topic }
          : { ...quote, topic: q.topic }
      )
    );
    const idx = Math.floor(Math.random() * allQuotes.length);
    return NextResponse.json({ text: allQuotes[idx].text, author: allQuotes[idx].author || "Unknown" });
  } catch {
    return NextResponse.json({ error: "Could not fetch quote from any source." }, { status: 500 });
  }
}
