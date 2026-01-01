<script lang="ts">
  import GoogleLoginButton from "$lib/components/molecules/GoogleLoginButton.svelte";
  import Divider from "$lib/components/atoms/Divider.svelte";

  /**
   * ソーシャルログインセクションのprops
   */
  interface SocialLoginSectionProps {
    /**
     * Googleログインのクリックハンドラー
     */
    onGoogleLogin: () => void;
  }

  let { onGoogleLogin }: SocialLoginSectionProps = $props();
</script>

<div>
  <GoogleLoginButton onclick={onGoogleLogin} />
  <Divider text="または" />
</div>
