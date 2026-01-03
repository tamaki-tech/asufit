<script lang="ts">
  import Button from "$lib/components/atoms/Button.svelte";
  import Modal from "$lib/components/atoms/Modal.svelte";
  import type { RecommendedMenuItem } from "$lib/types/exercise";

  /**
   * おすすめメニュー生成モーダルコンポーネントのprops
   */
  interface StartTrainingModalProps {
    /**
     * モーダルの表示状態
     */
    isOpen: boolean;
    /**
     * おすすめメニューのリスト
     */
    recommendedMenu: RecommendedMenuItem[];
    /**
     * おすすめメニューの理由
     */
    recommendationReason: string;
    /**
     * モーダルを閉じるハンドラー
     */
    onClose: () => void;
    /**
     * トレーニングを開始するハンドラー
     */
    onStartTraining: () => void;
  }

  const {
    isOpen,
    recommendedMenu,
    recommendationReason,
    onClose,
    onStartTraining,
  }: StartTrainingModalProps = $props();

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

<Modal {isOpen} {onClose} title="今日のおすすめメニュー">
  <div class="space-y-6">
    <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
      <p class="text-sm text-gray-700 leading-relaxed">
        {recommendationReason}
      </p>
    </div>

    <div class="space-y-3">
      <h4 class="text-md font-semibold text-gray-900">おすすめメニュー</h4>
      <ul class="space-y-2">
        {#each recommendedMenu as item}
          <li
            class="flex items-center justify-between bg-gray-50 rounded-lg p-3"
          >
            <div class="flex items-center space-x-3">
              <span class="text-blue-600 font-bold text-lg">✓</span>
              <span class="text-gray-800 font-medium"
                >{item.exerciseType.name}</span
              >
            </div>
            <span class="text-gray-600 text-sm">{formatMenuDetail(item)}</span>
          </li>
        {/each}
      </ul>
    </div>

    <div class="flex space-x-3">
      <Button variant="secondary" onclick={onClose} fullWidth>
        キャンセル
      </Button>
      <Button variant="primary" onclick={onStartTraining} fullWidth>
        このメニューで開始
      </Button>
    </div>
  </div>
</Modal>
