<script>
  import { createSearchStore, searchHandler } from "$lib/stores/search";
  import { profileHistoryGroups } from "$lib/stores/filters.js";
  import { onDestroy } from "svelte";

  export let data;
  const searchCoaches = data.coaches.map((field) => ({
    ...field,
    searchFields: `${field.name} ${field.nickname}`,
  }));
  const searchStore = createSearchStore(searchCoaches);
  const unsubscribe = searchStore.subscribe((model) => searchHandler(model));
  onDestroy(unsubscribe);

  let menu = true;
  function toggle() {
    menu = !menu;
  }

  function closeMenu() {
    menu = true;
    $searchStore.search = "";
  }
</script>

<header>
  <p id="logo">TREINEIROS.COM</p>
  <button on:click={toggle} id="menu-button" aria-controls="menu"
    ><span class="visually-hidden">Menu</span>
    <i class={menu ? "fa-solid fa-bars" : "fa-solid fa-xmark"} />
  </button>
  <nav class:menu id="menu">
    <ul>
      <li class="menu-item">
        <a href="/" class="menu-link" on:click={closeMenu}>Home</a>
      </li>
      <li class="menu-item">
        <a href="/sobre" class="menu-link" on:click={closeMenu}>Sobre</a>
      </li>
      <li class="menu-item">
        <a href="/h2h" class="menu-link" on:click={closeMenu}>H2H</a>
      </li>
      <li class="menu-item">
        <a
          href="/rankings?competitions=a,b,c,d,cb&period=2014,2023&minmatches=50&value=total"
          class="menu-link"
          on:click={closeMenu}>Rankings</a
        >
      </li>
    </ul>
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
                      ><a
                        href="/perfil/{coach.coach_id}?groups={$profileHistoryGroups}"
                        class="coach-result"
                        on:click={closeMenu}>{coach.name}</a
                      ></td
                    >
                  {:else}
                    <td
                      ><a
                        href="/perfil/{coach.coach_id}?groups={$profileHistoryGroups}"
                        class="coach-result"
                        on:click={closeMenu}>{coach.nickname}</a
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
  </nav>
</header>

<slot />

<style>
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect (0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  header {
    display: flex;
    position: sticky;
    top: 0;
    flex-wrap: wrap;
    background-color: var(--main-color);
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: clamp(75px, 10vh, 125px);
    z-index: 10000;
  }

  #logo {
    padding-left: 2vw;
    text-align: left;
    margin: 0;
    font-family: "Russo One";
    font-size: clamp(1rem, 2.5vw, 2rem);
    color: var(--background-color);
    background-color: var(--main-color);
    z-index: 100000;
  }

  #menu-button {
    border: none;
    background-color: transparent;
    margin: 0 3vw;
    z-index: 100000;
  }

  nav {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: right;
    top: clamp(75px, 10vh, 125px);
    width: 100%;
    padding: 0;
    background-color: rgba(229, 229, 229, 0.95);
    z-index: 99999;
  }

  .menu {
    display: none;
  }

  ul {
    list-style: none;
    margin: 2vw;
    padding: 0;
  }

  .menu-link:link,
  .menu-link:visited {
    padding: clamp(5px, 2vw, 10px);
    font-family: "Roboto Condensed";
    font-size: clamp(1.25rem, 2.5vw, 2rem);
    text-transform: uppercase;
    color: var(--background-color);
  }

  .menu-link:hover {
    color: var(--accent-color);
  }

  #search-bar {
    display: grid;
    padding-left: clamp(10px, 3vw, 30px);
    align-self: center;
    justify-items: center;
    align-items: center;
    grid-template-columns: 80% 20%;
    margin: 2vw;
    background-color: var(--accent-color);
    border-radius: 2rem;
    z-index: 100;
    width: clamp(175px, 15vw, 300px);
    height: clamp(30px, 7vh, 40px);
  }

  #search-text {
    font-family: "Roboto Condensed";
    font-size: clamp(1rem, 2vw, 1.25rem);
    background-color: transparent;
    border: none;
  }

  ::placeholder {
    color: var(--main-color);
    opacity: 0.7;
  }

  input:focus {
    outline: none;
  }

  .fa-solid {
    padding: 0 2vw 0 0;
    color: var(--background-color);
    font-size: 2rem;
    z-index: 2;
  }

  #search-results {
    position: absolute;
    table-layout: fixed;
    width: clamp(175px, 15vw, 300px);
    border-collapse: collapse;
    text-align: left;
    font-family: var(--main-font);
    font-size: clamp(1rem, 2vw, 1.25rem);
    background-color: var(--table-background);
    border-radius: 1vw;
  }

  td {
    border: 1px solid;
    border-color: transparent transparent var(--background-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #search-results tr:last-child td {
    border: 0;
  }

  .coach-result {
    color: var(--main-color);
  }

  .coach-result:hover {
    color: var(--accent-color);
  }

  .fa-search {
    color: var(--background-color);
  }

  @media (min-width: 768px) {
    header {
      align-items: center;
    }

    #menu-button {
      display: none;
    }

    .menu {
      display: flex;
    }

    nav {
      position: relative;
      flex-direction: row;
      width: auto;
      height: auto;
      background-color: transparent;
      top: 0;
      padding: 0 2vw;
    }

    ul {
      margin: auto;
    }

    .menu-item {
      display: inline;
      padding: 0.65vw;
      margin: auto;
    }

    #search-bar {
      margin: 0;
    }

    #search-results {
      margin: 0;
    }
  }

  @media (max-height: 400px) {
    ul {
      display: flex;
      flex-direction: row;
      align-self: center;
    }
  }
</style>
