import { createClient } from "contentful";

export const client = createClient({
  space: import.meta.env.VITE_space,
  accessToken: import.meta.env.VITE_AccessToken,
});