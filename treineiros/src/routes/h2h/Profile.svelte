<script>
  import fallback from "$lib/assets/images/default-coach.png";
  import { profileHistoryGroups } from "$lib/stores/filters";
  import Graph from "./Graph.svelte";

  export let coachInfo1;
  export let coachInfo2;
  export let h2h;

  const handleError = (ev) => (ev.target.src = fallback);
</script>

<section id="profile">
  <a href="/perfil/{coachInfo1.coach_id}?groups={$profileHistoryGroups}">
    <img
      src={`/coaches/${coachInfo1.coach_id}.png`}
      alt=""
      id="coach-img1"
      on:error={handleError}
    />
  </a>
  {#if coachInfo1.nickname === null}
    <a
      href="/perfil/{coachInfo1.coach_id}?groups={$profileHistoryGroups}"
      id="coach-name1"
      class="coach-name">{coachInfo1.name}</a
    >
  {:else}
    <a
      href="/perfil/{coachInfo1.coach_id}?groups={$profileHistoryGroups}"
      id="coach-name1"
      class="coach-name">{coachInfo1.nickname}</a
    >
  {/if}
  {#if h2h.coach1_wins === null}
    <p id="wins1" class="wins">0</p>
    <p id="wins2" class="wins">0</p>
  {:else}
    <p id="wins1" class="wins">{h2h.coach1_wins}</p>
      <Graph {h2h} {coachInfo1} {coachInfo2} />
    <p id="wins2" class="wins">{h2h.coach2_wins}</p>
  {/if}
  <a href="/perfil/{coachInfo2.coach_id}?groups={$profileHistoryGroups}">
    <img
      src={`/coaches/${coachInfo2.coach_id}.png`}
      alt=""
      id="coach-img2"
      on:error={handleError}
    />
  </a>
  {#if coachInfo2.nickname === null}
    <a
      href="/perfil/{coachInfo2.coach_id}?groups={$profileHistoryGroups}"
      id="coach-name2"
      class="coach-name main-color">{coachInfo2.name}</a
    >
  {:else}
    <a
      href="/perfil/{coachInfo2.coach_id}?groups={$profileHistoryGroups}"
      id="coach-name2"
      class="coach-name main-color">{coachInfo2.nickname}</a
    >
  {/if}
</section>

<style>
  #profile {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
    grid-template-rows: auto;
    grid-template-areas:
      "coach-img1 wins1 graph wins2 coach-img2"
      "coach-name1 none none none coach-name2";
    align-items: center;
    justify-items: center;
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
    margin: auto;
  }

  #coach-name1 {
    grid-area: coach-name1;
    margin: 0;
  }

  #coach-name2 {
    grid-area: coach-name2;
    margin: 0;
  }
  
  .coach-name {
    font-size: clamp(1rem, 4vw, 2rem);
    font-family: var(--main-font);
    text-align: center;
  }
</style>
