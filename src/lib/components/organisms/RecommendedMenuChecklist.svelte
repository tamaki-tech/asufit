<script lang="ts">
  import type { RecommendedMenuItem } from "$lib/types/exercise";

  /**
   * おすすめメニューチェックリストコンポーネントのprops
   */
  interface RecommendedMenuChecklistProps {
    /**
     * おすすめメニューのリスト
     */
    recommendedMenu: RecommendedMenuItem[];
    /**
     * チェック状態変更ハンドラー
     */
    onToggleComplete: (itemId: string) => void;
  }

  const { recommendedMenu, onToggleComplete }: RecommendedMenuChecklistProps =
    $props();

  /**
   * メニュー詳細を文字列に変換
   */
  function formatMenuDetail(item: RecommendedMenuItem): string {
    const { detail } = item;

    switch (detail.category) {
      case "strength":
        return `${detail.reps}回`;
      case "weighted":
        return `${detail.reps}回 × ${detail.weight}kg`;
      case "cardio": {
        const parts = [];
        if (detail.duration) parts.push(`${detail.duration}分`);
        if (detail.distance) parts.push(`${detail.distance}km`);
        return parts.length > 0 ? parts.join(" / ") : "未設定";
      }
      default: {
        const _exhaustive: never = detail;
        return "不明な種別";
      }
    }
  }
</script>

<div class="bg-white rounded-lg shadow-md p-6 space-y-4">
  <h3 class="text-lg font-bold text-gray-900">今日のおすすめメニュー</h3>
  <ul class="space-y-2">
    {#each recommendedMenu as item (item.id)}
      <li>
        <label
          class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-gray-200"
          class:bg-gray-50={item.isCompleted}
        >
          <div class="flex items-center space-x-3 flex-1">
            <input
              type="checkbox"
              checked={item.isCompleted}
              onchange={() => onToggleComplete(item.id)}
              class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span
              class="text-gray-800 font-medium"
              class:line-through={item.isCompleted}
              class:text-gray-500={item.isCompleted}
            >
              {item.exerciseType.name}
            </span>
          </div>
          <span
            class="text-gray-600 text-sm ml-3"
            class:line-through={item.isCompleted}
            class:text-gray-400={item.isCompleted}
          >
            {formatMenuDetail(item)}
          </span>
        </label>
      </li>
    {/each}
  </ul>
</div>
