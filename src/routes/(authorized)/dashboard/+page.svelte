<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<div class="container mx-auto p-8">
  <h1 class="text-4xl font-bold mb-4">Hello world</h1>

  <div class="bg-gray-100 p-4 rounded">
    <p class="text-sm text-gray-600">認証済みユーザー: {data.user.email}</p>
  </div>
</div>
