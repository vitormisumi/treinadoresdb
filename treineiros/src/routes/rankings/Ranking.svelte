<script>
  import MostMatches from "./MostMatches.svelte";
  import MostGoalsScored from "./MostGoalsScored.svelte";
  import MostGoalsConceded from "./MostGoalsConceded.svelte";

  const indicators = [
    "Mais partidas",
    "Mais gols feitos",
    "Mais gols sofridos",
    "Melhor aproveitamento",
    "Melhor média de gols",
  ];

  let selectedIndicator;

  const competitions = [
    "Brasileiro Série A",
    "Brasileiro Série B",
    "Brasileiro Série C",
    "Brasileiro Série D",
    "Copa do Brasil",
  ];

  let selectedCompetitions = [
    "Brasileiro Série A",
    "Brasileiro Série B",
    "Brasileiro Série C",
    "Brasileiro Série D",
    "Copa do Brasil",
  ];
</script>

<section id="ranking">
  <h2>Rankings</h2>
  {#if selectedIndicator === "Mais partidas"}
    <MostMatches />
  {:else if selectedIndicator === "Mais gols feitos"}
    <MostGoalsScored />
  {:else if selectedIndicator === "Mais gols sofridos"}
    <MostGoalsConceded />
  {/if}
  <select bind:value={selectedIndicator} id="indicator">
    <option selected disabled>Indicador</option>
    {#each indicators as indicator}
      <option value={indicator}>{indicator}</option>
    {/each}
  </select>
  <br />
  <div id="competition-filter">
    <h3 id="competition-heading">Competição</h3>
    {#each competitions as competition}
      <label for={competition} class="competitions">
        <input
          type="checkbox"
          bind:group={selectedCompetitions}
          value={competition}
          class="competition-checkbox"
        />
        {competition}
      </label>
    {/each}
  </div>
  <br />
</section>

<style>
  #ranking {
    display: grid;
    grid-template-columns: 7fr 3fr;
    grid-template-rows: auto;
    grid-template-areas:
      "title title"
      "table indicator"
      "table competition"
      "table period"
      "asterisk asterisk";
    column-gap: 5vw;
  }

  h2 {
    grid-area: title;
  }

  #indicator {
    grid-area: indicator;
    height: 50px;
  }

  #indicator:after {
    position: absolute;
    content: "";
    top: 14px;
    right: 10px;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-color: #fff transparent transparent transparent;
  }

  #competition-filter {
    grid-area: competition;
  }

  #competition-heading {
    font-family: var(--main-font);
    color: var(--main-color);
    text-align: center;
  }

  .competitions {
    color: var(--main-color);
    font-family: var(--main-font);
    display: block;
  }

  .competition-checkbox {
    background-color: var(--main-color);
  }
</style>
