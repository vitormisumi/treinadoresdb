<script>
  export let matchData;
  export let competition;
  export let teams;
  export let coaches;
</script>

<section id="match">
  <h2 id="title">Partida</h2>
  <a href="/perfil/{coaches.home_coach_id}" id="home-coach-img-link"
    ><img
      src="/src/lib/assets/images/coaches/{coaches.home_coach_id}.png"
      alt=""
      id="home-coach-img"
    /></a
  >
  <img id="home-team-logo" src="/src/lib/assets/images/teams/{teams.home_team_id}.png" alt="" />
  <a href="/perfil/{coaches.away_coach_id}" id="away-coach-img-link"
    ><img
      src="/src/lib/assets/images/coaches/{coaches.away_coach_id}.png"
      alt=""
      id="away-coach-img"
    /></a
  >
  <img id="away-team-logo" src="/src/lib/assets/images/teams/{teams.away_team_id}.png" alt="" />
  <div id="match-data">
    <p id="date">
      {("0" + matchData.date_time.getDate()).slice(-2)}/{(
        "0" +
        (matchData.date_time.getMonth() + 1)
      ).slice(-2)}/{matchData.date_time.getFullYear()}
    </p>
    <p id="competition">{competition.name}</p>
    <p id="stadium">{matchData.stadium}</p>
    <p id="score">{matchData.home_score} x {matchData.away_score}</p>
  </div>
  <p id="home-team" class="team">
    {teams.home_team_name}/{teams.home_team_state}
  </p>
  {#if coaches.home_coach_nickname === null}
    <a href="/perfil/{coaches.home_coach_id}" class="home-coach-name coach"
      >{coaches.home_coach}</a
    >
  {:else}
    <a href="/perfil/{coaches.home_coach_id}" class="home-coach-name coach"
      >{coaches.home_coach_nickname}</a
    >
  {/if}
  <p id="away-team" class="team">
    {teams.away_team_name}/{teams.away_team_state}
  </p>
  {#if coaches.away_coach_nickname === null}
    <a href="/perfil/{coaches.away_coach_id}" class="away-coach-name coach"
      >{coaches.away_coach}</a
    >
  {:else}
    <a href="/perfil/{coaches.away_coach_id}" class="away-coach-name coach"
      >{coaches.away_coach_nickname}</a
    >
  {/if}
  <table id="match-table">
    <thead>
      <tr>
        <th />
        <th id="header" class="col2">Dados Gerais</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="col1">{matchData.home_yellow_cards}</td>
        <td class="col2">Cartões Amarelos</td>
        <td class="col3">{matchData.away_yellow_cards}</td>
      </tr>
      <tr>
        <td class="col1">{matchData.home_red_cards}</td>
        <td class="col2">Cartões Vermelhos</td>
        <td class="col3">{matchData.away_red_cards}</td>
      </tr>
      <tr>
        <td class="col1">{matchData.home_subs}</td>
        <td class="col2">Substituições</td>
        <td class="col3">{matchData.away_subs}</td>
      </tr>
      <tr>
        <td class="col1"
          >{matchData.first_home_sub_minute}'{matchData.first_home_sub_half}</td
        >
        <td class="col2">Momento da 1ª Sub</td>
        <td class="col3"
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
    color: var(--main-color);
  }

  #date {
    margin: 0;
  }

  #competition {
    margin: 0;
  }

  #stadium {
    margin: 0;
  }

  #score {
    font-family: "Inter";
    font-weight: 700;
    font-size: clamp(2rem, 7vw, 4rem);
    margin: 10px 0 0 0;
  }

  #title {
    grid-area: title;
  }

  #home-coach-img-link {
    grid-area: home-coach-img;
  }

  #home-coach-img {
    width: 100%;
  }

  #match-data {
    grid-area: match-data;
    display: block;
    font-size: clamp(1rem, 2vw, 1.25rem);
  }

  #away-coach-img-link {
    grid-area: away-coach-img;
  }

  #away-coach-img {
    width: 100%;
  }

  #home-team {
    grid-area: home-team;
    text-align: left;
  }

  #home-team-logo {
    grid-area: home-coach-img;
    width: 25%;
    justify-self: end;
    align-self: end;
  }

  .home-coach-name {
    grid-area: home-coach-name;
    text-align: left;
  }

  #away-team {
    grid-area: away-team;
    text-align: right;
  }

  .away-coach-name {
    grid-area: away-coach-name;
    text-align: right;
  }

  #away-team-logo {
    grid-area: away-coach-img;
    width: 25%;
    align-self: end;
  }

  .team {
    margin: 0;
    font-size: clamp(1rem, 2vw, 1.25rem);
  }

  .coach {
    font-family: var(--main-font);
    color: var(--main-color);
    font-size: clamp(1rem, 2vw, 1.25rem);
    font-weight: var(--bold);
    margin: 0;
  }

  #match-table {
    grid-area: match-table;
    width: 100%;
    border-collapse: collapse;
    margin: 5vh 0;
    font-family: var(--main-font);
    font-size: clamp(1rem, 2vw, 1.5rem);
  }

  .col1 {
    text-align: left;
    width: 30%;
  }

  .col2 {
    text-align: center;
    width: 40%;
    background-color: var(--table-background);
  }

  .col3 {
    width: 30%;
    text-align: right;
  }

  #match-table tr:first-child th {
    border-radius: 1vw 1vw 0 0;
  }

  #match-table tr:last-child td {
    border-radius: 0 0 1vw 1vw;
    border: 0;
  }

  tr {
    height: clamp(30px, 5vh, 50px);
    border: 1px solid;
    border-color: var(--background-color) var(--background-color) #e5e5e525;
  }
</style>
