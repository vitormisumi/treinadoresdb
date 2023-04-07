<script>
  import { each } from "svelte/internal";

  let matchInfo = {
    date: "07/04/2023",
    competition: "Campeonato Brasileiro Série A",
    stadium: "Beira-Rio / Porto Alegre",
    "home-team": "Internacional",
    "home-coach": "Mano Menezes",
    "home-score": 3,
    "away-team": "Palmeiras",
    "away-coach": "Abel Ferreira",
    "away-score": 2,
  };
  let matchData = {
    "Momento dos Gols": [
      ["15'1T", "20'2T"],
      ["10'1T", "30'1T", "40'2T"],
    ],
    "Cartões Amarelos": [3, 2],
    "Cartões Vermelhos": [0, 1],
    Substituições: [5, 5],
    "Momento da 1ª Sub": ["30'2T", "45'INT"],
  };
</script>

<section id="match">
  <h2>Partida</h2>
  <img src="/src/static/images/mano.png" alt="" />
  <img src="/src/static/images/{matchInfo.equipe_mandante}.png" alt="" />
  <img src="/src/static/images/abel.png" alt="" />
  <img src="/src/static/images/{matchInfo.equipe_visitante}.png" alt="" />
  {#each Object.entries(matchInfo) as [key, value]}
    <p id={key}>{value}</p>
  {/each}
  <table>
    <tbody>
      <tr>
        <th />
        <th>Dados Gerais</th>
        <th />
      </tr>
      {#each Object.entries(matchData) as [key, value]}
        <tr>
          <td>{value[0]}</td>
          <td>{key}</td>
          <td>{value[1]}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>
