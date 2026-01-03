<script lang="ts">
import ExerciseRecordCard from "$lib/components/molecules/ExerciseRecordCard.svelte";
import type { ExerciseRecord } from "$lib/types/exercise";

/**
 * トレーニング記録リストコンポーネントのprops
 */
interface ExerciseRecordListProps {
	/**
	 * トレーニング記録のリスト
	 */
	records: ExerciseRecord[];
}

const { records }: ExerciseRecordListProps = $props();
</script>

<div class="space-y-4">
  <h3 class="text-lg font-bold text-gray-900">トレーニング記録</h3>
  {#if records.length === 0}
    <p class="text-gray-500 text-center py-8">まだ記録がありません</p>
  {:else}
    {#each records as record (record.id)}
      <ExerciseRecordCard {record} />
    {/each}
  {/if}
</div>
