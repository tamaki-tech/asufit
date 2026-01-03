<script lang="ts">
import Button from "$lib/components/atoms/Button.svelte";
import Modal from "$lib/components/atoms/Modal.svelte";

/**
 * トレーニング開始モーダルコンポーネントのprops
 */
interface StartTrainingModalProps {
	/**
	 * モーダルの表示状態
	 */
	isOpen: boolean;
	/**
	 * モチベーションメッセージ
	 */
	motivationMessage: string;
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
	motivationMessage,
	onClose,
	onStartTraining,
}: StartTrainingModalProps = $props();
</script>

<Modal {isOpen} {onClose} title="トレーニングを始めましょう！">
  <div class="space-y-6">
    <p class="text-lg text-gray-700 leading-relaxed">{motivationMessage}</p>
    <div class="flex space-x-3">
      <Button variant="secondary" onclick={onClose} fullWidth>
        キャンセル
      </Button>
      <Button variant="primary" onclick={onStartTraining} fullWidth>
        開始する
      </Button>
    </div>
  </div>
</Modal>
