<script lang="ts">
  import { loginSchema, type LoginFormData } from "$lib/schemas/auth";
  import { authStore } from "$lib/stores/auth.svelte";
  import { ZodError } from "zod";
  import AuthTemplate from "$lib/components/templates/AuthTemplate.svelte";
  import SocialLoginSection from "$lib/components/organisms/SocialLoginSection.svelte";
  import LoginForm from "$lib/components/organisms/LoginForm.svelte";

  /**
   * フォームフィールドの状態
   */
  let email = $state("");
  let password = $state("");

  /**
   * バリデーションエラーメッセージ
   */
  let errors = $state<Partial<Record<keyof LoginFormData, string>>>({});

  /**
   * ローディング状態
   */
  let isLoading = $state(false);

  /**
   * フォーム送信全体のエラーメッセージ
   */
  let submitError = $state("");

  /**
   * フォーム送信成功メッセージ
   */
  let successMessage = $state("");

  /**
   * Googleログインボタンのクリックハンドラー
   *
   * Auth0のGoogleログインへリダイレクト
   */
  const handleGoogleLogin = () => {
    authStore.login("/");
  };

  /**
   * フォーム送信ハンドラー
   *
   * Zodスキーマでバリデーションを実行し、成功時はAPIリクエストをシミュレート
   * 現在は仮実装として、console.logで値を出力
   */
  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    // エラーと成功メッセージをリセット
    errors = {};
    submitError = "";
    successMessage = "";

    // フォームデータの構築
    const formData: LoginFormData = {
      email,
      password,
    };

    // クライアントサイドバリデーション
    try {
      loginSchema.parse(formData);
    } catch (error) {
      if (error instanceof ZodError) {
        // Zodエラーをフィールドごとのエラーメッセージに変換
        error.issues.forEach((issue) => {
          const field = issue.path[0] as keyof LoginFormData;
          errors[field] = issue.message;
        });
      }
      return;
    }

    // ローディング開始
    isLoading = true;

    try {
      // 仮実装: APIリクエストの代わりにconsole.logで出力
      console.log("ログイン情報:", {
        email: formData.email,
        password: "********", // セキュリティのため、パスワードはマスク
      });

      // APIリクエストのシミュレーション（1秒待機）
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 成功メッセージの表示
      successMessage = "ログインに成功しました！";

      // フォームをリセット
      email = "";
      password = "";

      // TODO: 実際のAPIエンドポイント実装時に以下のようなコードに置き換え
      // const response = await client.auth.login.$post(
      //   { json: formData },
      //   { fetch }
      // );
      // const result = await response.json();
      // if (response.ok) {
      //   // ログイン成功時の処理（リダイレクトなど）
      // } else {
      //   submitError = result.error || "ログインに失敗しました";
      // }
    } catch (error) {
      console.error("ログインエラー:", error);
      submitError = "予期しないエラーが発生しました。もう一度お試しください。";
    } finally {
      isLoading = false;
    }
  };
</script>

<AuthTemplate title="ログイン" errorMessage={submitError} {successMessage}>
  <SocialLoginSection onGoogleLogin={handleGoogleLogin} />

  <LoginForm
    bind:email
    bind:password
    {errors}
    {isLoading}
    onSubmit={handleSubmit}
  />

  {#snippet footer()}
    <p class="text-gray-600">
      アカウントをお持ちでない方は
      <a href="/register" class="text-blue-600 hover:text-blue-800 font-medium">
        新規登録
      </a>
    </p>
  {/snippet}
</AuthTemplate>
