<script>
  import { age, shortDate } from "$lib/assets/functions";
  import fallback from "$lib/assets/images/default-coach.png";

  export let coach;
  export let lastClub;
  export let lastMatch;
  export let numberOfClubs;
  export let numberOfMatches;
  export let mostMatches;
  export let pointPercentage;
  export let goalsScoredAvg;
  export let goalsConcededAvg;

  const handleError = (ev) => (ev.target.src = fallback);
</script>

<section id="profile">
  <h2 id="title">Perfil</h2>
  <img
    id="image"
    src={`/coaches/${coach.coach_id}.png`}
    on:error={handleError}
    alt={coach.name}
  />
  {#if coach.nickname === null}
    <h4 class="name">{coach.name}</h4>
  {:else}
    <h4 class="name">{coach.nickname}</h4>
  {/if}
  <table class="table coach">
    <colgroup>
      <col class="col1" />
      <col class="col2" />
    </colgroup>
    <tbody>
      <tr class="table-lines">
        <td>Idade</td>
        {#if coach.date_of_birth === null}
          <td>-</td>
        {:else}
          <td>{age(coach.date_of_birth)} anos</td>
        {/if}
      </tr>
      <tr class="table-lines">
        <td>País de Origem</td>
        {#if coach.country_of_birth === null}
          <td>-</td>
        {:else}
          <td>{coach.country_of_birth}</td>
        {/if}
      </tr>
      <tr class="table-lines">
        <td>Clube Atual/Mais Recente</td>
        <td>{lastClub}</td>
      </tr>
      <tr class="table-lines">
        <td>Última Partida</td>
        <td>{shortDate(lastMatch)}</td>
      </tr>
      <tr class="table-lines">
        <td>Clubes</td>
        <td>{numberOfClubs}</td>
      </tr>
      <tr class="table-lines">
        <td>Partidas</td>
        <td>{numberOfMatches}</td>
      </tr>
      <tr class="table-lines">
        <td>Mais Partidas</td>
        <td>{mostMatches.name}/{mostMatches.state} ({mostMatches.count})</td>
      </tr>
      <tr class="table-lines">
        <td>Aproveitamento</td>
        <td>{pointPercentage}%</td>
      </tr>
      <tr class="table-lines">
        <td>Gols Feitos/Partida</td>
        <td>{goalsScoredAvg}</td>
      </tr>
      <tr>
        <td>Gols Sofridos/Partida</td>
        <td>{goalsConcededAvg}</td>
      </tr>
    </tbody>
  </table>
  <p class="asterisk">
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

  .name {
    grid-area: name;
    text-align: center;
    margin: 0;
  }

  .coach {
    grid-area: table;
    font-family: var(--main-font);
    font-size: clamp(0.75rem, 2.5vw, 2rem);
    border-collapse: collapse;
  }

  .col1 {
    background-color: var(--table-background);
    width: 50%;
  }

  td:first-child {
    text-align: left;
  }

  td:last-child {
    text-align: right;
    font-weight: var(--bold);
  }

  .col2 {
    width: 50%;
  }

  .coach tr:first-child td {
    border-radius: 1vw 1vw 0 0;
  }

  .coach tr:last-child td {
    border-radius: 0 0 1vw 1vw;
    border: 0;
  }

  .asterisk {
    grid-area: asterisk;
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
