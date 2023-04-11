<section id="numbers">
  <h2 id="numbers-title">
    Todas as principais competições<br />do calendário nacional.
  </h2>
  <div class="numbers">
    <h3 class="number-item"><span class="over">+900</span><br />treinadores</h3>
    <h3 class="number-item"><span class="over">+12000</span><br />partidas*</h3>
    <h3 class="number-item"><span class="over">+300</span><br />equipes</h3>
  </div>
  <p id="asterisk">
    *Todos os jogos da Copa do Brasil e das séries A, B, C e D desde 2014.
  </p>
</section>

<style>
  #numbers {
    background: linear-gradient(
      180deg,
      #272932 0%,
      rgba(255, 255, 255, 1) 100%
    );
    padding: max(15px, 5vw);
  }

  #numbers-title {
    color: var(--background-color);
  }

  .numbers {
    justify-items: center;
    text-align: center;
  }

  .number-item {
    margin: 0vw 0 10vw 0;
    font-family: var(--main-font);
    font-weight: 400;
    font-size: clamp(1.5rem, 2vw, 2rem);
    color: var(--background-color);
  }

  .over {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
    color: var(--accent-color);
  }

  #asterisk {
    color: var(--background-color);
    font-family: var(--main-font);
    font-size: clamp(1rem, 2vw, 1.5rem);
    text-align: center;
  }

  @media (min-width: 768px) {
    .numbers {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      margin: 0;
    }
    
    .number-item {
        margin: 0;
    }
  }
</style>
