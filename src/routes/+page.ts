import { client } from "$lib/api/client";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  const res = await client.book.$get();
  const data = await res.json();
  return {
    books: data,
  };
};
