// Centralised API base URL.
// In development the Vite proxy forwards /api → http://localhost:3000,
// so the default (empty string) works out-of-the-box.
// For production, set VITE_API_URL to your deployed backend origin.
export const API_BASE_URL: string =
    import.meta.env.VITE_API_URL ?? '';
