import Link from "next/link";
import FeaturedListings from "@/components/FeaturedListings";
import { getViteAppUrl } from "@/lib/api";

export default function Home() {
  const viteUrl = getViteAppUrl();

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <header className="border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Estate
          </span>
          <nav className="flex items-center gap-3 text-sm">
            <span className="hidden text-zinc-500 sm:inline dark:text-zinc-400">
              Next.js preview
            </span>
            <Link
              href={viteUrl}
              className="rounded-full bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-700"
            >
              Open full app (Vite)
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-12">
        <section className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            Next.js App Router
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Featured listings
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            This page is rendered by Next.js and loads data from your Express API
            at <code className="rounded bg-zinc-200 px-1.5 py-0.5 text-sm dark:bg-zinc-800">GET /api/properties</code>
            . The rest of the product UI stays in the Vite + React app—both can run
            at the same time on different ports.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            From the API
          </h2>
          <FeaturedListings />
        </section>
      </main>
    </div>
  );
}
