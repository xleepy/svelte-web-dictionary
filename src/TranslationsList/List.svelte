<script>
  export let data;
</script>

<style>
  ul {
    padding: 1rem 0;
    margin: 0;
  }
  ul li {
    list-style: none;
    padding: 1rem 0;
    border-radius: 6px;
    padding: 1rem;

    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
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
