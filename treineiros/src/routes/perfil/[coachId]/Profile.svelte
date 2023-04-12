<script>
  export let coach;
</script>

<section id="profile">
  <h2 id="title">Perfil</h2>
  <img id="image" src="/src/static/images/mano.png" alt="" />
  <p id="name">{coach.name}</p>
  <table id="coach-table">
    <tbody>
      {#each Object.entries(coach) as [key, value]}
          <tr>
              <td>{key}</td>
              <td>{value}</td>
          </tr>
      {/each}
    </tbody>
  </table>
  <p id="asterisk">*Considerando apenas jogos de Copa do Brasil e séries A, B, C e D desde 2014. 
  <a href="/sobre">Clique aqui</a> para mais informações.</p>
</section>

<style>
  #profile {
    margin: var(--section-margin);
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr 4fr 1fr;
    grid-template-areas: 
    "title title"
    "image table"
    "name asterisk";
  }

  #title {
    grid-area: title;
  }

  #image {
    width: 100%;
    height: 100%;
  }

  #name {
    grid-area: name;
    color: var(--main-color);
  }

  #coach-table {
    grid-area: table;
    font-family: var(--main-font);
    color: var(--main-color);
  }

  #asterisk {
    grid-area: asterisk;
    color: var(--main-color);
  }
</style>
