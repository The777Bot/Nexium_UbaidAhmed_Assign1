import { QuoteForm } from "@/components/QuoteForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <h1 className="text-center text-3xl font-bold mt-10">Quote Generator</h1>
      <QuoteForm />
    </main>
  );
}
