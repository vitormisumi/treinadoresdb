<script>
  import { selectedGraph } from "$lib/stores/graphs";
  import PerformanceGraph from "./PerformanceGraph.svelte";

  export let coach;
  export let goalsScoredDistribution;
  export let goalsConcededDistribution;
  export let goalsScoredAvg;
  export let goalsConcededAvg;
  export let yellowCardsDistribution;
  export let yellowCardsAvg;
  export let redCardsDistribution;
  export let redCardsAvg;
  export let preSubDistribution;
  export let preSubGoalDifference;
  export let postSubDistribution;
  export let postSubGoalDifference;

  let graphs = [
    {
      name: "Gols Feitos/Partida",
      distribution: goalsScoredDistribution,
      coachData: goalsScoredAvg,
      binSize: 0.1,
      xLabel: "gols feitos/partida",
      decimals: 1,
    },
    {
      name: "Gols Sofridos/Partida",
      distribution: goalsConcededDistribution,
      coachData: goalsConcededAvg,
      binSize: 0.1,
      xLabel: "gols sofridos/partida",
      decimals: 1,
    },
    {
      name: "Cartões Amarelos/Partida",
      distribution: yellowCardsDistribution,
      coachData: yellowCardsAvg,
      binSize: 0.15,
      xLabel: "cartões amarelos/partida",
      decimals: 2,
    },
    {
      name: "Cartões Vermelhos/Partida",
      distribution: redCardsDistribution,
      coachData: redCardsAvg,
      binSize: 0.03,
      xLabel: "cartões vermelhos/partida",
      decimals: 2,
    },
    {
      name: "Saldo de Gols Pré Substituição",
      distribution: preSubDistribution,
      coachData: preSubGoalDifference,
      binSize: 0.1,
      xLabel: "saldo de gols pré substituição/partida",
      decimals: 2,
    },
    {
      name: "Saldo de Gols Pós Substituição",
      distribution: postSubDistribution,
      coachData: postSubGoalDifference,
      binSize: 0.08,
      xLabel: "saldo de gols pós substituição/partida",
      decimals: 2,
    },
  ];
</script>

<section id="performance">
  <h2>Desempenho</h2>
  <select name="graph" id="graph" bind:value={$selectedGraph}>
    <option selected disabled>Indicador</option>
    {#each graphs as graph}
      <option value={graph.name}>{graph.name}</option>
    {/each}
  </select>
  {#each graphs as graph}
    {#if $selectedGraph === graph.name}
      <PerformanceGraph
        distribution={graph.distribution}
        coachData={graph.coachData}
        {coach}
        binSize={graph.binSize}
        xLabel={graph.xLabel}
        decimals={graph.decimals}
      />
    {/if}
  {/each}
</section>

<style>
  #graph {
    margin: 10px;
  }
</style>
