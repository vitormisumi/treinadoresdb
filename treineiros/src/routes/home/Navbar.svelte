<script>
  let menu = true;

  function toggle() {
    menu = !menu;
  }

  let menu_items = ["home", "sobre", "h2h", "rankings"];
</script>

<header>
  <p id="logo">TREINEIROS.COM</p>
  <button on:click={toggle} id="menu-button" aria-controls="menu"
    ><span class="visually-hidden">Menu</span>
    <i class={menu ? "fa-solid fa-bars" : "fa-solid fa-xmark"} />
  </button>
  <nav class:menu id="menu">
    <ul>
      {#each menu_items as item}
          <li class="menu-item"><a href="/{item}">{item}</a></li>
      {/each}
    </ul>
    <form id="search-bar">
      <input type="search" placeholder="Busque um treinador" id="search-text" />
      <button type="submit" id="search-button"
        ><i class="fa fa-search" /></button
      >
    </form>
  </nav>
</header>

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
    padding: 0;
    width: 100%;
    background-color: rgba(229, 229, 229, 0.95);
    z-index: 99999;
  }

  .menu {
    display: none;
  }

  ul {
    list-style: none;
    margin: 3vw;
    padding: 0;
  }

  .menu-item {
    padding: clamp(10px, 2vw, 20px);
    font-family: "Roboto Condensed";
    font-size: clamp(1.5rem, 5vw, 2.5rem);
    text-transform: uppercase;
  }

  a {
    color: var(--background-color);
  }

  a:hover {
    color: var(--accent-color);
  }

  #search-bar {
    display: grid;
    align-self: center;
    grid-template-columns: 85% 15%;
    margin: 3vw;
    background-color: var(--accent-color);
    border-radius: 2rem;
    z-index: 100;
    width: max(50%, 200px);
    height: clamp(30px, 7vh, 40px);
  }

  #search-text {
    font-family: "Roboto Condensed";
    padding-left: clamp(10px, 2vw, 20px);
    font-size: clamp(1rem, 1vw, 1.5rem);
    background-color: transparent;
    border: none;
  }

  #search-button {
    cursor: pointer;
    border: none;
    padding: 0 2vw 0 0;
    background-color: transparent;
    color: var(--background-color);
    font-size: clamp(1rem, 2vw, 1.5rem);
  }

  ::placeholder {
    color: var(--main-color);
    opacity: 0.7;
  }

  .fa-solid {
    color: var(--background-color);
    font-size: 2rem;
    z-index: 2;
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
      padding: auto;
      margin: auto;
      font-size: clamp(1rem, 2vw, 2rem);
    }

    #search-bar {
      margin: 0;
      width: clamp(200px, 4vw, 300px);
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
