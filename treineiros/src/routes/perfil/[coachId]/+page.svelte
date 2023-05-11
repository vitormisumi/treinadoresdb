<script>
  import Profile from "./Profile.svelte";
  import History from "./History.svelte";
  import Matches from "./Matches.svelte";
  import Performance from "./Performance.svelte";
  import H2H from "./H2H.svelte";

  export let data;
</script>

<Profile {...data} />
<History {...data} />
<Matches {...data} />
<Performance {...data} />
<H2H {...data} />
