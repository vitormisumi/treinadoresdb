<script>
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import Ranking from "./Ranking.svelte";

  export let data;

  const mostMatches = writable();
  $: mostMatches.set(data.mostMatches);
  setContext("mostMatches", mostMatches);

</script>

<Ranking />
