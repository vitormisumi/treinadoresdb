<script>
  import { shortDate } from "$lib/assets/functions";
  import { profileMatchFilters } from "/src/lib/stores/filters";

  export let matches;

  $: allSeasons = matches.map((row) => row.date_time.getFullYear());
  $: seasons = [...new Set(allSeasons)];

  $: allCompetitions = matches.map((row) => row.competition);
  $: competitions = [...new Set(allCompetitions)];

  $: allTeams = matches.map((row) => {
    if (row.coach === "Mandante") {
      return row.home_team + "/" + row.home_team_state;
    } else {
      return row.away_team + "/" + row.away_team_state;
    }
  });
  $: teams = [...new Set(allTeams)];

  $: filteredMatches = matches.filter((m) => {
    if (
      ($profileMatchFilters.team === "default" ||
        (m.coach === "Mandante" &&
          $profileMatchFilters.team === m.home_team + "/" + m.home_team_state) ||
        (m.coach === "Visitante" &&
          $profileMatchFilters.team ===
            m.away_team + "/" + m.away_team_state)) &&
      ($profileMatchFilters.season === "default" ||
        $profileMatchFilters.season === m.date_time.getFullYear()) &&
      ($profileMatchFilters.competition === "default" ||
        $profileMatchFilters.competition === m.competition)
    ) {
      return m;
    }
  });

  let page = 0;
  $: pages = Math.ceil(filteredMatches.length / 10);

  function updatePage(newPage) {
    page = newPage;
  }

  function firstPage() {
    page = 0;
  }

  function backPage() {
    if (page > 0) {
      page -= 1;
    }
  }

  function nextPage() {
    if (page < pages - 1) {
      page += 1;
    }
  }

  function lastPage() {
    page = pages - 1;
  }
</script>

<section id="matches">
  <h2>Partidas</h2>
  <div id="filters">
    <p class="label">Equipe:</p>
    <select
      name="team"
      id="team"
      bind:value={$profileMatchFilters.team}
      on:change={firstPage}
    >
      <option value="default" selected>Todas</option>
      {#each teams as team}
        <option value={team}>{team}</option>
      {/each}
    </select>
    <p class="label">Temporada:</p>
    <select
      name="team"
      id="team"
      bind:value={$profileMatchFilters.season}
      on:change={firstPage}
    >
      <option value="default" selected>Todas</option>
      {#each seasons as season}
        <option value={season}>{season}</option>
      {/each}
    </select>
    <p class="label">Competição:</p>
    <select
      name="team"
      id="team"
      bind:value={$profileMatchFilters.competition}
      on:change={firstPage}
    >
      <option value="default" selected>Todas</option>
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
          <th class="headers">Mandante</th>
          <th class="headers">Placar</th>
          <th class="headers">Visitante</th>
        </tr>
      </thead>
      <tbody>
        {#each filteredMatches as { match_id, date_time, stadium, competition, home_team, home_team_state, home_score, away_score, away_team, away_team_state, coach }, i}
          {#if i >= page * 10 && i <= page * 10 + 9}
            <tr>
              <td class="date">{shortDate(date_time)}</td>
              <td>{stadium}</td>
              <td>{competition}</td>
              {#if coach === "Mandante"}
                <td class="coach-team home-team"
                  >{home_team}/{home_team_state}</td
                >
              {:else}
                <td class="home-team">{home_team}/{home_team_state}</td>
              {/if}
              {#if (coach === "Mandante" && home_score > away_score) || (coach === "Visitante" && away_score > home_score)}
                <td class="score"
                  ><a href="/partidas/{match_id}" class="win"
                    >{home_score}x{away_score}</a
                  ></td
                >
              {:else if home_score === away_score}
                <td class="score"
                  ><a href="/partidas/{match_id}" class="draw"
                    >{home_score}x{away_score}</a
                  ></td
                >
              {:else}
                <td class="score"
                  ><a href="/partidas/{match_id}" class="loss"
                    >{home_score}x{away_score}</a
                  ></td
                >
              {/if}
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
  <p class="asterisk main-color">*Equipe comandada pelo treinador em negrito</p>
  {#if pages > 1}
    <div id="pagination">
      <button class="main-color" on:click={firstPage}>&lt;&lt;&lt;</button>
      <button class="main-color" on:click={backPage}>&lt;</button>
      {#if page > 2}
        <p class="ellipsis">...</p>
      {/if}
      {#if page === 0}
        <p class="empty" />
        <p class="empty" />
        <p class="empty" />
      {:else if page === 1}
        <p class="empty" />
        <p class="empty" />
      {:else if page === 2}
        <p class="empty" />
      {/if}
      {#each { length: pages } as _, i}
        {#if i === page}
          <button class="main-color current" on:click={() => updatePage(i)}
            >{i + 1}</button
          >
        {:else if i < page + 3 && i > page - 3}
          <button class="main-color" on:click={() => updatePage(i)}>{i + 1}</button>
        {/if}
      {/each}
      {#if pages > page + 3}
        <p class="ellipsis">...</p>
      {/if}
      {#if pages - page === 1}
        <p class="empty" />
        <p class="empty" />
        <p class="empty" />
      {:else if pages - page === 2}
        <p class="empty" />
        <p class="empty" />
      {:else if pages - page === 3}
        <p class="empty" />
      {/if}
      <button class="main-color" on:click={nextPage}>&gt;</button>
      <button class="main-color" on:click={lastPage}>&gt;&gt;&gt;</button>
    </div>
  {/if}
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
    overflow: auto;
  }

  tr:nth-last-of-type(2n) {
		background-color: var(--table-background);
	}

  .coach-team {
    font-weight: var(--bold);
  }

  .win {
    color: #1ade1a;
  }

  .draw {
    color: grey;
  }

  .loss {
    color: var(--accent-color);
  }

  #pagination {
    padding: 0;
    display: flex;
    gap: 5px;
    justify-content: right;
  }

  button {
    cursor: pointer;
    background-color: var(--table-background);
    font-family: var(--main-font);
    width: clamp(25px, 3vw, 40px);
    height: clamp(25px, 3vw, 40px);
    border: none;
    font-size: clamp(0.75rem, 1.5vw, 1rem);
  }

  .current {
    font-weight: var(--bold);
    color: var(--accent-color);
  }

  .ellipsis,
  .empty {
    width: clamp(25px, 3vw, 40px);
    height: clamp(25px, 3vw, 40px);
    text-align: center;
  }
</style>
