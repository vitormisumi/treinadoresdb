<script>
  import Match from "./Match.svelte";

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<Match
  matchData={data.matchData}
  competition={data.competition}
  teams={data.teams}
  coaches={data.coaches}
/>
