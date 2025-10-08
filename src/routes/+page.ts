import { client } from "$lib/api/client";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
  // Fetch data from the hono.js API
  const res = await client.book.$get({}, { fetch });

  // Return the data to the page
  const data = await res.json();
  return {
    books: data,
  };
};
