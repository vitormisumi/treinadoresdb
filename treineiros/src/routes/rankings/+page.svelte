<script>
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import Ranking from "./Ranking.svelte";

  export let data;

  const mostMatches = writable();
  $: mostMatches.set(data.mostMatches);
  setContext("mostMatches", mostMatches);

  const mostGoalsScored = writable();
  $: mostGoalsScored.set(data.mostGoalsScored);
  setContext("mostGoalsScored", mostGoalsScored);

  const mostGoalsConceded = writable();
  $: mostGoalsConceded.set(data.mostGoalsConceded);
  setContext("mostGoalsConceded", mostGoalsConceded);
</script>

<Ranking />
