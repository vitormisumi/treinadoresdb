<script>
  import { createSearchStore, searchHandler } from "$lib/stores/search";
  import { onDestroy } from "svelte";

  export let data;
  const searchCoaches = data.coach.map((field) => ({
    ...field,
    searchFields: `${field.name} ${field.nickname}`,
  }));
  const searchStore = createSearchStore(searchCoaches);
  const unsubscribe = searchStore.subscribe((model) => searchHandler(model));
  onDestroy(unsubscribe);
</script>

<h2 class="title">H2H</h2>
<div id="search">
  <form id="search-bar">
    <input
      bind:value={$searchStore.search}
      type="search"
      placeholder="Busque um treinador"
      id="search-text"
    />
    <i class="fa fa-search" />
  </form>
  <table id="search-results">
    <tbody>
      {#if $searchStore.search !== ""}
        {#each $searchStore.filtered as coach, i}
          {#if i < 10}
            <tr>
              {#if coach.nickname === null}
                <td
                  ><a href="/h2h/{coach.coach_id}x" class="coach-result"
                    >{coach.name}</a
                  ></td
                >
              {:else}
                <td
                  ><a href="/h2h/{coach.coach_id}x" class="coach-result"
                    >{coach.nickname}</a
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
  <form id="search-bar">
    <input
      bind:value={$searchStore.search}
      type="search"
      placeholder="Busque um treinador"
      id="search-text"
    />
    <i class="fa fa-search" />
  </form>
  <table id="search-results">
    <tbody>
      {#if $searchStore.search !== ""}
        {#each $searchStore.filtered as coach, i}
          {#if i < 10}
            <tr>
              {#if coach.nickname === null}
                <td
                  ><a href="/h2h/{coach.coach_id}" class="coach-result"
                    >{coach.name}</a
                  ></td
                >
              {:else}
                <td
                  ><a href="/perfil/{coach.coach_id}" class="coach-result"
                    >{coach.nickname}</a
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
<slot />

<style>
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
