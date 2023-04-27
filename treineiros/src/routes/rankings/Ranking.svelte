<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import MostMatches from "./MostMatches.svelte";
  import MostGoalsScored from "./MostGoalsScored.svelte";
  import MostGoalsConceded from "./MostGoalsConceded.svelte";
  import BestPointPercentage from "./BestPointPercentage.svelte";
  import RangeSlider from "svelte-range-slider-pips";
  export let mostRecentYear;

  const indicators = [
    "Partidas",
    "Gols Feitos",
    "Gols Sofridos",
    "Cartões Amarelos",
    "Cartões Vermelhos",
    "Aproveitamento",
  ];

  let selectedIndicator;

  const competitions = [
    {
      slug: "a",
      name: "Brasileiro Série A",
    },
    {
      slug: "b",
      name: "Brasileiro Série B",
    },
    {
      slug: "c",
      name: "Brasileiro Série C",
    },
    {
      slug: "d",
      name: "Brasileiro Série D",
    },
    {
      slug: "cb",
      name: "Copa do Brasil",
    },
  ];

  let selectedCompetitions = $page.url.searchParams.get("competitions");

  let period = [2014, mostRecentYear];

  const handleChange = () => {
    goto(`?competitions=${selectedCompetitions}&period=${period}`, {
      noScroll: true,
    });
  };
</script>

<section id="ranking">
  <h2>Rankings</h2>
  {#if selectedIndicator === "Partidas"}
    <MostMatches />
  {/if}
  {#if selectedIndicator === "Gols Feitos"}
    <MostGoalsScored />
  {/if}
  {#if selectedIndicator === "Gols Sofridos"}
    <MostGoalsConceded />
  {/if}
  {#if selectedIndicator === "Aproveitamento"}
    <BestPointPercentage />
  {/if}
  <select bind:value={selectedIndicator} id="indicator">
    <option selected disabled>Indicador</option>
    {#each indicators as indicator}
      <option value={indicator}>{indicator}</option>
    {/each}
  </select>
  <br />
  <div class="filter-div" id="competition-filter">
    <h3 id="competition-heading">Competição</h3>
    <form>
      {#each competitions as competition}
        <label>
          <input
            type="checkbox"
            name="competition"
            value={competition.slug}
            bind:group={selectedCompetitions}
            class="competition-checkbox"
            on:change={handleChange}
          />
          {competition.name}
        </label>
      {/each}
    </form>
  </div>
  <br />
  <div class="filter-div" id="year-filter">
    <h3 id="year-heading">Ano</h3>
    <RangeSlider
      float
      range="min/max"
      min={2014}
      max={mostRecentYear}
      pips
      first="label"
      last="label"
      id="slider"
      bind:values={period}
      on:change={handleChange}
    />
  </div>
</section>

<style>
  #ranking {
    display: grid;
    grid-template-columns: 8fr 2fr;
    grid-template-rows: auto;
    grid-template-areas:
      "title title"
      "table indicator"
      "table competition"
      "table period";
    gap: 3vw;
  }

  h2 {
    grid-area: title;
  }

  #indicator {
    grid-area: indicator;
    height: 50px;
  }

  form {
    margin: 1vw;
  }

  .filter-div {
    background-color: var(--table-background);
    border-radius: 1vw;
  }

  #competition-filter {
    grid-area: competition;
  }

  #competition-heading,
  #year-heading {
    font-family: var(--main-font);
    color: var(--main-color);
    text-align: center;
  }

  label {
    color: var(--main-color);
    font-family: var(--main-font);
    display: block;
  }

  #year-filter {
    grid-area: period;
  }
</style>
