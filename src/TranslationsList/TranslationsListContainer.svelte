<script>
  import List from "./List.svelte";
  import { onMount } from "svelte";
  $: range = "";
  $: spreadsheetId = "";
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

  function submit() {
    localStorage.setItem("spreadSheetId", spreadsheetId);
    localStorage.setItem("range", range);
    getList();
  }

  onMount(() => {
    const cachedId = localStorage.getItem("spreadSheetId");
    const cachedRange = localStorage.getItem("range");
    if (cachedId && cachedRange) {
      spreadsheetId = cachedId;
      range = cachedRange;
      getList();
    }
  });
</script>

<div>
  <input placeholder="Spreadsheet id" bind:value={spreadsheetId} />
  <input placeholder="range" bind:value={range} />
  <button on:click={submit}>Submit</button>
  <List {data} />
</div>
