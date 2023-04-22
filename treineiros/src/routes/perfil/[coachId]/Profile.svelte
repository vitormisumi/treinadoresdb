<script>
  import fallback from '$lib/assets/images/coaches/default.png';

  export let coach;
  export let lastClub;
  export let lastMatch;
  export let numberOfClubs;
  export let numberOfMatches;
  export let mostMatches;
  export let percentage;
  export let goalsScoredAvg;
  export let goalsConcededAvg;

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

  const handleError = (ev) => (ev.target.src = fallback);
</script>

<section id="profile">
  <h2 id="title">Perfil</h2>
  <img
    id="image"
    src="/src/lib/assets/images/coaches/{coach.coach_id}.png"
    on:error={handleError}
    alt={coach.name}
  />
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
        <td class="col1">Última Partida</td>
        <td class="col2"
          >{("0" + lastMatch.getDate()).slice(-2)}/{(
            "0" +
            (lastMatch.getMonth() + 1)
          ).slice(-2)}/{lastMatch.getFullYear()}</td
        >
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
        <td class="col2"
          >{mostMatches.name}/{mostMatches.state} ({mostMatches.count})</td
        >
      </tr>
      <tr>
        <td class="col1">Aproveitamento</td>
        <td class="col2">{percentage.toFixed(1)}%</td>
      </tr>
      <tr>
        <td class="col1">Média Gols Marcados</td>
        <td class="col2">{Number(goalsScoredAvg).toFixed(2)}</td>
      </tr>
      <tr>
        <td class="col1">Média Gols Sofridos</td>
        <td class="col2">{Number(goalsConcededAvg).toFixed(2)}</td>
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
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "title"
      "image"
      "name"
      "table" 
      "asterisk";
  }

  #title {
    grid-area: title;
  }

  #image {
    justify-self: center;
    width: 50%;
  }

  #name {
    grid-area: name;
    color: var(--main-color);
    font-size: clamp(1.25rem, 4vw, 2.5rem);
    text-align: center;
    margin: 0;
  }

  #coach-table {
    grid-area: table;
    font-family: var(--main-font);
    font-size: clamp(0.75rem, 2.5vw, 2rem);
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
    font-weight: var(--bold);
  }

  td {
    border: 1px solid;
    border-color: transparent transparent #e5e5e525;
  }

  #coach-table tr:first-child td {
    border-radius: 1vw 1vw 0 0;
  }

  #coach-table tr:last-child td {
    border-radius: 0 0 1vw 1vw;
    border: 0;
  }

  #asterisk {
    grid-area: asterisk;
    color: var(--main-color);
    font-size: clamp(0.75rem, 2vw, 1rem);
  }

  @media (min-width: 768px) {
    #profile {
      grid-template-columns: 1fr 2fr;
      grid-template-rows: auto;
      grid-template-areas:
        "title title"
        "image table"
        "name asterisk";
      column-gap: 5%;
    }

    #image {
      width: auto;
      height: 100%;
    }
  }
</style>
