import { hc } from "hono/client";
import { env } from "$env/dynamic/public";
import type { ApiRoute } from "$lib/api";

// APIのベースURLを環境変数から取得（デフォルト: /api）
const API_BASE_URL = env.PUBLIC_API_BASE_URL || "/api";

export const client = hc<ApiRoute>(API_BASE_URL, {
	fetch: (input: RequestInfo | URL, init?: RequestInit) => {
		return fetch(input, init);
	},
});
