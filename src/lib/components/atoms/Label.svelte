<script lang="ts">
/**
 * ラベルコンポーネントのprops
 */
interface LabelProps {
	/**
	 * 対応する入力フィールドのID
	 */
	for: string;
	/**
	 * ラベルテキスト
	 */
	children: import("svelte").Snippet;
}

const { for: htmlFor, children }: LabelProps = $props();
</script>

<label for={htmlFor} class="block text-sm font-medium mb-2">
  {@render children()}
</label>
