<script lang="ts">
  import Button from "$lib/components/atoms/Button.svelte";
  import AddExerciseForm from "$lib/components/organisms/AddExerciseForm.svelte";
  import type { ExerciseType, RecommendedMenuItem } from "$lib/types/exercise";

  /**
   * 追加メニューリストコンポーネントのprops
   */
  interface AdditionalExerciseListProps {
    /**
     * 追加されたメニューのリスト
     */
    additionalMenu: RecommendedMenuItem[];
    /**
     * 利用可能なトレーニング種目のリスト
     */
    exerciseTypes: ExerciseType[];
    /**
     * フォームの表示状態
     */
    isFormVisible: boolean;
    /**
     * フォーム表示トグルハンドラー
     */
    onToggleForm: () => void;
    /**
     * チェック状態変更ハンドラー
     */
    onToggleComplete: (itemId: string) => void;
    /**
     * メニュー追加ハンドラー
     */
    onAddMenuItem: (
      exerciseTypeId: string,
      detail: {
        reps?: number;
        weight?: number;
        duration?: number;
        distance?: number;
      }
    ) => void;
  }

  const {
    additionalMenu,
    exerciseTypes,
    isFormVisible,
    onToggleForm,
    onToggleComplete,
    onAddMenuItem,
  }: AdditionalExerciseListProps = $props();

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

  /**
   * メニュー追加後の処理
   */
  function handleAddRecord(
    exerciseTypeId: string,
    detail: {
      reps?: number;
      weight?: number;
      duration?: number;
      distance?: number;
    }
  ) {
    onAddMenuItem(exerciseTypeId, detail);
    onToggleForm();
  }
</script>

<div class="bg-white rounded-lg shadow-md p-6 space-y-4">
  <div class="flex items-center justify-between">
    <h3 class="text-lg font-bold text-gray-900">追加メニュー</h3>
    <Button variant="secondary" onclick={onToggleForm}>
      {isFormVisible ? "キャンセル" : "+ 追加"}
    </Button>
  </div>

  {#if isFormVisible}
    <div class="border-t pt-4">
      <AddExerciseForm {exerciseTypes} onAddRecord={handleAddRecord} />
    </div>
  {/if}

  {#if additionalMenu.length > 0}
    <ul class="space-y-2">
      {#each additionalMenu as item (item.id)}
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
  {:else if !isFormVisible}
    <p class="text-gray-500 text-sm text-center py-4">
      まだ追加メニューはありません
    </p>
  {/if}
</div>
