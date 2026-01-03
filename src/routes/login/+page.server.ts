import { redirect } from "@sveltejs/kit";
import { client } from "$lib/api/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
	// 認証状態をチェック
	const response = await client.auth.me.$get({}, { fetch });

	// 認証済みの場合はdashboardにリダイレクト
	if (response.ok) {
		throw redirect(303, "/dashboard");
	}

	// 未認証の場合はログインページを表示
	return {};
};
