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
    $searchStore1.search = "";
  }

  function updateCoach2(id) {
    coach2.set(id);
    goto(`?coach1=${$coach1}&coach2=${id}`, {
      noScroll: true,
    });
    $searchStore2.search = "";
  }
</script>

<section id="search">
  <h2 id="title">H2H</h2>
  <div id="search1" class="search">
    <form id="search-bar1" class="search-bar">
      <input
        type="search"
        placeholder="Busque um treinador"
        class="search-text"
        bind:value={$searchStore1.search}
      />
      <i class="fa fa-search search-button" />
    </form>
    <table id="search-results1" class="search-results">
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
  <div id="search2" class="search">
    <form id="search-bar2" class="search-bar">
      <input
        bind:value={$searchStore2.search}
        type="search"
        placeholder="Busque um treinador"
        class="search-text"
      />
      <i class="fa fa-search search-button" />
    </form>
    <table id="search-results2" class="search-results">
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
    grid-template-columns: 2fr 1fr 2fr;
    grid-template-rows: auto;
  }

  #title {
    grid-column: 1 / 4;
    grid-row: 1 / 2;
  }

  #search1 {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }

  #search2 {
    grid-column: 3 / 4;
    grid-row: 2 / 3;
  }

  .search-bar {
    display: grid;
    align-self: center;
    grid-template-columns: 85% 15%;
    background-color: var(--background-color);
    border: 2px solid var(--main-color);
    border-radius: 2rem;
    z-index: 100;
    width: clamp(120px, 42.5vw, 400px);
    height: clamp(30px, 7vh, 40px);
  }

  #search2 {
    justify-self: end;
  }

  .search-text {
    font-family: var(--main-font);
    padding-left: clamp(10px, 2vw, 20px);
    font-size: clamp(0.75rem, 2vw, 1.5rem);
    background-color: transparent;
    border: none;
    color: var(--main-color);
  }

  ::placeholder {
    color: var(--main-color);
    opacity: 0.7;
  }

  input:focus {
    outline: none;
  }

  .search-button {
    align-self: center;
    justify-self: center;
    cursor: pointer;
    border: none;
    padding: 0 2vw 0 0;
    background-color: transparent;
    color: var(--main-color);
    font-size: clamp(1rem, 2vw, 1.5rem);
  }

  .search-results {
    position: absolute;
    table-layout: fixed;
    width: clamp(120px, 42.5vw, 400px);
    background-color: #393b43;
    border-collapse: collapse;
    font-family: var(--main-font);
    border-radius: 1vw;
    z-index: 1000;
  }
  
  .search-results tr:last-child td {
    border: 0;
  }
  
  #search-results1 {
    grid-area: results1;
  }
  
  #search-results2 {
    grid-area: results2;
  }
  
  td {
    border: 1px solid;
    border-color: transparent transparent var(--background-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .coach-result {
    font-size: clamp(1rem, 1.25vw, 1.5rem);
    cursor: pointer;
    background-color: transparent;
    border-color: transparent;
    color: var(--main-color);
    font-family: var(--main-font);
  }

  .coach-result:hover {
    color: var(--accent-color);
  }
</style>
