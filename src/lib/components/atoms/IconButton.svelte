<script lang="ts">
/**
 * アイコンボタンコンポーネントのprops
 */
interface IconButtonProps {
	/**
	 * ボタンのタイプ
	 */
	type?: "button" | "submit" | "reset";
	/**
	 * アイコン名（Unicode または emoji）
	 */
	icon: string;
	/**
	 * アクセシビリティ用のラベル
	 */
	ariaLabel: string;
	/**
	 * ボタンの無効化状態
	 */
	disabled?: boolean;
	/**
	 * クリック時のハンドラー
	 */
	onclick?: (event: MouseEvent) => void;
}

const {
	type = "button",
	icon,
	ariaLabel,
	disabled = false,
	onclick,
}: IconButtonProps = $props();
</script>

<button
  {type}
  class="p-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
  {disabled}
  {onclick}
  aria-label={ariaLabel}
>
  <span class="text-2xl text-gray-700">{icon}</span>
</button>
