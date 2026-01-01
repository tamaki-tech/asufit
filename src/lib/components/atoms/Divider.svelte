<script lang="ts">
  /**
   * 区切り線コンポーネントのprops
   */
  interface DividerProps {
    /**
     * 中央に表示するテキスト
     */
    text?: string;
  }

  let { text }: DividerProps = $props();
</script>

<div class="relative my-6">
  <div class="absolute inset-0 flex items-center">
    <div class="w-full border-t border-gray-300"></div>
  </div>
  {#if text}
    <div class="relative flex justify-center text-sm">
      <span class="px-2 bg-white text-gray-500">{text}</span>
    </div>
  {/if}
</div>
