<script>
  import MostMatches from "./MostMatches.svelte";

  const indicators = [
    "Mais partidas",
    "Mais gols feitos",
    "Mais gols sofridos",
    "Melhor aproveitamento",
    "Melhor média de gols",
  ];

  let selectedIndicator;

  let competitions = [
    "Campeonato Brasileiro - Serie A",
    "Campeonato Brasileiro - Serie B",
    "Campeonato Brasileiro - Serie C",
    "Campeonato Brasileiro - Serie D",
    "Copa do Brasil - Profissional",
  ];

  let form;
</script>

<section id="ranking">
  <h2>Rankings</h2>
  {#if selectedIndicator === "Mais partidas"}
    <MostMatches />
  {/if}
  <select bind:value={selectedIndicator} id="indicator">
    <option selected disabled>Indicador</option>
    {#each indicators as indicator}
      <option value={indicator}>{indicator}</option>
    {/each}
  </select>
  <br />
  <form method="POST" bind:this={form}>
    <div id="competition-filter">
      <h3 id="competition-heading">Competição</h3>
      {#each competitions as competition}
        <label for={competition} class="competitions">
          <input
            type="checkbox"
            name="competition"
            value={competition}
            class="competition-checkbox"
          />
          {competition}
        </label>
      {/each}
      <button id="update-competition" on:click={() => form.requestSubmit()}>Atualizar</button>
    </div>
  </form>
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
    background-color: var(--table-background);
    border-radius: 1vw;
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
