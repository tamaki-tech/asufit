<script lang="ts">
  /**
   * アラートコンポーネントのprops
   */
  interface AlertProps {
    /**
     * アラートのタイプ（色とアイコンを決定）
     */
    type: "success" | "error" | "warning" | "info";
    /**
     * アラートのメッセージ
     */
    message: string;
  }

  let { type, message }: AlertProps = $props();

  /**
   * アラートタイプに応じたCSSクラスを生成
   */
  const alertClasses = $derived(() => {
    switch (type) {
      case "success":
        return "bg-green-100 border-green-400 text-green-700";
      case "error":
        return "bg-red-100 border-red-400 text-red-700";
      case "warning":
        return "bg-yellow-100 border-yellow-400 text-yellow-700";
      case "info":
        return "bg-blue-100 border-blue-400 text-blue-700";
      default:
        return "bg-gray-100 border-gray-400 text-gray-700";
    }
  });
</script>

<div class={`${alertClasses()} border px-4 py-3 rounded mb-4`} role="alert">
  <p>{message}</p>
</div>
