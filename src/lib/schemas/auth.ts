import { z } from "zod";

/**
 * ログインフォームのバリデーションスキーマ
 *
 * メールアドレスとパスワードのバリデーションルールを定義
 * - メールアドレス: RFC準拠のフォーマット検証
 * - パスワード: 最小8文字、英大文字・小文字・数字を含む
 */
export const loginSchema = z.object({
	email: z
		.string()
		.min(1, "メールアドレスを入力してください")
		.email("有効なメールアドレスを入力してください"),
	password: z
		.string()
		.min(8, "パスワードは8文字以上で入力してください")
		.regex(/[A-Z]/, "パスワードには大文字を含めてください")
		.regex(/[a-z]/, "パスワードには小文字を含めてください")
		.regex(/[0-9]/, "パスワードには数字を含めてください"),
});

/**
 * ログインフォームのデータ型
 */
export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * ユーザー情報のスキーマ
 *
 * Auth0から返却されるユーザー情報の構造を定義
 */
export const userSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	name: z.string(),
	picture: z.string().optional(),
});

/**
 * ユーザー情報の型
 */
export type User = z.infer<typeof userSchema>;

/**
 * 認証レスポンスのスキーマ
 */
export const authResponseSchema = z.object({
	user: userSchema,
});

/**
 * 認証レスポンスの型
 */
export type AuthResponse = z.infer<typeof authResponseSchema>;
