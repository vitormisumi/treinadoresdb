<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { indicator } from "$lib/stores/indicator";
  import RangeSlider from "svelte-range-slider-pips";
  import { CollapsibleCard } from "svelte-collapsible";

  export let mostRecentYear;

  const indicators = [
    "Partidas",
    "Gols Feitos",
    "Gols Sofridos",
    "Cartões Amarelos",
    "Cartões Vermelhos",
    "Aproveitamento (%)",
  ];

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
  let minMatches = 50;
  let totalOrPerMatch = "total";

  const handleChange = () => {
    goto(
      `?competitions=${selectedCompetitions}&period=${period}&minmatches=${minMatches}&value=${totalOrPerMatch}`,
      {
        noScroll: true,
      }
    );
  };
</script>

<!-- INDICATOR -->
<select bind:value={$indicator} id="indicator">
  <option selected disabled>Indicador</option>
  {#each indicators as indicator}
    <option value={indicator}>{indicator}</option>
  {/each}
</select>
<CollapsibleCard>
  <p slot="header" class="label right">
    Filtros <i class="fa-solid fa-arrow-down" />
  </p>
  <div slot="body" class="body">
    <!-- VALUE FILTER -->
    {#if !["Partidas", "Aproveitamento (%)"].includes($indicator)}
      <div class="filter-div" id="value-filter">
        <h3 class="filter-heading">Valor</h3>
        <div class="filter-values" id="value-options">
          <label>
            <input
              type="radio"
              bind:group={totalOrPerMatch}
              value="total"
              on:change={handleChange}
            />
            Total
          </label>
          <label>
            <input
              type="radio"
              bind:group={totalOrPerMatch}
              value="permatch"
              on:change={handleChange}
            />
            Por Partida
          </label>
        </div>
      </div>
    {/if}
    <!-- COMPETITION FILTER -->
    <div class="filter-div" id="competition-filter">
      <h3 class="filter-heading">Competição</h3>
      <div class="filter-values">
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
      </div>
    </div>
    <!-- YEAR FILTER -->
    <div class="filter-div" id="year-filter">
      <h3 class="filter-heading">Ano</h3>
      <div class="filter-values">
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
    </div>
    <!-- MINIMUM MATCHES FILTER -->
    {#if $indicator !== "Partidas"}
      <div class="filter-div" id="minmatches">
        <h3 class="filter-heading">Mínimo de Partidas</h3>
        <div class="filter-values">
          <input
            type="number"
            bind:value={minMatches}
            min="0"
            max="200"
            id="min-matches-input"
            on:change={handleChange}
          />
        </div>
      </div>
    {/if}
  </div>
</CollapsibleCard>

<style>
  select {
    height: 40px;
    background-color: var(--main-color);
    border-color: var(--accent-color);
    border-radius: 5px;
    color: var(--background-color);
  }

  .body {
    margin-bottom: 5vh;
    display: block;
    gap: 1.5vh;
  }

  .filter-values {
    padding: 0 1vw 1vw 1vw;
  }

  .filter-div {
    background-color: var(--table-background);
    border-radius: 1vw;
  }

  label {
    display: block;
  }

  #min-matches-input {
    width: 60px;
  }

  .filter-heading {
    font-size: clamp(0.75rem, 2vw, 1.25rem);
    font-family: var(--main-font);
    padding: 1vw 0 0 1vw;
  }
</style>
