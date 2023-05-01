<script>
  import {
    createSearchStore1,
    createSearchStore2,
    searchHandler,
    coach1,
    coach2,
  } from "$lib/stores/h2hCoaches";
  import { goto } from "$app/navigation";
  import { onDestroy } from "svelte";

  export let coaches;
  const searchCoaches = coaches.map((field) => ({
    ...field,
    searchFields: `${field.name} ${field.nickname}`,
  }));
  const searchStore1 = createSearchStore1(searchCoaches);
  const unsubscribe1 = searchStore1.subscribe((model) => searchHandler(model));
  const searchStore2 = createSearchStore2(searchCoaches);
  const unsubscribe2 = searchStore2.subscribe((model) => searchHandler(model));
  onDestroy(unsubscribe1);
  onDestroy(unsubscribe2);

  function updateCoach1(id) {
    coach1.set(id);
    goto(`?coach1=${id}&coach2=${$coach2}`, {
      noScroll: true,
    });
  }

  function updateCoach2(id) {
    coach2.set(id);
    goto(`?coach1=${$coach1}&coach2=${id}`, {
      noScroll: true,
    });
  }
</script>

<section id="search">
  <h2 class="title">H2H</h2>
  <div id="search">
    <form id="search-bar1" class="search-bar">
      <input
        bind:value={$searchStore1.search}
        type="search"
        placeholder="Busque um treinador"
        class="search-text"
      />
      <i class="fa fa-search search-button" />
    </form>
    <table id="search-results">
      <tbody>
        {#if $searchStore1.search !== ""}
          {#each $searchStore1.filtered as coach, i}
            {#if i < 10}
              <tr>
                {#if coach.nickname === null}
                  <td
                    ><button
                      class="coach-result"
                      on:click={updateCoach1(coach.coach_id)}
                      >{coach.name}</button
                    ></td
                  >
                {:else}
                  <td
                    ><button
                      class="coach-result"
                      on:click={updateCoach1(coach.coach_id)}
                      >{coach.nickname}</button
                    ></td
                  >
                {/if}
              </tr>
            {/if}
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
  <div id="search">
    <form id="search-bar2" class="search-bar">
      <input
        bind:value={$searchStore2.search}
        type="search"
        placeholder="Busque um treinador"
        class="search-text"
      />
      <i class="fa fa-search search-button" />
    </form>
    <table id="search-results">
      <tbody>
        {#if $searchStore2.search !== ""}
          {#each $searchStore2.filtered as coach, i}
            {#if i < 10}
              <tr>
                {#if coach.nickname === null}
                  <td
                    ><button
                      class="coach-result"
                      on:click={updateCoach2(coach.coach_id)}
                      >{coach.name}</button
                    ></td
                  >
                {:else}
                  <td
                    ><button
                      class="coach-result"
                      on:click={updateCoach2(coach.coach_id)}
                      >{coach.nickname}</button
                    ></td
                  >
                {/if}
              </tr>
            {/if}
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
</section>

<style>
  #search {
    display: grid;
    grid-template-areas:
      "title title title"
      "search1 none search1";
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
    width: max(100%, 100px);
    height: clamp(30px, 7vh, 40px);
  }

  .search-text {
    font-family: var(--main-font);
    padding-left: clamp(10px, 2vw, 20px);
    font-size: clamp(1rem, 1vw, 1.5rem);
    background-color: transparent;
    border: none;
  }

  .search-button {
    cursor: pointer;
    border: none;
    padding: 0 2vw 0 0;
    background-color: transparent;
    color: var(--background-color);
    font-size: clamp(1rem, 2vw, 1.5rem);
  }
</style>
