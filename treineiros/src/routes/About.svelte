<script>
  import h2hIcon from "$lib/assets/images/h2h-icon.png";
  import h2h from "$lib/assets/images/h2h.png";
  import rankingIcon from "$lib/assets/images/ranking-icon.png";
  import ranking from "$lib/assets/images/ranking.png";
  import historyIcon from "$lib/assets/images/history-icon.png";
  import history from "$lib/assets/images/history.png";

  let current = "h2h";

  let buttons = [
    {
      name: "h2h",
      alt: "confronto",
      span: "Compare os",
      b: "Confrontos",
      src: h2hIcon,
      image: h2h,
    },
    {
      name: "ranking",
      alt: "ranking",
      span: "Veja os",
      b: "Rankings",
      src: rankingIcon,
      image: ranking,
    },
    {
      name: "history",
      alt: "histórico",
      span: "Analise o",
      b: "Histórico",
      src: historyIcon,
      image: history,
    },
  ];
</script>

<section id="about">
  <h2 id="title">Tire suas próprias conclusões.</h2>
  {#each buttons as button}
    <button
      id={button.name}
      class="main-color"
      class:selected={current === button.name}
      on:click={() => (current = button.name)}
    >
      <img src={button.src} alt={button.alt} class="button-icon" />
      <span class="button-text">{button.span}</span><b>{button.b}</b>
    </button>
    {#if button.name === current}
      <img src={button.image} alt={current} id="img" />
    {/if}
  {/each}
</section>

<style>
  #about {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto max(40px, 10vh) auto;
    gap: 2.5vw;
    min-width: 200px;
  }

  #h2h {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }

  #ranking {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }

  #history {
    grid-column: 3 / 4;
    grid-row: 2 / 3;
  }

  #img {
    grid-column: 1 / 4;
    grid-row: 3 / 4;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 10px -5px var(--main-color);
    object-fit: scale-down;
    border-radius: 2vw;
  }

  button {
    cursor: pointer;
    background-color: var(--background-color);
    display: grid;
    grid-template-rows: 55% 45%;
    border: 0.3vw solid var(--main-color);
    border-radius: 2vw;
    justify-items: center;
    font-family: var(--main-font);
    font-weight: 400;
    font-size: clamp(0.5rem, 3.5vw, 2.25rem);
    margin: 0;
  }

  b {
    text-transform: uppercase;
  }

  .selected {
    background-color: var(--main-color);
    color: var(--background-color);
  }

  .button-text {
    display: none;
  }

  .button-icon {
    height: max(50%, 20px);
    align-self: center;
  }

  @media (min-width: 768px) {
    #about {
      grid-template-columns: 1fr 3fr;
      grid-template-rows: auto 15vw 15vw 15vw;
      gap: 2vw;
    }

    #title {
      grid-column: 1 / 3;
      grid-row: 1 / 2;
    }

    #h2h {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
    }

    #ranking {
      grid-column: 1 / 2;
      grid-row: 3 / 4;
    }

    #history {
      grid-column: 1 / 2;
      grid-row: 4 / 5;
    }

    #img {
      grid-column: 2 / 3;
      grid-row: 2 / 5;
      width: 100%;
      height: 100%;
    }

    button {
      grid-template-rows: 40% 25% 35%;
      border-width: 0.3vw;
    }

    .button-text {
      display: inline;
    }

    .button-icon {
      height: 70%;
      align-self: last baseline;
    }
  }

  @media (max-width: 768px) and (max-height: 600px) {
    button {
      grid-template-columns: 20% 80%;
      grid-template-rows: 100%;
      border-width: 0.3vw;
      align-items: center;
    }
  }
</style>
