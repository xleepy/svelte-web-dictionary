<script>
  import { onMount, afterUpdate, beforeUpdate, onDestroy } from "svelte";
  import TranslationsList from "./TranslationsList/TranslationsListContainer.svelte";

  const discoveryDocs = [
    "https://sheets.googleapis.com/$discovery/rest?version=v4",
  ];
  const scope = "https://www.googleapis.com/auth/spreadsheets.readonly";

  let isLoggedIn = false;

  function updateSignInStatus(isSignedIn) {
    isLoggedIn = isSignedIn;
  }

  function initClient() {
    gapi.client
      .init({
        apiKey: process.env.API_KEY,
        clientId: process.env.CLIENT_ID,
        discoveryDocs,
        scope,
      })
      .then(() => {
        // Listen for sign-in state changes.
        // Handle the initial sign-in state.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
  }

  function handleClientLoad() {
    gapi.load("client:auth2", initClient);
  }

  window.addEventListener("load", handleClientLoad);

  onDestroy(() => {
    window.removeEventListener("load", handleClientLoad);
  });

  function handleSignIn() {
    gapi.auth2.getAuthInstance().signIn();
  }

  function handleSignOut() {
    gapi.auth2.getAuthInstance().signOut();
  }
</script>

<main>
  {#if !isLoggedIn}
    <button on:click={handleSignIn}>Login</button>
  {/if}
  {#if isLoggedIn}
    <button on:click={handleSignOut}>Logout</button>
    <TranslationsList />
  {/if}
</main>
