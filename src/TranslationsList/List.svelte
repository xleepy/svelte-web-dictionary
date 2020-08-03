<script>
  import { onMount, afterUpdate } from "svelte";

  export let spreadsheetId;
  export let range;

  let data = [];

  function getList() {
    gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId,
        range,
      })
      .then(({ result }) => {
        data = result.values.reverse();
      });
  }
  onMount(getList);
  afterUpdate(getList);
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
