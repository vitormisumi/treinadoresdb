<script>
  import fallback from "$lib/assets/images/coaches/default.png";
  export let coachInfo1;
  export let coachInfo2;
  export let h2h;

  const handleError = (ev) => (ev.target.src = fallback);
</script>

<section id="profile">
  <a href="/perfil/{coachInfo1.coach_id}">
    <img
      src="/src/lib/assets/images/coaches/{coachInfo1.coach_id}.png"
      alt=""
      id="coach-img1"
      on:error={handleError}
      />
    </a>
    {#if coachInfo1.nickname === null}
    <a
    href="/perfil/{coachInfo1.coach_id}"
    id="coach-team-name1"
    class="coach-team">{coachInfo1.name}</a
    >
    {:else}
    <a
    href="/perfil/{coachInfo1.coach_id}"
    id="coach-team-name1"
    class="coach-team">{coachInfo1.nickname}</a
    >
    {/if}
    {#if h2h.coach1_wins === null}
    <p id="wins1" class="wins">0</p>
    <p id="wins2" class="wins">0</p>
    {:else}
    <p id="wins1" class="wins">{h2h.coach1_wins}</p>
    <p>Graph goes here!</p>
    <p id="wins2" class="wins">{h2h.coach2_wins}</p>
    {/if}
    <a href="/perfil/{coachInfo2.coach_id}">
      <img
      src="/src/lib/assets/images/coaches/{coachInfo2.coach_id}.png"
      alt=""
      id="coach-img2"
      on:error={handleError}
    />
  </a>
  {#if coachInfo2.nickname === null}
    <a
      href="/perfil/{coachInfo2.coach_id}"
      id="coach-team-name2"
      class="coach-team">{coachInfo2.name}</a
    >
  {:else}
    <a
      href="/perfil/{coachInfo2.coach_id}"
      id="coach-team-name2"
      class="coach-team">{coachInfo2.nickname}</a
    >
  {/if}
</section>

<style>
  #profile {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      "coach-img1 wins1 graph wins2 coach-img2"
      "coach-team-name1 none none none coach-team-name2";
    align-items: center;
    justify-items: center;
  }

  ::placeholder {
    color: var(--main-color);
    opacity: 0.7;
  }

  #coach-img1 {
    grid-area: coach-img1;
    width: 100%;
  }

  #coach-img2 {
    grid-area: coach-img2;
    width: 100%;
  }

  #wins1 {
    grid-area: wins1;
  }

  #wins2 {
    grid-area: wins2;
  }

  .wins {
    font-size: clamp(3rem, 7vw, 5rem);
    font-family: var(--main-font);
    color: var(--accent-color);
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
    color: var(--main-color);
  }
</style>
