<script>
  import Profile from "./Profile.svelte";
  import Comparison from "./Comparison.svelte";
  import Matches from "./Matches.svelte";
  import Search from "./Search.svelte";

  export let data;
</script>

<Search coaches={data.coaches} />
<Profile
  coachInfo1={data.coachInfo1}
  coachInfo2={data.coachInfo2}
  h2h={data.h2h}
/>
<Comparison
  coachInfo1={data.coachInfo1}
  coachInfo2={data.coachInfo2}
  h2h={data.h2h}
/>
<Matches />
