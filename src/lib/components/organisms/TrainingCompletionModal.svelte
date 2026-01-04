<script lang="ts">
  import Button from "$lib/components/atoms/Button.svelte";
  import Modal from "$lib/components/atoms/Modal.svelte";

  /**
   * トレーニング完了モーダルコンポーネントのprops
   */
  interface TrainingCompletionModalProps {
    /**
     * モーダルの表示状態
     */
    isOpen: boolean;
    /**
     * 完了したトレーニングの数
     */
    completedCount: number;
    /**
     * モーダルを閉じるハンドラー
     */
    onClose: () => void;
  }

  const { isOpen, completedCount, onClose }: TrainingCompletionModalProps =
    $props();
</script>

<Modal {isOpen} {onClose} title="トレーニング完了">
  <div class="space-y-6">
    <div class="flex flex-col items-center justify-center py-4">
      <div class="text-6xl mb-4">🎉</div>
      <h3 class="text-2xl font-bold text-gray-900 mb-2">お疲れ様でした！</h3>
      <p class="text-gray-600 text-center">
        本日のトレーニングを完了しました
      </p>
    </div>

    <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
      <div class="flex items-center justify-center space-x-2">
        <span class="text-gray-700 font-medium">完了したメニュー:</span>
        <span class="text-2xl font-bold text-blue-600">{completedCount}</span>
        <span class="text-gray-700 font-medium">種目</span>
      </div>
    </div>

    <div class="bg-green-50 rounded-lg p-4 border border-green-200">
      <p class="text-sm text-gray-700 text-center leading-relaxed">
        継続は力なり！明日も頑張りましょう！
      </p>
    </div>

    <div class="flex justify-center">
      <Button variant="primary" onclick={onClose} fullWidth>
        閉じる
      </Button>
    </div>
  </div>
</Modal>
