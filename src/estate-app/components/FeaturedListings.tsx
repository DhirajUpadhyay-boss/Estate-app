import Image from "next/image";
import { getApiBaseUrl } from "@/lib/api";

type Property = {
  id: string;
  title: string;
  location: string;
  priceDisplay: string;
  image: string;
};

export default async function FeaturedListings() {
  const base = getApiBaseUrl();
  let properties: Property[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(`${base}/api/properties`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      error = `Listings unavailable (${res.status}).`;
    } else {
      const data = (await res.json()) as { properties?: Property[] };
      properties = data.properties ?? [];
    }
  } catch {
    error =
      "Could not reach the API. Start the backend (port 3055) to see live listings.";
  }

  if (error) {
    return (
      <section
        className="w-full rounded-2xl border border-amber-200/80 bg-amber-50 p-6 text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100"
        aria-live="polite"
      >
        <p className="text-sm font-medium">{error}</p>
      </section>
    );
  }

  if (properties.length === 0) {
    return (
      <p className="text-zinc-600 dark:text-zinc-400">
        No listings to show yet.
      </p>
    );
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {properties.map((p) => (
        <li
          key={p.id}
          className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="relative aspect-[16/10] w-full bg-zinc-100 dark:bg-zinc-900">
            <Image
              src={p.image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              {p.title}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {p.location}
            </p>
            <p className="mt-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
              {p.priceDisplay}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
