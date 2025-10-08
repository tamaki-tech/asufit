<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<h2 class="text-3xl font-bold underline mb-4">API Result:</h2>
<pre class="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
