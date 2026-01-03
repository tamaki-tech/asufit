<script lang="ts">
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import IconButton from "$lib/components/atoms/IconButton.svelte";

/**
 * 日付ナビゲーターコンポーネントのprops
 */
interface DateNavigatorProps {
	/**
	 * 現在の日付
	 */
	currentDate: Date;
	/**
	 * 前日に移動するハンドラー
	 */
	onPreviousDay: () => void;
	/**
	 * 翌日に移動するハンドラー
	 */
	onNextDay: () => void;
}

const { currentDate, onPreviousDay, onNextDay }: DateNavigatorProps = $props();

/**
 * フォーマットされた日付文字列
 */
const formattedDate = $derived(
	format(currentDate, "yyyy年M月d日(E)", { locale: ja }),
);
</script>

<div class="flex items-center justify-between bg-white rounded-lg shadow-md px-4 py-3">
  <IconButton icon="←" ariaLabel="前日" onclick={onPreviousDay} />
  <h2 class="text-xl font-bold text-gray-900">{formattedDate}</h2>
  <IconButton icon="→" ariaLabel="翌日" onclick={onNextDay} />
</div>
