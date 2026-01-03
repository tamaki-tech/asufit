<script lang="ts">
  import type { ExerciseType } from "$lib/types/exercise";

  /**
   * おすすめメニューカードコンポーネントのprops
   */
  interface RecommendedMenuCardProps {
    /**
     * おすすめメニューのリスト
     */
    recommendedExercises: ExerciseType[];
  }

  const { recommendedExercises }: RecommendedMenuCardProps = $props();
</script>

<div
  class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md p-6"
>
  <h3 class="text-xl font-bold text-gray-900 mb-4">今日のおすすめメニュー</h3>
  <ul class="space-y-2">
    {#each recommendedExercises as exercise}
      <li class="flex items-center space-x-2">
        <span class="text-blue-600 font-bold">✓</span>
        <span class="text-gray-700">{exercise.name}</span>
      </li>
    {/each}
  </ul>
</div>
