import {
	auth,
	callback,
	login,
	logout,
	type OIDCEnv,
	requiresAuth,
} from "@auth0/auth0-hono";
import { Hono } from "hono";

/**
 * 認証ルート
 *
 * Auth0を使用した認証フローを提供
 * - /login: Auth0のログインページへリダイレクト（Googleログイン）
 * - /callback, /logout: Auth0ミドルウェアが自動的に処理
 * - GET /me: 現在のユーザー情報を取得
 *
 * 環境変数から設定を読み込む：
 * - AUTH0_DOMAIN: Auth0のドメイン
 * - AUTH0_CLIENT_ID: Auth0のクライアントID
 * - AUTH0_CLIENT_SECRET: Auth0のクライアントシークレット
 * - BASE_URL: アプリケーションのベースURL
 * - AUTH0_SESSION_ENCRYPTION_KEY: セッション暗号化キー
 */
export const authRoute = new Hono<OIDCEnv>()
	.use(
		"/*",
		auth({
			domain: process.env.AUTH0_DOMAIN!,
			clientID: process.env.AUTH0_CLIENT_ID!,
			clientSecret: process.env.AUTH0_CLIENT_SECRET,
			baseURL: process.env.BASE_URL!,
			routes: {
				login: "/api/auth/login",
				logout: "/api/auth/logout",
				callback: "/api/auth/callback",
			},
			session: {
				secret: process.env.AUTH0_SESSION_ENCRYPTION_KEY!,
			},
			authRequired: false,
			authorizationParams: {
				connection: "google-oauth2",
				scope: "openid profile email",
			},
		}),
	)
	.get("/login", login())
	.get("/callback", callback({ redirectAfterLogin: "/" }))
	.get("/logout", logout({ redirectAfterLogout: "/login" }))
	.get("/me", requiresAuth(), async (c) => {
		const session = await c.var.auth0Client?.getSession(c);
		const user = session?.user;

		if (!user) {
			return c.json({ error: "Unauthorized" }, 401);
		}

		return c.json({
			user: {
				id: user.sub || "",
				email: user.email || "",
				name: user.name || "",
				picture: user.picture,
			},
		});
	});
