<script>
  let matches = [
    {
      date: "30/03/2023",
      competition: "Brasileiro Série A",
      home_team: "Palmeiras",
      away_team: "Internacional",
      home_score: 2,
      away_score: 1,
      home_coach: "Abel Ferreira",
      away_coach: "Mano Menezes",
    },
    {
      date: "31/03/2023",
      competition: "Brasileiro Série B",
      home_team: "Palmeiras",
      away_team: "Internacional",
      home_score: 4,
      away_score: 5,
      home_coach: "Abel Ferreira",
      away_coach: "Mano Menezes",
    },
  ];
</script>

<section id="matches">
  <h2 id="matches-title">Atualizado diariamente.</h2>
  <img src="/src/static/images/calendar.png" alt="calendário" id="calendar-icon" />
  <h3 class="last-added">Últimos jogos adicionados</h3>
  {#each matches as { date, competition, home_team, away_team, home_score, away_score, home_coach, away_coach }, i}
    <div class="game-card">
      <p class="date">{date}</p>
      <p class="competition">{competition}</p>
      <p class="home-coach coach">{home_coach}</p>
      <p class="away-coach coach">{away_coach}</p>
      <p class="home-score score">{home_score}</p>
      <p class="away-score score">{away_score}</p>
      <p class="x">X</p>
      <img
        src="/src/static/images/{home_team}.png"
        alt="{home_team}"
        class="home-team team"
      />
      <img
        src="/src/static/images/{away_team}.png"
        alt="{away_team}"
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
    text-align: center;
    align-items: middle;
    margin: 1vw 2vw;
    padding: 2vw;
    background-color: var(--main-color);
    border-radius: 5vw;
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
  }

  @media (min-width: 768px) {
    .game-card {
      margin: 1vw 10vw;
    }
  }
</style>
