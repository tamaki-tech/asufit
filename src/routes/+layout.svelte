<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="p-4">
  <h1 class="text-3xl font-bold underline mb-4">Hello Sveltekit + hono.js</h1>
  {@render children()}
</div>
