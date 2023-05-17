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
  export let pointPercentage;
  export let pointPercentageDistribution;
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
      help: "",
    },
    {
      name: "Gols Sofridos",
      distribution: goalsConcededDistribution,
      coachData: goalsConcededAvg,
      binSize: 0.1,
      xLabel: "gols sofridos/partida",
      decimals: 1,
      help: "",
    },
    {
      name: "Cartões Amarelos",
      distribution: yellowCardsDistribution,
      coachData: yellowCardsAvg,
      binSize: 0.2,
      xLabel: "cartões amarelos/partida",
      decimals: 1,
      help: "",
    },
    {
      name: "Cartões Vermelhos",
      distribution: redCardsDistribution,
      coachData: redCardsAvg,
      binSize: 0.03,
      xLabel: "cartões vermelhos/partida",
      decimals: 2,
      help: "",
    },
    {
      name: "Aproveitamento",
      distribution: pointPercentageDistribution,
      coachData: pointPercentage,
      binSize: 4,
      xLabel: "% de pontos conquistados",
      decimals: 0,
      help: "",
    },
    {
      name: "Saldo de Gols Pré Substituição",
      distribution: preSubDistribution,
      coachData: preSubGoalDifference,
      binSize: 0.1,
      xLabel: "saldo de gols pré substituição/partida",
      decimals: 1,
      help: "O que é Saldo de Gols Pré Substituição? É o saldo de gols antes do treinador realizar a 1ª substituição. Ex: a equipe do treinador está perdendo por 1x2 no momento que o treinador decide realizar a 1ª substituição. Nessa partida o saldo de gols pré substituição portanto será de -1. De maneira geral, um bom desempenho nesse indicador sugere um treinador que escala bem suas equipes.",
    },
    {
      name: "Saldo de Gols Pós Substituição",
      distribution: postSubDistribution,
      coachData: postSubGoalDifference,
      binSize: 0.08,
      xLabel: "saldo de gols pós substituição/partida",
      decimals: 2,
      help: "O que é Saldo de Gols Pós Substituição? É o saldo de gols após o treinador realizar a 1ª substituição. Ex: a equipe do treinador está perdendo por 0x1 no momento que o treinador decide realizar a 1ª substituição. Após isso a equipe vira o jogo para 2x1. Nessa partida o saldo de gols pós substituição portanto será de +2. De maneira geral, um bom desempenho nesse indicador sugere um treinador que faz boas substituições.",
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
    <select name="graph" bind:value={$selectedGraph}>
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
  select {
    margin-bottom: 10px;
    max-width: 300px;
    height: 40px;
    background-color: var(--main-color);
    border-color: var(--accent-color);
    border-radius: 5px;
    color: var(--background-color);
  }
</style>
