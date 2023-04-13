<script>
  import Navbar from "../home/Navbar.svelte";
</script>

<Navbar />

<section id="about">
    <h3>O que é o Treineiros?</h3>
    <p>
      Treineiros é um site de consulta de informações dos treinadores do Brasil.
      Aqui você encontrará dados de gols, cartões e substituições de todos os jogos
      das séries A, B, C e D e da Copa do Brasil desde a temporada 2014. Com esses
      dados poderá analisar quais treinadores tem melhor desempenho em diversos
      indicadores ou analisar os duelos entre 2 treinadores ou entre 1 treinador e
      uma equipe específica.
    </p>
    <h3>
      Por quê apenas dados das competições nacionais e não das regionais ou
      sulamericanas?
    </h3>
    <p>
      Os dados aqui publicados são extraídos de forma automática das súmulas das
      competições no site da CBF, que são padronizadas e disponíveis desde a
      temporada 2014. Infelizmente as súmulas dos campeonatos regionais e
      competições sulamericanas não seguem o mesmo padrão ou não estão disponíveis
      nos sites das federações.
    </p>
    <h3>Como são coletados os dados?</h3>
    <p>
      Um script foi construído para analisar os arquivos PDF das súmulas digitais de
      cada jogo. Esse script é rodado diariamente para buscar as súmulas mais
      recentes disponibilizadas. Cada informação é então cadastrada em um banco de
      dados. Regularmente é realizado um tratamento nos dados para garantir que as
      informações sejam fidedignas. Por exemplo: é comum que o mesmo treinador
      esteja cadastrado em diferentes súmulas com nomes ligeiramente diferentes.
      Essa checagem é feita de forma manual e os erros corrigidos no banco de dados.
    </p>
</section>

<style>
    #about {
        max-width: 800px;
    }
    h3 {
        color: var(--main-color);
        font-family: "Roboto Condensed";
        font-size: clamp(1.5rem, 4vw, 2.5rem);
    }

    p {
        color: var(--main-color);
        font-family: "Roboto Condensed";
        font-size: clamp(1rem, 3vw, 2rem);
    }
</style>