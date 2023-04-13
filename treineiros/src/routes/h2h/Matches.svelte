<script>
  let matchData = [
    {
      Data: "06/04/2023",
      Estádio: "Maracanã",
      Competição: "Brasileiro Série A",
      Mandante: "Internacional",
      Resultado: "2x3",
      Visitante: "Palmeiras",
    },
    {
      Data: "06/04/2023",
      Estádio: "Maracanã",
      Competição: "Brasileiro Série A",
      Mandante: "Internacional",
      Resultado: "2x3",
      Visitante: "Palmeiras",
    },
  ];

  let teams = ["Palmeiras", "Internacional"];
  let seasons = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
  const competitions = [
    "Brasileiro Série A",
    "Brasileiro Série B",
    "Brasileiro Série C",
    "Brasileiro Série D",
    "Copa do Brasil",
  ];
</script>

<section id="matches">
  <h2>Partidas</h2>
  <label for="team">Filtrar por:</label>
  <select name="team" id="team">
    <option value="default" selected>Equipe (todas)</option>
    {#each teams as team}
      <option value={team}>{team}</option>
    {/each}
  </select>
  <select name="team" id="team">
    <option value="default" selected>Temporada (todas)</option>
    {#each seasons as season}
      <option value={season}>{season}</option>
    {/each}
  </select>
  <select name="team" id="team">
    <option value="default" selected>Competição (todas)</option>
    {#each competitions as competition}
      <option value={competition}>{competition}</option>
    {/each}
  </select>
  <div id="table">
    <table id="matches-table">
      <tbody>
        <tr>
          {#each Object.entries(matchData[0]) as [key, value]}
            <th class="headers">{key}</th>
          {/each}
        </tr>
        {#each matchData as match}
          <tr>
            {#each Object.entries(match) as [key, value]}
              <td class="data">{value}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>

<style>
  #table {
    overflow-x: auto;
  }

  #matches-table {
    background-color: #ffffff15;
    color: var(--main-color);
    width: 100%;
  }
  
  .headers {
    text-transform: uppercase;
    font-family: var(--main-font);
    font-weight: var(--bold);
    font-size: clamp(0.75rem, 2.5vw, 1.5rem);
  }
  
  .data {
    padding: 0 10px;
    text-align: center;
    font-family: var(--main-font);
    font-size: clamp(0.75rem, 2.5vw, 1.5rem);
  }
</style>
