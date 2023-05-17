<script>
  import { shortDate } from "$lib/assets/functions";
  import { profileHistoryGroups } from "$lib/stores/filters";
  import teamFallback from "$lib/assets/images/default-team.png";
  import coachFallback from "$lib/assets/images/default-coach.png";

  export let matchData;
  export let competition;
  export let teams;
  export let coaches;

  const handleTeamError = (ev) => (ev.target.src = teamFallback);
  const handleCoachError = (ev) => (ev.target.src = coachFallback);
</script>

<section id="match">
  <h2 class="title">Partida</h2>
  <a
    href="/perfil/{coaches.home_coach_id}?groups={$profileHistoryGroups}"
    class="home-coach-img-link"
    ><img
      src={`/coaches/${coaches.home_coach_id}.png`}
      alt=""
      class="home-coach image"
      on:error={handleCoachError}
    /></a
  >
  <img
    class="home-team-logo logo"
    src={`/teams/${teams.home_team_id}.png`}
    alt={teams.home_team_name}
    on:error={handleTeamError}
  />
  <a
    href="/perfil/{coaches.away_coach_id}?groups={$profileHistoryGroups}"
    class="away-coach-img-link"
    ><img
      src={`/coaches/${coaches.away_coach_id}.png`}
      alt=""
      class="away-coach image"
      on:error={handleCoachError}
    /></a
  >
  <img
    class="away-team-logo logo"
    src={`/teams/${teams.away_team_id}.png`}
    alt={teams.away_team_name}
    on:error={handleTeamError}
  />
  <div class="match-data">
    <p class="date">
      {shortDate(matchData.date_time)}
    </p>
    <p class="competition">{competition.name}</p>
    <p class="stadium">{matchData.stadium}</p>
    <p class="score">{matchData.home_score} x {matchData.away_score}</p>
  </div>
  <p class="home-team team left">
    {teams.home_team_name}/{teams.home_team_state}
  </p>
  {#if coaches.home_coach_nickname === null}
    <a
      href="/perfil/{coaches.home_coach_id}?groups={$profileHistoryGroups}"
      class="home-coach coach left">{coaches.home_coach}</a
    >
  {:else}
    <a
      href="/perfil/{coaches.home_coach_id}?groups={$profileHistoryGroups}"
      class="home-coach coach left">{coaches.home_coach_nickname}</a
    >
  {/if}
  <p class="away-team team right">
    {teams.away_team_name}/{teams.away_team_state}
  </p>
  {#if coaches.away_coach_nickname === null}
    <a href="/perfil/{coaches.away_coach_id}" class="away-coach coach right"
      >{coaches.away_coach}</a
    >
  {:else}
    <a href="/perfil/{coaches.away_coach_id}" class="away-coach coach right"
      >{coaches.away_coach_nickname}</a
    >
  {/if}
  <table class="match table">
    <colgroup>
      <col class="col1" />
      <col class="col2" />
      <col class="col3" />
    </colgroup>
    <thead>
      <tr class="table-lines">
        <th />
        <th>Dados Gerais</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr class="table-lines">
        <td>{matchData.home_yellow_cards}</td>
        <td>Cartões Amarelos</td>
        <td>{matchData.away_yellow_cards}</td>
      </tr>
      <tr class="table-lines">
        <td>{matchData.home_red_cards}</td>
        <td>Cartões Vermelhos</td>
        <td>{matchData.away_red_cards}</td>
      </tr>
      <tr class="table-lines">
        <td>{matchData.home_subs}</td>
        <td>Substituições</td>
        <td>{matchData.away_subs}</td>
      </tr>
      <tr>
        <td
          >{matchData.first_home_sub_minute}'{matchData.first_home_sub_half}</td
        >
        <td>Momento da 1ª Sub</td>
        <td
          >{matchData.first_away_sub_minute}'{matchData.first_away_sub_half}</td
        >
      </tr>
    </tbody>
  </table>
</section>

<style>
  #match {
    display: grid;
    grid-template-columns: 1fr 2.5fr 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "title title title"
      "home-coach-img match-data away-coach-img"
      "home-team blank away-team"
      "home-coach-name blank away-coach-name"
      "match-table match-table match-table";
    text-align: center;
  }

  .title {
    grid-area: title;
  }

  .date,
  .competition,
  .stadium {
    margin: 0;
    font-size: clamp(0.5rem, 2vw, 1.5rem);
  }

  .score {
    font-family: "Inter";
    font-weight: 700;
    font-size: clamp(1.5rem, 7vw, 4rem);
    margin: 10px 0 0 0;
  }

  .home-coach-img-link {
    grid-area: home-coach-img;
  }

  .image {
    width: 100%;
  }

  .match-data {
    grid-area: match-data;
    display: block;
  }

  .away-coach-img-link {
    grid-area: away-coach-img;
  }

  .logo {
    width: 25%;
  }

  .home-team-logo {
    grid-area: home-coach-img;
    justify-self: end;
    align-self: end;
  }

  .away-team-logo {
    grid-area: away-coach-img;
    align-self: end;
  }

  .home-team {
    grid-area: home-team;
  }

  .away-team {
    grid-area: away-team;
  }

  .home-coach {
    grid-area: home-coach-name;
  }

  .away-coach {
    grid-area: away-coach-name;
  }

  .team,
  .coach {
    margin: 0;
    font-size: clamp(0.75rem, 2vw, 1.25rem);
  }

  .coach {
    font-weight: var(--bold);
  }

  .match {
    grid-area: match-table;
  }

  .col1 {
    width: 30%;
  }

  td:first-child {
    font-weight: var(--bold);
    text-align: left;
  }

  .col2 {
    width: 40%;
    background-color: var(--table-background);
  }

  .col3 {
    width: 30%;
  }

  td:last-child {
    font-weight: var(--bold);
    text-align: right;
  }

  .match tr:first-child th {
    border-radius: 1vw 1vw 0 0;
  }

  .match tr:last-child td {
    border-radius: 0 0 1vw 1vw;
  }
</style>
