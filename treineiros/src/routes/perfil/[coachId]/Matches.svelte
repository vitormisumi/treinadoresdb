<script>
  import { filter } from "/src/lib/stores/matchFilter";

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

  $: filteredMatches = matches.filter((m) => {
    if (
      ($filter.team === "default" ||
        (m.coach === "Mandante" &&
          $filter.team === m.home_team + "/" + m.home_team_state) ||
        (m.coach === "Visitante" &&
          $filter.team === m.away_team + "/" + m.away_team_state)) &&
      ($filter.season === "default" ||
        $filter.season === m.date_time.getFullYear()) &&
      ($filter.competition === "default" ||
        $filter.competition === m.competition)
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
    <h4>Equipe:</h4>
    <select
      name="team"
      id="team"
      bind:value={$filter.team}
      on:change={firstPage}
    >
      <option value="default" selected>Todas</option>
      {#each teams as team}
        <option value={team}>{team}</option>
      {/each}
    </select>
    <h4>Temporada:</h4>
    <select
      name="team"
      id="team"
      bind:value={$filter.season}
      on:change={firstPage}
    >
      <option value="default" selected>Todas</option>
      {#each seasons as season}
        <option value={season}>{season}</option>
      {/each}
    </select>
    <h4>Competição:</h4>
    <select
      name="team"
      id="team"
      bind:value={$filter.competition}
      on:change={firstPage}
    >
      <option value="default" selected>Todas</option>
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
        {#each filteredMatches as { match_id, date_time, stadium, competition, home_team, home_team_state, home_score, away_score, away_team, away_team_state, coach }, i}
          {#if i >= page * 10 && i <= page * 10 + 9}
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
  <p>*Equipe comandada pelo treinador em negrito</p>
  {#if pages > 1}
    <div id="pagination">
      <button id="first-page" on:click={firstPage}>&lt;&lt;&lt;</button>
      <button id="back-page" on:click={backPage}>&lt;</button>
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
          <button class="page current" on:click={() => updatePage(i)}
            >{i + 1}</button
          >
        {:else if i < page + 3 && i > page - 3}
          <button class="page" on:click={() => updatePage(i)}>{i + 1}</button>
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
      <button id="next-page" on:click={nextPage}>&gt;</button>
      <button id="last-page" on:click={lastPage}>&gt;&gt;&gt;</button>
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

  .win {
    color: #1ade1a;
  }

  .draw {
    color: grey;
  }

  .loss {
    color: var(--accent-color);
  }

  h4,
  p {
    font-family: var(--main-font);
    color: var(--main-color);
    font-size: clamp(0.75rem, 1.5vw, 1rem);
  }

  h4 {
    margin: 0;
  }

  a {
    color: var(--main-color);
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
    color: var(--main-color);
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
