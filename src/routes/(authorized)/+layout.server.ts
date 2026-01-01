import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { client } from "$lib/api/client";

export const load: LayoutServerLoad = async ({ url, fetch }) => {
  const response = await client.auth.me.$get({}, { fetch });

  if (!response.ok) {
    // 401 or other error response
    const redirectTo = url.pathname + url.search;
    throw redirect(303, `/login?redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  const { user } = await response.json();
  return { user };
};
