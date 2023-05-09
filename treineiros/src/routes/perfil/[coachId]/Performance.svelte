<script>
  import GraphGoalsScored from "./GraphGoalsScored.svelte";
  import GraphGoalsConceded from "./GraphGoalsConceded.svelte";
  import { selectedGraph } from "$lib/stores/graphs";

  export let goalsScoredDistribution;
  export let goalsConcededDistribution;
  export let goalsScoredAvg;
  export let goalsConcededAvg;
  export let coach;

  let graphs = ["Gols Feitos/Partida", "Gols Sofridos/Partida"];
</script>

<section id="performance">
  <h2>Desempenho</h2>
  <select name="graph" id="graph" bind:value={$selectedGraph}>
    <option selected disabled>Indicador</option>
    {#each graphs as graph}
      <option value={graph}>{graph}</option>
    {/each}
  </select>
  {#if $selectedGraph === "Gols Feitos/Partida"}
    <GraphGoalsScored {goalsScoredDistribution} {goalsScoredAvg} {coach} />
  {/if}
  {#if $selectedGraph === "Gols Sofridos/Partida"}
    <GraphGoalsConceded {goalsConcededDistribution} {goalsConcededAvg} {coach} />
  {/if}
</section>

<style>
  #graph {
    margin: 10px;
  }
</style>
