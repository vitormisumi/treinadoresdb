<script>
  let coachesList = {
    "Guto Ferreira": 100,
    "Mano Menezes": 90,
    "Vanderlei Luxemburgo": 80,
    "Abel Ferreira": 70,
    "Rogério Ceni": 60,
    "Vagner Mancini": 50,
    "Odair Hellmann": 40,
    "Fernando Diniz": 30,
    Felipão: 20,
    "Dorival Júnior": 10,
  };

  const indicators = [
    "Mais partidas",
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
  <table id="ranking-table">
    <tbody>
      {#each Object.entries(coachesList) as [key, value], i}
        <tr>
          <td class="position-column">{i + 1}º</td>
          <td class="coach-column">{key}</td>
          <td class="value-column">{value}</td>
        </tr>
      {/each}
    </tbody>
  </table>
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

  #ranking-table {
    font-family: var(--main-font);
    font-size: clamp(1rem, 4vw, 2.5rem);
    border-collapse: collapse;
    grid-area: table;
  }

  #ranking-table tr:first-child td {
    border-radius: 1vw 1vw 0 0;
  }

  #ranking-table tr:last-child td {
    border-radius: 0 0 1vw 1vw;
    border: 0;
  }

  td {
    border: 1px solid;
    border-color: var(--background-color) var(--background-color) #e5e5e525;
  }

  .position-column {
    color: var(--main-color);
  }

  .coach-column {
    color: var(--main-color);
    background-color: var(--table-background);
  }

  .value-column {
    color: var(--accent-color);
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

  #asterisk {
    color: var(--main-color);
    grid-area: asterisk;
  }
</style>
