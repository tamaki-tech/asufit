import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url }) => {
  // ルートパスの場合のみdashboardにリダイレクト
  if (url.pathname === "/") {
    throw redirect(303, "/dashboard");
  }
};
