<script>
  let coachProfile = {
    Idade: 50,
    "País de Origem": "Brasil",
    "Clube Atual/Mais Recente": "Internacional",
    Clubes: 9,
    Partidas: 100,
    "Mais Partidas": "Cruzeiro",
    Aproveitamento: "0.53",
    "Melhor Aproveitamento": "Corinthians (53%)",
  };
</script>

<section id="profile">
  <h2>Perfil</h2>
  <img src="/src/static/images/mano.png" alt="" />
  <p>Mano Menezes</p>
  <table>
    <tbody>
      {#each Object.entries(coachProfile) as [key, value]}
          <tr>
              <td>{key}</td>
              <td>{value}</td>
          </tr>
      {/each}
    </tbody>
  </table>
  <p>*Considerando apenas jogos de Copa do Brasil e séries A, B, C e D desde 2014. 
  <a href="/sobre">Clique aqui</a> para mais informações.</p>
</section>
