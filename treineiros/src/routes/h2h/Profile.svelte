<section id="profile">
  
  <img src="src/static/images/mano.png" alt="" id="coach-team1" />
  <p id="coach-team-name1" class="coach-team">Mano Menezes</p>
  <p id="wins1" class="wins">2</p>
  <p>Graph goes here!</p>
  <p id="wins2" class="wins">3</p>
  <img src="src/static/images/abel.png" alt="" id="coach-team2" />
  <p id="coach-team-name2" class="coach-team">Abel Ferreira</p>
</section>

<style>
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
  }

  ::placeholder {
    color: var(--main-color);
    opacity: 0.7;
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
    font-family: var(--main-font);
    color: var(--main-color)
  }

  #coach-team-name1 {
    grid-area: coach-team-name1;
    margin: 0;
  }
  
  #coach-team-name2 {
    grid-area: coach-team-name2;
    text-align: right;
    margin: 0;
  }

  .coach-team {
    font-size: clamp(1rem, 4vw, 2rem);
    font-family: var(--main-font);
    color: var(--main-color)
  }
</style>
