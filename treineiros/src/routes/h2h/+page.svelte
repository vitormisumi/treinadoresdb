<script>
  import { coach1, coach2 } from "$lib/stores/h2hCoaches";
  import Profile from "./Profile.svelte";
  import Comparison from "./Comparison.svelte";
  import Matches from "./Matches.svelte";
  import Search from "./Search.svelte";

  export let data;
</script>

<Search coaches={data.coaches} />
{#if !($coach1 === 0 && $coach2 === 0)}
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
{:else}
  <h4>Selecione os treinadores utilizando os mecanismos de busca acima</h4>
{/if}
{#if $coach1 !== 0 && $coach2 !== 0}
  <Matches matches={data.matches} />
{/if}

<style>
  h4 {
    text-align: center;
    margin-bottom: 250px;
  }
</style>
