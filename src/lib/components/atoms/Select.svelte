<script lang="ts">
/**
 * セレクトボックスの選択肢
 */
export interface SelectOption {
	/**
	 * 選択肢の値
	 */
	value: string;
	/**
	 * 表示テキスト
	 */
	label: string;
}

/**
 * セレクトボックスコンポーネントのprops
 */
interface SelectProps {
	/**
	 * 選択肢のリスト
	 */
	options: SelectOption[];
	/**
	 * 選択された値
	 */
	value?: string;
	/**
	 * プレースホルダーテキスト
	 */
	placeholder?: string;
	/**
	 * 無効化状態
	 */
	disabled?: boolean;
	/**
	 * 変更時のハンドラー
	 */
	onchange?: (value: string) => void;
}

const {
	options,
	value = "",
	placeholder,
	disabled = false,
	onchange,
}: SelectProps = $props();

/**
 * セレクトボックスの変更ハンドラー
 */
function handleChange(event: Event) {
	const target = event.target as HTMLSelectElement;
	onchange?.(target.value);
}
</script>

<select
  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
  {value}
  {disabled}
  onchange={handleChange}
>
  {#if placeholder}
    <option value="" disabled selected={!value}>{placeholder}</option>
  {/if}
  {#each options as option}
    <option value={option.value}>{option.label}</option>
  {/each}
</select>
