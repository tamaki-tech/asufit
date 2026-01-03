<script lang="ts">
import type { ExerciseRecord } from "$lib/types/exercise";

/**
 * トレーニング記録カードコンポーネントのprops
 */
interface ExerciseRecordCardProps {
	/**
	 * トレーニング記録
	 */
	record: ExerciseRecord;
}

const { record }: ExerciseRecordCardProps = $props();

/**
 * 記録の詳細テキストを生成
 */
const detailText = $derived(() => {
	switch (record.detail.category) {
		case "strength":
			return `${record.detail.reps}回`;
		case "weighted":
			return `${record.detail.reps}回 × ${record.detail.weight}kg`;
		case "cardio":
			if (record.detail.duration && record.detail.distance) {
				return `${record.detail.duration}分 / ${record.detail.distance}km`;
			} else if (record.detail.duration) {
				return `${record.detail.duration}分`;
			} else if (record.detail.distance) {
				return `${record.detail.distance}km`;
			}
			return "";
		default:
			return "";
	}
});
</script>

<div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
  <div class="flex items-center justify-between">
    <h3 class="text-lg font-bold text-gray-900">{record.exerciseType.name}</h3>
    {#if record.exerciseType.isRecommended}
      <span
        class="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold"
      >
        おすすめ
      </span>
    {/if}
  </div>
  <p class="text-2xl font-bold text-blue-600 mt-2">{detailText()}</p>
</div>
