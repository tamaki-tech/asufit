<script lang="ts">
import type { HTMLInputAttributes } from "svelte/elements";
import Input from "$lib/components/atoms/Input.svelte";
import Label from "$lib/components/atoms/Label.svelte";

/**
 * フォームフィールドコンポーネントのprops
 */
interface FormFieldProps {
	/**
	 * フィールドのID
	 */
	id: string;
	/**
	 * ラベルテキスト
	 */
	label: string;
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
	 * エラーメッセージ
	 */
	error?: string;
	/**
	 * 無効化状態
	 */
	disabled?: boolean;
	/**
	 * オートコンプリート属性
	 */
	autocomplete?: HTMLInputAttributes["autocomplete"];
}

const {
	id,
	label,
	type = "text",
	placeholder,
	value = $bindable(),
	error,
	disabled = false,
	autocomplete,
}: FormFieldProps = $props();

/**
 * エラーメッセージのID
 */
const errorId = $derived(error ? `${id}-error` : undefined);
</script>

<div>
  <Label for={id}>{label}</Label>
  <Input
    {id}
    {type}
    {placeholder}
    bind:value
    hasError={!!error}
    {disabled}
    {autocomplete}
    ariaInvalid={!!error}
    ariaDescribedby={errorId}
  />
  {#if error}
    <p id={errorId} class="text-red-600 text-sm mt-1" role="alert">
      {error}
    </p>
  {/if}
</div>
