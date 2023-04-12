<script>
  export let coach;
  export let lastClub;
  export let numberOfClubs;
  export let numberOfMatches;
  export let mostMatches;
  export let percentage;

  function age(birthdate) {
    const today = new Date();
    const age =
      today.getFullYear() -
      birthdate.getFullYear() -
      (today.getMonth() < birthdate.getMonth() ||
        (today.getMonth() === birthdate.getMonth() &&
          today.getDate() < birthdate.getDate()));
    return age;
  }
</script>

<section id="profile">
  <h2 id="title">Perfil</h2>
  <img id="image" src="/src/static/images/mano.png" alt="" />
  {#if coach.nickname === null}
    <p id="name">{coach.name}</p>
  {:else}
    <p id="name">{coach.nickname}</p>
  {/if}
  <table id="coach-table">
    <tbody>
      <tr>
        <td class="col1">Idade</td>
        {#if coach.date_of_birth === null}
          <td class="col2">-</td>
        {:else}
          <td class="col2">{age(coach.date_of_birth)} anos</td>
        {/if}
      </tr>
      <tr>
        <td class="col1">País de Origem</td>
        {#if coach.country_of_birth === null}
          <td class="col2">-</td>
        {:else}
          <td class="col2">{coach.country_of_birth}</td>
        {/if}
      </tr>
      <tr>
        <td class="col1">Clube Atual/Mais Recente</td>
        <td class="col2">{lastClub}</td>
      </tr>
      <tr>
        <td class="col1">Clubes</td>
        <td class="col2">{numberOfClubs}</td>
      </tr>
      <tr>
        <td class="col1">Partidas</td>
        <td class="col2">{numberOfMatches}</td>
      </tr>
      <tr>
        <td class="col1">Mais Partidas</td>
        <td class="col2">{mostMatches.name}/{mostMatches.state} ({mostMatches.count})</td>
      </tr>
      <tr>
        <td class="col1">Aproveitamento</td>
        <td class="col2">{percentage}%</td>
      </tr>
    </tbody>
  </table>
  <p id="asterisk">
    *Considerando apenas jogos de Copa do Brasil e séries A, B, C e D desde
    2014.
    <a href="/sobre">Clique aqui</a> para mais informações.
  </p>
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
    border-collapse: collapse;
  }

  .col1 {
    background-color: var(--table-background);
    width: 50%;
  }

  .col2 {
    text-align: right;
    width: 50%;
  }

  td {
    border: 1px solid;
    border-color: var(--background-color) var(--background-color) #e5e5e525;
  }

  #coach-table tr:first-child td {
    border-radius: 1vw 0 0 0;
  }

  #coach-table tr:last-child td {
    border-radius: 0 0 0 1vw;
    border: 0;
  }

  #asterisk {
    grid-area: asterisk;
    color: var(--main-color);
  }
</style>
