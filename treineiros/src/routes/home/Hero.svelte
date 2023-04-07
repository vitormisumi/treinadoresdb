<section id="hero">
  <div id="field-fade" />
  <img src="https://unsplash.com/photos/tim7f_0oyl8" alt="campo de futebol" id="field-img" />
  <h2 id="main-title">O portal da análise de treinadores do Brasil</h2>
  <h2 id="description">Dados únicos para conhecer mais a fundo os comandantes das equipes brasileiras</h2>
  <div id="coaches-fade" />
  <img src="/src/static/images/coaches.png" alt="treinadores" id="coaches-img" />
</section>

<style>
  #hero {
    display: grid;
    position: relative;
    grid-template-columns: 1fr 8fr 1fr;
    grid-template-rows: min(5vh, 20px) auto;
  }

  #field-fade {
    grid-column: 1 / 3;
    grid-row: 1 / 5;
    z-index: 1;
    background: linear-gradient(90deg, rgba(39, 41, 50, 0) 0%, #272932 100%);
  }

  #field-img {
    width: 100%;
    height: 100%;
    grid-column: 1 / 3;
    grid-row: 1 / 5;
    opacity: 40%;
    mix-blend-mode: luminosity;
    object-fit: cover;
  }

  #main-title {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    font-size: clamp(1.5rem, 7vw, 3rem);
    text-align: center;
    color: var(--main-color);
    text-shadow: 0px 3px 5px var(--background-color);
    padding: 5%;
    z-index: 9999;
  }

  #description {
    font-family: 'Roboto Condensed';
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    z-index: 1000;
    font-size: clamp(1rem, 4vw, 1.5rem);
    color: var(--main-color);
    text-shadow: 0px 3px 5px var(--background-color);
    padding: 5%;
    align-self: top;
  }

  #coaches-img {
    grid-column: 2 / 3;
    grid-row: 4 / 5;
    align-self: last baseline;
    justify-self: center;
    width: 100%;
    z-index: 100;
    mix-blend-mode: luminosity;
  }

  #coaches-fade {
    grid-column: 1 / 3;
    grid-row: 4 / 5;
    align-self: bottom;
    z-index: 200;
    background: linear-gradient(180deg, #27293200 0%, #272932 100%);
  }

  @media (min-width: 768px) {
    #hero {
      display: grid;
      grid-template-columns: repeat(2, 4.5fr) 1fr;
      grid-template-rows: max(10vh, 40px) auto;
      margin: 0 0 10vw 0;
    }

    #field-img {
      grid-column: 1 / 2;
    }

    #field-fade {
      grid-column: 1 / 2;
    }

    #main-title {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
      text-align: right;
    }

    #description {
      text-align: right;
      grid-column: 2 / 3;
      grid-row: 3 / 4;
    }

    #coaches-img {
      grid-column: 2 / 3;
      grid-row: 4 / 5;
      justify-self: right;
    }

    #coaches-fade {
      grid-column: 2 / 3;
      grid-row: 4 / 5;
    }
  }
</style>
