<script lang="ts">
import Button from "$lib/components/atoms/Button.svelte";
import GoogleIcon from "$lib/components/atoms/GoogleIcon.svelte";

/**
 * Googleログインボタンコンポーネントのprops
 */
interface GoogleLoginButtonProps {
	/**
	 * クリック時のハンドラー
	 */
	onclick: () => void;
}

const { onclick }: GoogleLoginButtonProps = $props();
</script>

<Button type="button" variant="secondary" fullWidth={true} {onclick}>
  <span class="flex items-center justify-center gap-3">
    <GoogleIcon />
    Googleでログイン
  </span>
</Button>
