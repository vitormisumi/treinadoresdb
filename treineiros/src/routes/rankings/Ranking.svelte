<script>
  let coachesList = {
    "Guto Ferreira": 100,
    "Mano Menezes": 90,
    "Vanderlei Luxemburgo": 80,
    "Abel Ferreira": 70,
    "Rogério Ceni": 60,
    "Vagner Mancini": 50,
    "Odair Hellmann": 40,
    "Fernando Diniz": 30,
    Felipão: 20,
    "Dorival Júnior": 10,
  };

  let indicators = [
    "Mais partidas",
    "Melhor aproveitamento",
    "Melhor média de gols",
  ];

  let competitions = [
    "Brasileiro Série A",
    "Brasileiro Série B",
    "Brasileiro Série C",
    "Brasileiro Série D",
    "Copa do Brasil",
  ];

  let selectedCompetitions = [
    "Brasileiro Série A",
    "Brasileiro Série B",
    "Brasileiro Série C",
    "Brasileiro Série D",
    "Copa do Brasil",
  ];
</script>

<h2>Rankings</h2>
<table>
  <tbody>
    {#each Object.entries(coachesList) as [key, value], i}
      <tr>
        <td>{i + 1}º</td>
        <td>{key}</td>
        <td>{value}</td>
      </tr>
    {/each}
  </tbody>
</table>
<p>
  *Considerando apenas jogos de Copa do Brasil e séries A, B, C e D desde 2014.<br
  />
  <a href="/sobre">Clique aqui</a> para mais informações.
</p>
<select name="team" id="team">
  <option value="default" selected disabled>Indicador</option>
  {#each indicators as indicator}
    <option value={indicator}>{indicator}</option>
  {/each}
</select>
<br />
{#each competitions as competition}
  <label>
    <input
      type="checkbox"
      bind:group={selectedCompetitions}
      name="competitions"
      value={competition}
    />
    {competition}
  </label>
{/each}
<br />

