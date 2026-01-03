<script lang="ts">
/**
 * ボタンコンポーネントのprops
 */
interface ButtonProps {
	/**
	 * ボタンのタイプ
	 */
	type?: "button" | "submit" | "reset";
	/**
	 * ボタンのバリアント（スタイル種別）
	 */
	variant?: "primary" | "secondary" | "outline";
	/**
	 * ボタンの無効化状態
	 */
	disabled?: boolean;
	/**
	 * 幅を100%にするか
	 */
	fullWidth?: boolean;
	/**
	 * クリック時のハンドラー
	 */
	onclick?: (event: MouseEvent) => void;
	/**
	 * 子要素
	 */
	children?: import("svelte").Snippet;
}

const {
	type = "button",
	variant = "primary",
	disabled = false,
	fullWidth = false,
	onclick,
	children,
}: ButtonProps = $props();

/**
 * バリアントに応じたCSSクラスを生成
 */
const variantClasses = $derived(() => {
	switch (variant) {
		case "primary":
			return "bg-blue-600 hover:bg-blue-700 text-white";
		case "secondary":
			return "bg-white hover:bg-gray-50 border border-gray-300 text-gray-700";
		case "outline":
			return "bg-transparent hover:bg-gray-50 border border-gray-300 text-gray-700";
		default:
			return "bg-blue-600 hover:bg-blue-700 text-white";
	}
});

/**
 * 完全なCSSクラス文字列
 */
const buttonClasses = $derived(
	`${variantClasses()} font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed ${fullWidth ? "w-full" : ""}`,
);
</script>

<button {type} class={buttonClasses} {disabled} {onclick}>
  {#if children}
    {@render children()}
  {/if}
</button>
