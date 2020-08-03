<script>
  import List from "./List.svelte";
  import { onMount } from "svelte";
  $: range = "";
  $: spreadsheetId = "";
  let isSubmited = false;

  function submit() {
    isSubmited = true;
    localStorage.setItem("spreadSheetId", spreadsheetId);
    localStorage.setItem("range", range);
  }

  onMount(() => {
    const cachedId = localStorage.getItem("spreadSheetId");
    const cachedRange = localStorage.getItem("range");
    if (cachedId && cachedRange) {
      spreadsheetId = cachedId;
      range = cachedRange;
      isSubmited = true;
    }
  });
</script>

<div>
  <input placeholder="Spreadsheet id" bind:value={spreadsheetId} />
  <input placeholder="range" bind:value={range} />
  <button on:click={submit}>Submit</button>
  {#if isSubmited}
    <List {spreadsheetId} {range} />
  {/if}
</div>
