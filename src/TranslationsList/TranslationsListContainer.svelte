<script>
  import List from './List.svelte';
  import { onMount } from 'svelte';
  $: range = '';
  $: spreadsheetId = '';

  $: originalWord = '';
  $: translation = '';
  let data = [];
  function getList() {
    gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId,
        range,
      })
      .then(({ result }) => {
        data = result.values;
      });
  }

  function submit() {
    localStorage.setItem('spreadSheetId', spreadsheetId);
    localStorage.setItem('range', range);
    getList();
  }

  function addTranslation() {
    if (spreadsheetId) {
      gapi.client.sheets.spreadsheets.values
        .update({
          spreadsheetId,
          range,
          valueInputOption: 'USER_ENTERED',
          resource: {
            values: [[originalWord, translation]],
          },
        })
        .then(() => {
          data = [[originalWord, translation], ...data];
        });
    }
  }

  onMount(() => {
    const cachedId = localStorage.getItem('spreadSheetId');
    const cachedRange = localStorage.getItem('range');
    if (cachedId && cachedRange) {
      spreadsheetId = cachedId;
      range = cachedRange;
      getList();
    }
  });
</script>

<style>
  .container {
    display: block;
  }
</style>

<section class="container">
  <div>
    <input placeholder="Spreadsheet id" bind:value={spreadsheetId} />
    <input placeholder="range" bind:value={range} />
    <button on:click={submit}>Submit</button>
  </div>
  <div>
    <input placeholder="Original" bind:value={originalWord} />
    <input placeholder="translation" bind:value={translation} />
    <button on:click={addTranslation}>Add translation</button>
  </div>
  <List {data} />
</section>
