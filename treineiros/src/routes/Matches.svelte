<script>
  export let matches;

  import calendar from '$lib/assets/images/calendar.png';
</script>

<section id="matches">
  <h2 id="matches-title">Atualizado diariamente.</h2>
  <img
    src={calendar}
    alt="calendário"
    id="calendar-icon"
  />
  <h3 class="last-added">Últimos jogos adicionados</h3>
  {#each matches as { match_id, date_time, competition, home_team_id, home_team_name, away_team_id, away_team_name, home_score, away_score, home_coach, home_coach_nickname, away_coach, away_coach_nickname }, i}
    <div class="game-card">
      <p class="date">
        {("0" + date_time.getDate()).slice(-2)}/{(
          "0" +
          (date_time.getMonth() + 1)
        ).slice(-2)}/{date_time.getFullYear()}
      </p>
      <p class="competition">{competition}</p>
      {#if home_coach_nickname === null}
        <p class="home-coach coach">{home_coach}</p>
      {:else}
        <p class="home-coach coach">{home_coach_nickname}</p>
      {/if}
      {#if away_coach_nickname === null}
        <p class="away-coach coach">{away_coach}</p>
      {:else}
        <p class="away-coach coach">{away_coach_nickname}</p>
      {/if}
      <p class="home-score score">{home_score}</p>
      <p class="away-score score">{away_score}</p>
      <a href="/partidas/{match_id}" class="x">X<span class="match-link" /></a>
      <img
        src="/src/lib/assets/images/teams/{home_team_id}.png"
        alt={home_team_name}
        class="home-team team"
      />
      <img
        src="/src/lib/assets/images/teams/{away_team_id}.png"
        alt={away_team_name}
        class="away-team team"
      />
    </div>
  {/each}
</section>

<style>
  #matches {
    padding: 10vw;
    text-align: center;
    background-color: #ffffff;
    padding: var(--section-margin);
    margin: 0;
  }

  #matches-title {
    color: var(--background-color);
  }

  #calendar-icon {
    width: 5vw;
  }

  .last-added {
    font-style: normal;
    font-weight: var(--bold);
    font-size: clamp(0.75rem, 2vw, 3rem);
    font-family: var(--main-font);
    text-transform: uppercase;
    text-align: center;
    margin-top: auto;
    margin-bottom: 1vw;
  }

  .game-card {
    display: grid;
    position: relative;
    text-align: center;
    align-items: middle;
    margin: 1vw 2vw;
    padding: 2vw;
    background-color: var(--main-color);
    border-radius: 5vw;
    grid-template-columns: 5fr 1fr 1fr 1fr 5fr;
    grid-template-areas:
      "date date date date date"
      "competition competition competition competition competition"
      "home-team home-score x away-score away-team"
      "home-coach home-score x away-score away-coach";
  }

  .game-card:hover {
    background-color: #d4d4d4;
  }

  .date {
    margin: auto;
    grid-area: date;
    font-size: clamp(0.75rem, 2vw, 1.5rem);
  }

  .competition {
    margin: auto;
    grid-area: competition;
    font-size: clamp(0.75rem, 2vw, 1.5rem);
  }

  .coach {
    margin: auto;
    font-size: clamp(0.75rem, 2vw, 1.5rem);
    font-weight: var(--bold);
  }

  .home-coach {
    grid-area: home-coach;
  }

  .away-coach {
    grid-area: away-coach;
  }

  .team {
    height: 4vw;
    margin: auto;
  }

  .home-team {
    grid-area: home-team;
  }

  .away-team {
    grid-area: away-team;
  }

  .score {
    margin: auto;
    font-size: clamp(1.5rem, 5vw, 10rem);
  }

  .home-score {
    grid-area: home-score;
  }

  .away-score {
    grid-area: away-score;
  }

  .x {
    grid-area: x;
    margin: auto;
    font-size: clamp(1rem, 2vw, 1.5rem);
    font-family: var(--main-font);
    color: var(--background-color);
  }

  .match-link {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  }

  @media (min-width: 768px) {
    .game-card {
      margin: 1vw 10vw;
    }
  }
</style>
