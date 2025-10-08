import type { ApiRoute } from "$lib/api";
import { hc } from "hono/client";

export const client = hc<ApiRoute>("/api");
