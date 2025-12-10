import { client } from "$lib/api/client";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
  // Fetch data from the hono.js API
  const res = await client.book.$get({}, { fetch });
  const data = await res.json();

  // Return the data to the page
  return {
    books: data,
  };
};
