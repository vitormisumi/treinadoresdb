<script>
    let tableHeaders = [
    "Data",
    "Local",
    "Competição",
    "Mandante",
    "Resultado",
    "Visitante",
  ];

  let matchData = [
    [
      "06/04/2023",
      "Maracanã",
      "Brasileiro Série A",
      "Internacional",
      "2x3",
      "Palmeiras",
    ],
    [
      "06/04/2023",
      "Maracanã",
      "Brasileiro Série A",
      "Internacional",
      "2x3",
      "Palmeiras",
    ],
  ];

  let teams = ["Palmeiras", "Internacional"];
  let seasons = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
  let competitions = [
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
  <table>
    <tbody>
      <tr>
        {#each tableHeaders as header}
          <th>{header}</th>
        {/each}
      </tr>
      {#each matchData as matches}
        <tr>
          {#each matches as match}
            <td>{match}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
  <p>*Equipe comandada pelo treinador em negrito</p>
</section>
