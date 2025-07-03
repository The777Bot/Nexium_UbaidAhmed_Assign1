import { QuoteForm } from "@/components/QuoteForm";
import QuoteOfTheDay from "@/components/QuoteOfTheDay";

export default function Home() {
  return (
    <>
      <QuoteOfTheDay />
      <section className="w-full flex flex-col items-center justify-center gap-6 mt-8 mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 dark:text-blue-300 drop-shadow-lg tracking-tight text-center">
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Quote Generator
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-xl">
          Instantly discover inspiring quotes by topic. Try{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            success
          </span>
          ,{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            motivation
          </span>
          , or{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            focus
          </span>
          .
        </p>
      </section>
      <QuoteForm />
    </>
  );
}
