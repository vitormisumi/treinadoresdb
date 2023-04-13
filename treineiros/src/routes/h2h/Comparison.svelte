<script>
  let generalData = {
    Idade: [50, 40],
    "País de Origem": ["Brasil", "Portugal"],
    "Clube Atual/Mais Recente": ["Internacional", "Palmeiras"],
    Clubes: [9, 1],
    Partidas: [200, 50],
    "Mais Partidas": [50, 50],
    Aproveitamento: [0.53, 0.62],
    "Melhor Aproveitamento": [0.66, 0.62],
    "Média de Gols": [1.3, 1.8],
  };

  let h2h = {
    Gols: [9, 12],
    "Cartões Amarelos": [3, 4],
    "Cartões Vermelhos": [1, 0],
  };
</script>

<section id="comparison">
  <table class="table" id="generalData">
    <thead>
      <th />
      <th class="col2">Dados Gerais</th>
      <th />
    </thead>
    <tbody>
      {#each Object.entries(generalData) as [key, value]}
        <tr>
          <td class="col1">{value[0]}</td>
          <td class="col2">{key}</td>
          <td class="col3">{value[1]}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <table class="table" id="h2h">
    <thead>
      <th />
      <th class="col2">Confrontos</th>
      <th />
    </thead>
    <tbody>
      {#each Object.entries(h2h) as [key, value]}
        <tr>
          <td class="col1">{value[0]}</td>
          <td class="col2">{key}</td>
          <td class="col3">{value[1]}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <p id="asterisk">
    *Considerando apenas jogos das Séries A, B, C e D e da Copa do Brasil desde
    2014. <a href="/sobre">Clique aqui</a> para mais informações.
  </p>
</section>

<style>
  .table {
    width: 100%;
    border-collapse: collapse;
    margin: 5vh 0;
  }

  .col1 {
    width: 30%;
    font-weight: var(--bold);
  }

  .col2 {
    text-align: center;
    width: 40%;
    background-color: var(--table-background);
  }

  .table tr:first-child th {
    border-radius: 1vw 1vw 0 0;
  }

  .table tr:last-child td {
    border-radius: 0 0 1vw 1vw;
    border: 0;
  }

  .col3 {
    text-align: right;
    width: 30%;
    font-weight: var(--bold);
  }

  tr {
    height: clamp(30px, 5vh, 50px);
  }

  th {
    font-family: var(--main-font);
    font-size: clamp(1rem, 3.5vw, 2rem);
    font-weight: var(--bold);
    color: var(--main-color);
    border: 1px solid;
    border-color: var(--background-color) var(--background-color) #e5e5e525;
  }

  td {
    font-family: var(--main-font);
    font-size: clamp(0.75rem, 3vw, 1.5rem);
    color: var(--main-color);
    border: 1px solid;
    border-color: var(--background-color) var(--background-color) #e5e5e525;
  }

  #asterisk {
    font-family: var(--main-font);
    font-size: clamp(0.75rem, 1.5vw, 1rem);
    color: var(--main-color);
  }
</style>
