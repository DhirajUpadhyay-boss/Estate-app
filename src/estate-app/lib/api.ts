/**
 * Base URL for the Express API (same stack as the Vite app).
 * Server components read API_URL; client reads NEXT_PUBLIC_API_URL.
 */
export function getApiBaseUrl(): string {
  return (
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3055"
  );
}

export function getViteAppUrl(): string {
  return process.env.NEXT_PUBLIC_VITE_APP_URL || "http://localhost:5173";
}
