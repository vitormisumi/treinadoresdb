<script>
  import Profile from "./Profile.svelte";
  import History from "./History.svelte";
  import Matches from "./Matches.svelte";
  import Performance from "./Performance.svelte";
  import H2H from "./H2H.svelte";

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<Profile
  coach={data.coach}
  lastClub={data.lastClub}
  lastMatch={data.lastMatch}
  numberOfClubs={data.numberOfClubs}
  numberOfMatches={data.numberOfMatches}
  mostMatches={data.mostMatches}
  pointPercentage={data.pointPercentage}
  goalsScoredAvg={data.goalsScoredAvg}
  goalsConcededAvg={data.goalsConcededAvg}
/>
<History history={data.history} totalHistory={data.totalHistory}/>
<Matches matches={data.matches} />
<Performance />
<H2H />
