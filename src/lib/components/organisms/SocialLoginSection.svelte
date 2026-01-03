<script lang="ts">
import Divider from "$lib/components/atoms/Divider.svelte";
import GoogleLoginButton from "$lib/components/molecules/GoogleLoginButton.svelte";

/**
 * ソーシャルログインセクションのprops
 */
interface SocialLoginSectionProps {
	/**
	 * Googleログインのクリックハンドラー
	 */
	onGoogleLogin: () => void;
}

const { onGoogleLogin }: SocialLoginSectionProps = $props();
</script>

<div>
  <GoogleLoginButton onclick={onGoogleLogin} />
  <Divider text="または" />
</div>
