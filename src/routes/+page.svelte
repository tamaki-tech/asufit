<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<div class="p-4">
  <h1 class="text-3xl font-bold underline mb-4">Hello Sveltekit + hono.js</h1>
  <p class="mb-2">API Result:</p>
  <pre class="bg-gray-100 p-4 rounded">{JSON.stringify(
      data.books,
      null,
      2
    )}</pre>
</div>
