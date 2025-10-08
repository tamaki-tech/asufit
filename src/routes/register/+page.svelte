<script lang="ts">
  import { client } from "$lib/api/client";

  let title = $state("");
  let author = $state("");
  let result = $state<any>(null);

  const handleSubmit = async () => {
    const response = await client.book.$post(
      { json: { title, author } },
      { fetch }
    );
    result = await response.json();
  };
</script>

<h2 class="text-3xl font-bold underline mb-4">Create Book</h2>
<form onsubmit={handleSubmit} class="space-y-4">
  <div>
    <label for="title" class="block mb-2">Title:</label>
    <input
      id="title"
      type="text"
      bind:value={title}
      class="border p-2 rounded w-80"
      required
    />
  </div>
  <div>
    <label for="author" class="block mb-2">Author:</label>
    <input
      id="author"
      type="text"
      bind:value={author}
      class="border p-2 rounded w-80"
      required
    />
  </div>
  <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
    Submit
  </button>
</form>

{#if result}
  <div class="mt-4">
    <p class="mb-2">POST Result:</p>
    <pre class="bg-gray-100 p-4 rounded">{JSON.stringify(result, null, 2)}</pre>
  </div>
{/if}
