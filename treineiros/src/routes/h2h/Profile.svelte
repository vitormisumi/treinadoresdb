<section id="profile">
  <h2 class="title">H2H</h2>
  <form id="search-bar1" class="search-bar">
    <input
      type="search"
      placeholder="Busque um treinador ou equipe"
      class="search-text"
    />
    <button type="submit" class="search-button"><i class="fa fa-search" /></button>
  </form>
  <form id="search-bar2" class="search-bar">
    <input
      type="search"
      placeholder="Busque um treinador ou equipe"
      class="search-text"
    />
    <button type="submit" class="search-button"><i class="fa fa-search" /></button>
  </form>
  <img src="src/static/images/mano.png" alt="" id="coach-team1" />
  <p id="coach-team-name1" class="roboto-condensed coach-team">Mano Menezes</p>
  <p id="wins1" class="roboto-condensed wins">2</p>
  <p class="roboto-condensed">Graph goes here!</p>
  <p id="wins2" class="roboto-condensed wins">3</p>
  <img src="src/static/images/abel.png" alt="" id="coach-team2" />
  <p id="coach-team-name2" class="roboto-condensed coach-team">Abel Ferreira</p>
</section>

<style>
  .roboto-condensed {
    font-family: "Roboto Condensed";
    color: var(--main-color);
  }

  #profile {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      "search1 search1 title search2 search2"
      "coach-team1 wins1 graph wins2 coach-team2"
      "coach-team-name1 none none none coach-team-name2";
    align-items: center;
    justify-items: center;
    margin: min(5vw, 50px);
  }

  .title {
    grid-area: title;
  }

  #search-bar1 {
    grid-area: search1;
  }

  #search-bar2 {
    grid-area: search2;
  }

  .search-bar {
    display: grid;
    align-self: center;
    grid-template-columns: 85% 15%;
    margin: 3vw;
    background-color: var(--accent-color);
    border-radius: 2rem;
    z-index: 100;
    width: max(40%, 100px);
    height: clamp(30px, 7vh, 40px);
  }

  .search-text {
    font-family: "Roboto Condensed";
    padding-left: clamp(10px, 2vw, 20px);
    font-size: clamp(1rem, 1vw, 1.5rem);
    background-color: transparent;
    border: none;
  }

  ::placeholder {
    color: var(--main-color);
    opacity: 0.7;
  }

  .search-button {
    cursor: pointer;
    border: none;
    padding: 0 2vw 0 0;
    background-color: transparent;
    color: var(--background-color);
    font-size: clamp(1rem, 2vw, 1.5rem);
  }

  #coach-team1 {
    grid-area: coach-team1;
    width: 100%;
  }

  #coach-team2 {
    grid-area: coach-team2;
    width: 100%;
  }

  #wins1 {
    grid-area: wins1;
  }

  #wins2 {
    grid-area: wins2;
  }

  .wins {
    font-size: clamp(2rem, 5vw, 5rem);
  }

  #coach-team-name1 {
    grid-area: coach-team-name1;
  }

  #coach-team-name2 {
    grid-area: coach-team-name2;
    text-align: right;
  }

  .coach-team {
    font-size: clamp(1rem, 4vw, 2rem);
  }
</style>
