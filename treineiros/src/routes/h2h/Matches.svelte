<script>
  import { shortDate } from "$lib/assets/functions";
  import { h2hMatchFilters } from "$lib/stores/filters";

  export let matches;

  $: allSeasons = matches.map((row) => row.date_time.getFullYear());
  $: seasons = [...new Set(allSeasons)];

  $: allCompetitions = matches.map((row) => row.competition);
  $: competitions = [...new Set(allCompetitions)];

  $: filteredMatches = matches.filter((m) => {
    if (
      ($h2hMatchFilters.season === "default" ||
        $h2hMatchFilters.season === m.date_time.getFullYear()) &&
      ($h2hMatchFilters.competition === "default" ||
        $h2hMatchFilters.competition === m.competition)
    ) {
      return m;
    }
  });
</script>

<section id="matches">
  <h2>Partidas</h2>
  <div id="filters">
    <label for="team">Filtrar por:</label>
    <select name="team" id="team" bind:value={$h2hMatchFilters.season}>
      <option value="default" selected>Temporada (todas)</option>
      {#each seasons as season}
        <option value={season}>{season}</option>
      {/each}
    </select>
    <select name="team" id="team" bind:value={$h2hMatchFilters.competition}>
      <option value="default" selected>Competição (todas)</option>
      {#each competitions as competition}
        <option value={competition}>{competition}</option>
      {/each}
    </select>
  </div>
  <div id="table">
    <table class="table">
      <thead>
        <tr>
          <th class="headers">Data</th>
          <th class="headers">Local</th>
          <th class="headers">Competição</th>
          <th class="headers">Treinador</th>
          <th class="headers">Mandante</th>
          <th class="headers">Placar</th>
          <th class="headers">Visitante</th>
          <th class="headers">Treinador</th>
        </tr>
      </thead>
      <tbody>
        {#each filteredMatches as { match_id, date_time, stadium, competition, home_team, home_team_state, home_coach_name, home_coach_nickname, home_score, away_score, away_coach_name, away_coach_nickname, away_team, away_team_state }, i}
          <tr>
            <td class="date">{shortDate(date_time)}</td>
            <td>{stadium}</td>
            <td>{competition}</td>
            {#if home_coach_nickname === null}
              <td>{home_coach_name}</td>
            {:else}
              <td>{home_coach_nickname}</td>
            {/if}
            <td>{home_team}/{home_team_state}</td>
            <td><a href="/partidas/{match_id}">{home_score}x{away_score}</a></td
            >
            <td>{away_team}/{away_team_state}</td>
            {#if away_coach_nickname === null}
              <td>{away_coach_name}</td>
            {:else}
              <td>{away_coach_nickname}</td>
            {/if}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>

<style>
  #filters {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    align-items: center;
    gap: 2%;
    padding: 0 0 1rem 0;
  }

  select {
    width: 200px;
  }

  #table {
    max-width: 100%;
    overflow-x: auto;
  }

  tr:nth-last-of-type(2n) {
    background-color: var(--table-background);
  }

  .headers {
    text-transform: uppercase;
    background-color: var(--main-color);
    color: var(--background-color);
  }
</style>
