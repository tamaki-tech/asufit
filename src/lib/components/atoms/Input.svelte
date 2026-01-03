<script lang="ts">
import type { HTMLInputAttributes } from "svelte/elements";

/**
 * 入力フィールドコンポーネントのprops
 */
interface InputProps {
	/**
	 * 入力フィールドのID
	 */
	id?: string;
	/**
	 * 入力フィールドのタイプ
	 */
	type?: string;
	/**
	 * プレースホルダーテキスト
	 */
	placeholder?: string;
	/**
	 * 入力値（双方向バインディング用）
	 */
	value: string;
	/**
	 * エラー状態
	 */
	hasError?: boolean;
	/**
	 * 無効化状態
	 */
	disabled?: boolean;
	/**
	 * オートコンプリート属性
	 */
	autocomplete?: HTMLInputAttributes["autocomplete"];
	/**
	 * aria-invalid属性
	 */
	ariaInvalid?: boolean;
	/**
	 * aria-describedby属性
	 */
	ariaDescribedby?: string;
	/**
	 * 必須入力かどうか
	 */
	required?: boolean;
	/**
	 * 数値入力のステップ値
	 */
	step?: string;
	/**
	 * 数値入力の最小値
	 */
	min?: string;
}

let {
	id,
	type = "text",
	placeholder,
	value = $bindable(),
	hasError = false,
	disabled = false,
	autocomplete,
	ariaInvalid,
	ariaDescribedby,
	required = false,
	step,
	min,
}: InputProps = $props();

/**
 * 入力フィールドのCSSクラス
 */
const inputClasses = $derived(
	`border ${hasError ? "border-red-500" : "border-gray-300"} rounded-lg w-full px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`,
);
</script>

<input
  {id}
  {type}
  bind:value
  class={inputClasses}
  {placeholder}
  {autocomplete}
  {disabled}
  {required}
  {step}
  {min}
  aria-invalid={ariaInvalid}
  aria-describedby={ariaDescribedby}
/>
