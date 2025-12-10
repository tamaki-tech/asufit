import { client } from "$lib/api/client";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
  const res = await client.book.$get({}, { fetch });
  const data = await res.json();
  return {
    books: data,
  };
};
