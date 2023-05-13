<script>
  import { createSearchStoreH2h, searchHandler, coach1, coach2 } from "$lib/stores/h2hCoaches";
  import { onDestroy } from "svelte";

  export let coach;

  export let coaches;
  const searchCoaches = coaches.map((field) => ({
    ...field,
    searchFields: `${field.name} ${field.nickname}`,
  }));
  const searchStore = createSearchStoreH2h(searchCoaches);
  const unsubscribe = searchStore.subscribe((model) => searchHandler(model));
  onDestroy(unsubscribe);

  function updateCoaches(coach_id1, coach_id2) {
    coach1.set(coach_id1);
    coach2.set(coach_id2);
  }
</script>

<section id="h2h">
  <h2>H2H</h2>
  <div id="main">
    {#if coach.nickname !== null}
      <p class="coach-name main-color">{coach.nickname} vs</p>
    {:else}
      <p class="coach-name main-color">{coach.name} vs</p>
    {/if}
    <div id="search">
      <form id="search-bar">
        <input
          type="search"
          placeholder="Busque um treinador"
          class="search-text main-color"
          bind:value={$searchStore.search}
        />
        <i class="fa fa-search search-button main-color" />
      </form>
      <table id="search-results">
        <tbody>
          {#if $searchStore.search !== ""}
            {#each $searchStore.filtered as h2hcoach, i}
              {#if i < 10}
                <tr>
                  {#if h2hcoach.nickname !== null}
                    <td
                      ><a
                        href="/h2h?coach1={coach.coach_id}&coach2={h2hcoach.coach_id}"
                        class="coach-result main-color" 
                        on:click={updateCoaches(coach.coach_id, h2hcoach.coach_id)}>{h2hcoach.nickname}</a
                      ></td
                    >
                  {:else}
                    <td
                      ><a
                        href="/h2h?coach1={coach.coach_id}&coach2={h2hcoach.coach_id}"
                        class="coach-result main-color"
                        on:click={updateCoaches(coach.coach_id, h2hcoach.coach_id)}>{h2hcoach.name}</a
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
  </div>
</section>

<style>
  #main {
    display: flex;
    justify-content: center;
  }

  .coach-name {
    align-self: center;
    font-family: var(--main-font);
    font-size: clamp(1rem, 5vw, 1.5rem);
    margin: 0;
    padding-right: 10px;
  }

  #search-bar {
    display: grid;
    align-self: center;
    grid-template-columns: 85% 15%;
    background-color: var(--background-color);
    border: 2px solid var(--main-color);
    border-radius: 2rem;
    z-index: 100;
    width: max(100%, 100px);
    height: clamp(30px, 7vh, 40px);
  }

  .search-text {
    font-family: var(--main-font);
    padding-left: clamp(10px, 2vw, 20px);
    font-size: clamp(0.75rem, 1vw, 1.5rem);
    background-color: transparent;
    border: none;
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
    font-size: clamp(1rem, 2vw, 1.5rem);
  }

  #search-results {
    position: absolute;
    table-layout: fixed;
    width: clamp(100px, 20vw, 400px);
    background-color: #393b43;
    border-collapse: collapse;
    font-family: var(--main-font);
    font-size: clamp(1rem, 2vw, 1.25rem);
    border-radius: 1vw;
    z-index: 1000;
  }

  #search-results tr:last-child td {
    border: 0;
  }

  td {
    border: 1px solid;
    border-color: transparent transparent var(--background-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .coach-result {
    cursor: pointer;
    background-color: transparent;
    border-color: transparent;
    font-family: var(--main-font);
  }

  .coach-result:hover {
    color: var(--accent-color);
  }
</style>
