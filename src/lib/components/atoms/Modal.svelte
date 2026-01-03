<script lang="ts">
/**
 * モーダルコンポーネントのprops
 */
interface ModalProps {
	/**
	 * モーダルの表示状態
	 */
	isOpen: boolean;
	/**
	 * モーダルを閉じる時のハンドラー
	 */
	onClose?: () => void;
	/**
	 * タイトル
	 */
	title?: string;
	/**
	 * 子要素
	 */
	children?: import("svelte").Snippet;
}

const { isOpen, onClose, title, children }: ModalProps = $props();

let firstFocusable: HTMLElement | null = $state(null);
let lastFocusable: HTMLElement | null = $state(null);

/**
 * モーダルが開いた時、フォーカス可能な要素を取得して最初の要素にフォーカス
 */
$effect(() => {
	if (isOpen) {
		const modalElement = document.querySelector('[role="dialog"]');
		if (!modalElement) return;

		const focusableElements = modalElement.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
		);

		if (focusableElements.length > 0) {
			firstFocusable = focusableElements[0] as HTMLElement;
			lastFocusable = focusableElements[
				focusableElements.length - 1
			] as HTMLElement;
			firstFocusable?.focus();
		}
	}
});

/**
 * 背景クリック時のハンドラー
 */
function handleBackdropClick(event: MouseEvent) {
	if (event.target === event.currentTarget) {
		onClose?.();
	}
}

/**
 * キーボード操作のハンドラー（Escapeキーでモーダルを閉じる、Tabキーでフォーカストラップ）
 */
function handleKeyDown(event: KeyboardEvent) {
	if (event.key === "Escape") {
		onClose?.();
	} else if (event.key === "Tab") {
		if (event.shiftKey) {
			if (document.activeElement === firstFocusable) {
				event.preventDefault();
				lastFocusable?.focus();
			}
		} else {
			if (document.activeElement === lastFocusable) {
				event.preventDefault();
				firstFocusable?.focus();
			}
		}
	}
}
</script>

{#if isOpen}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    onclick={handleBackdropClick}
    onkeydown={handleKeyDown}
    role="dialog"
    aria-modal="true"
    aria-labelledby={title ? "modal-title" : undefined}
    tabindex="-1"
  >
    <div
      class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      role="document"
    >
      {#if title}
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 id="modal-title" class="text-xl font-bold text-gray-900">{title}</h2>
        </div>
      {/if}
      <div class="px-6 py-4">
        {#if children}
          {@render children()}
        {/if}
      </div>
    </div>
  </div>
{/if}
