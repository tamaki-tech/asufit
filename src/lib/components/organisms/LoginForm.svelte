<script lang="ts">
import FormField from "$lib/components/molecules/FormField.svelte";
import LoadingButton from "$lib/components/molecules/LoadingButton.svelte";
import type { LoginFormData } from "$lib/schemas/auth";

/**
 * ログインフォームのprops
 */
interface LoginFormProps {
	/**
	 * メールアドレスの値
	 */
	email: string;
	/**
	 * パスワードの値
	 */
	password: string;
	/**
	 * フィールドごとのエラーメッセージ
	 */
	errors: Partial<Record<keyof LoginFormData, string>>;
	/**
	 * ローディング状態
	 */
	isLoading: boolean;
	/**
	 * フォーム送信ハンドラー
	 */
	onSubmit: (event: SubmitEvent) => void;
}

const {
	email = $bindable(),
	password = $bindable(),
	errors,
	isLoading,
	onSubmit,
}: LoginFormProps = $props();
</script>

<form onsubmit={onSubmit} class="space-y-6" novalidate>
  <!-- メールアドレスフィールド -->
  <FormField
    id="email"
    label="メールアドレス"
    type="email"
    placeholder="example@example.com"
    bind:value={email}
    error={errors.email}
    disabled={isLoading}
    autocomplete="email"
  />

  <!-- パスワードフィールド -->
  <FormField
    id="password"
    label="パスワード"
    type="password"
    placeholder="パスワードを入力"
    bind:value={password}
    error={errors.password}
    disabled={isLoading}
    autocomplete="current-password"
  />

  <!-- 送信ボタン -->
  <LoadingButton
    type="submit"
    variant="primary"
    {isLoading}
    fullWidth={true}
    text="ログイン"
    loadingText="ログイン中..."
  />
</form>
