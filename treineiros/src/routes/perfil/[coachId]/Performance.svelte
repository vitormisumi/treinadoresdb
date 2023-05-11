<script>
  import { selectedGraph } from "$lib/stores/graphs";
  import PerformanceGraph from "./PerformanceGraph.svelte";

  export let coach;
  export let numberOfMatches;
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

  $: graphs = [
    {
      name: "Gols Feitos",
      distribution: goalsScoredDistribution,
      coachData: goalsScoredAvg,
      binSize: 0.1,
      xLabel: "gols feitos/partida",
      decimals: 1,
    },
    {
      name: "Gols Sofridos",
      distribution: goalsConcededDistribution,
      coachData: goalsConcededAvg,
      binSize: 0.1,
      xLabel: "gols sofridos/partida",
      decimals: 1,
    },
    {
      name: "Cartões Amarelos",
      distribution: yellowCardsDistribution,
      coachData: yellowCardsAvg,
      binSize: 0.15,
      xLabel: "cartões amarelos/partida",
      decimals: 2,
    },
    {
      name: "Cartões Vermelhos",
      distribution: redCardsDistribution,
      coachData: redCardsAvg,
      binSize: 0.03125,
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
  {#if numberOfMatches < 50}
    {#if coach.nickname !== null}
      <p class="main-color">
        As análises de desempenho estão disponíveis apenas para treinadores com
        pelo menos 50 partidas cadastradas. {coach.nickname} possui apenas {numberOfMatches}
        partidas.
      </p>
    {:else}
      <p class="main-color">
        As análises de desempenho estão disponíveis apenas para treinadores com
        pelo menos 50 partidas cadastradas. {coach.name} possui apenas {numberOfMatches}
        partidas.
      </p>
    {/if}
  {:else}
    <select name="graph" id="graph" bind:value={$selectedGraph}>
      <option selected disabled>Indicador</option>
      {#each graphs as graph}
        <option value={graph.name}>{graph.name}</option>
      {/each}
    </select>
    {#each graphs as graph}
      {#if $selectedGraph === graph.name}
        <PerformanceGraph {...graph} {coach} />
      {/if}
    {/each}
  {/if}
</section>

<style>
  #graph {
    margin: 10px;
  }
</style>
