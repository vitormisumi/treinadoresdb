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
    <tbody>
      <tr>
        <th />
        <th>Dados Gerais</th>
        <td />
      </tr>
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
    <tbody>
      <tr>
        <th />
        <th>Confrontos</th>
        <td />
      </tr>
      {#each Object.entries(h2h) as [key, value]}
        <tr>
          <td class="col1">{value[0]}</td>
          <td class="col2">{key}</td>
          <td class="col3">{value[1]}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>

<style>
  #comparison {
    margin: min(5vw, 50px);
  }
  .table {
    width: 100%;
  }

  .col1 {
    width: 30%;
  }

  .col2 {
    text-align: center;
    width: 40%;
  }

  .col3 {
    text-align: right;
    width: 30%;
  }

  td {
    color: aliceblue;
  }
</style>
