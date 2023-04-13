<script>
  let tableHeaders = [
    "Data",
    "Local",
    "Competição",
    "Mandante",
    "Resultado",
    "Visitante",
  ];

  export let matches;

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
  <div id="table">
    <table id="matches-table">
      <thead>
        <tr>
          {#each tableHeaders as header}
            <th class="headers">{header}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each matches as { date_time, stadium, competition, home_team, home_team_state, home_score, away_score, away_team, away_team_state, coach }, i}
          <tr>
            <td class="date"
              >{('0' + date_time.getDate()).slice(-2)}/{('0' + (date_time.getMonth() +
                1)).slice(-2)}/{date_time.getFullYear()}</td
            >
            <td>{stadium}</td>
            <td>{competition}</td>
            {#if coach === "Mandante"}
              <td class="coach-team home-team">{home_team}/{home_team_state}</td
              >
            {:else}
              <td class="home-team">{home_team}/{home_team_state}</td>
            {/if}
            <td class="score">{home_score}x{away_score}</td>
            {#if coach === "Visitante"}
              <td class="coach-team away-team">{away_team}/{away_team_state}</td
              >
            {:else}
              <td class="away-team">{away_team}/{away_team_state}</td>
            {/if}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <p>*Equipe comandada pelo treinador em negrito</p>
</section>

<style>
  #matches {
    display: block;
  }

  #table {
    overflow-x: auto;
    text-align: center;
  }

  #matches-table {
    background-color: var(--table-background);
    font-family: var(--main-font);
    font-size: clamp(0.75rem, 2vw, 1.25rem);
    color: var(--main-color);
    border-radius: 5px;
    width: 100%;
    white-space: nowrap;
  }

  .headers {
    text-transform: uppercase;
  }

  .coach-team {
    font-weight: var(--bold);
  }
</style>
