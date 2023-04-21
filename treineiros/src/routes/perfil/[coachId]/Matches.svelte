<script>
  import { filter } from "/src/lib/stores/matchfilter";

  export let matches;

  let allSeasons = matches.map((row) => row.date_time.getFullYear());
  let seasons = [...new Set(allSeasons)];

  let allCompetitions = matches.map((row) => row.competition);
  let competitions = [...new Set(allCompetitions)];

  let allTeams = matches.map((row) => {
    if (row.coach === "Mandante") {
      return row.home_team + "/" + row.home_team_state;
    } else {
      return row.away_team + "/" + row.away_team_state;
    }
  });
  let teams = [...new Set(allTeams)];
</script>

<section id="matches">
  <h2>Partidas</h2>
  <div id="filters">
    <label for="team">Filtrar por:</label>
    <select name="team" id="team" bind:value={$filter.team}>
      <option value="default" selected>Equipe (todas)</option>
      {#each teams as team}
        <option value={team}>{team}</option>
      {/each}
    </select>
    <select name="team" id="team" bind:value={$filter.season}>
      <option value="default" selected>Temporada (todas)</option>
      {#each seasons as season}
        <option value={season}>{season}</option>
      {/each}
    </select>
    <select name="team" id="team" bind:value={$filter.competition}>
      <option value="default" selected>Competição (todas)</option>
      {#each competitions as competition}
        <option value={competition}>{competition}</option>
      {/each}
    </select>
  </div>
  <div id="table">
    <table id="matches-table">
      <thead>
        <tr>
          <th class="headers">Data</th>
          <th class="headers">Local</th>
          <th class="headers">Competição</th>
          <th class="headers">Mandante</th>
          <th class="headers">Placar</th>
          <th class="headers">Visitante</th>
        </tr>
      </thead>
      <tbody>
        {#each matches as { match_id, date_time, stadium, competition, home_team, home_team_state, home_score, away_score, away_team, away_team_state, coach }, i}
          {#if ($filter.team === "default" || ($filter.team === home_team + "/" + home_team_state && coach === "Mandante") || ($filter.team === away_team + "/" + away_team_state && coach === "Visitante")) && ($filter.season === "default" || $filter.season === date_time.getFullYear()) && ($filter.competition === "default" || $filter.competition === competition)}
            <tr>
              <td class="date"
                >{("0" + date_time.getDate()).slice(-2)}/{(
                  "0" +
                  (date_time.getMonth() + 1)
                ).slice(-2)}/{date_time.getFullYear()}</td
              >
              <td>{stadium}</td>
              <td>{competition}</td>
              {#if coach === "Mandante"}
                <td class="coach-team home-team"
                  >{home_team}/{home_team_state}</td
                >
              {:else}
                <td class="home-team">{home_team}/{home_team_state}</td>
              {/if}
              <td class="score"
                ><a href="/partidas/{match_id}">{home_score}x{away_score}</a
                ></td
              >
              {#if coach === "Visitante"}
                <td class="coach-team away-team"
                  >{away_team}/{away_team_state}</td
                >
              {:else}
                <td class="away-team">{away_team}/{away_team_state}</td>
              {/if}
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  </div>
  <p>*Equipe comandada pelo treinador em negrito</p>
</section>

<style>
  #filters {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 2%;
    padding: 0 0 2rem 0;
  }

  #matches {
    display: block;
  }

  #table {
    max-width: 100%;
    overflow-x: auto;
  }

  #matches-table {
    text-align: center;
    font-family: var(--main-font);
    font-size: clamp(0.75rem, 2vw, 1.25rem);
    color: var(--main-color);
    border-radius: 5px;
    width: 100%;
    white-space: nowrap;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 0.25rem;
  }

  tr:nth-last-of-type(2n) {
    background-color: var(--table-background);
  }

  .headers {
    text-transform: uppercase;
    background-color: var(--main-color);
    color: var(--background-color);
  }

  .coach-team {
    font-weight: var(--bold);
  }

  label,
  p {
    font-family: var(--main-font);
    color: var(--main-color);
    font-size: clamp(0.75rem, 1.5vw, 1rem);
  }

  a {
    color: var(--main-color);
  }
</style>
