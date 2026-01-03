<script lang="ts">
  import Button from "$lib/components/atoms/Button.svelte";
  import Spinner from "$lib/components/atoms/Spinner.svelte";

  /**
   * ローディングボタンコンポーネントのprops
   */
  interface LoadingButtonProps {
    /**
     * ボタンのタイプ
     */
    type?: "button" | "submit" | "reset";
    /**
     * ボタンのバリアント
     */
    variant?: "primary" | "secondary" | "outline";
    /**
     * ローディング状態
     */
    isLoading: boolean;
    /**
     * 無効化状態
     */
    disabled?: boolean;
    /**
     * 幅を100%にするか
     */
    fullWidth?: boolean;
    /**
     * 通常時のテキスト
     */
    text: string;
    /**
     * ローディング時のテキスト
     */
    loadingText?: string;
  }

  const {
    type = "submit",
    variant = "primary",
    isLoading,
    disabled = false,
    fullWidth = false,
    text,
    loadingText,
  }: LoadingButtonProps = $props();

  /**
   * ボタンの無効化状態（ローディング中またはdisabled）
   */
  const isDisabled = $derived(isLoading || disabled);
</script>

<Button {type} {variant} disabled={isDisabled} {fullWidth}>
  {#if isLoading}
    <span class="flex items-center justify-center gap-2">
      <Spinner size="md" />
      {loadingText || text}
    </span>
  {:else}
    {text}
  {/if}
</Button>
