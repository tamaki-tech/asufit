<script lang="ts">
  import Alert from "$lib/components/atoms/Alert.svelte";

  /**
   * 認証テンプレートのprops
   */
  interface AuthTemplateProps {
    /**
     * ページタイトル
     */
    title: string;
    /**
     * エラーメッセージ
     */
    errorMessage?: string;
    /**
     * 成功メッセージ
     */
    successMessage?: string;
    /**
     * メインコンテンツ
     */
    children: import("svelte").Snippet;
    /**
     * フッターコンテンツ（オプション）
     */
    footer?: import("svelte").Snippet;
  }

  let {
    title,
    errorMessage,
    successMessage,
    children,
    footer,
  }: AuthTemplateProps = $props();
</script>

<div class="max-w-md mx-auto mt-8">
  <h2 class="text-3xl font-bold mb-6">{title}</h2>

  {#if errorMessage}
    <Alert type="error" message={errorMessage} />
  {/if}

  {#if successMessage}
    <Alert type="success" message={successMessage} />
  {/if}

  {@render children()}

  {#if footer}
    <div class="mt-6 text-center text-sm">
      {@render footer()}
    </div>
  {/if}
</div>
