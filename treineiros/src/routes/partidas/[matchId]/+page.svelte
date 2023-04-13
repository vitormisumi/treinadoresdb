<script>
  import Navbar from "../../home/Navbar.svelte";
  import Match from "./Match.svelte";

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<Navbar />
<Match
  matchData={data.matchData}
  competition={data.competition}
  teams={data.teams}
  coaches={data.coaches}
/>
