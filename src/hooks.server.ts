import { app } from "$lib/api";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  // /api/* のリクエストをHonoにルーティング
  if (event.url.pathname.startsWith("/api")) {
    const path = event.url.pathname.replace(/^\/api/, "");
    const request = new Request(event.url.origin + path, {
      method: event.request.method,
      headers: event.request.headers,
      body: event.request.body,
    });

    return await app.fetch(request);
  }

  // それ以外はSvelteKitに処理させる
  return resolve(event);
};
