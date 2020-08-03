<script>
  import { onMount, afterUpdate } from "svelte";

  export let data;
</script>

<style>
  ul {
    padding: 0;
    margin: 0;
  }
  ul li {
    list-style: none;
    padding: 1rem 0;
    border-radius: 6px;
  }
  li + li {
    margin-top: 0.65rem;
  }
</style>

<ul>
  {#each data as [original, translated]}
    <li>{`${original} - ${translated}`}</li>
  {/each}
</ul>
