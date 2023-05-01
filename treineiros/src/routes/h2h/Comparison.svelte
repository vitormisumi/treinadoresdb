<script>
  export let coachInfo1;
  export let coachInfo2;
  export let h2h;

  function age(birthdate) {
    const today = new Date();
    let age =
      today.getFullYear() -
      birthdate.getFullYear() -
      (today.getMonth() < birthdate.getMonth() ||
        (today.getMonth() === birthdate.getMonth() &&
          today.getDate() < birthdate.getDate()));
    return age;
  }

  function shortDate(date) {
    return (
      ("0" + date.getDate()).slice(-2) +
      "/" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      date.getFullYear()
    );
  }
</script>

<section id="comparison">
  <table class="table" id="generalData">
    <thead>
      <tr>
        <th />
        <th class="col2">Dados Gerais</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr>
        {#if coachInfo1.date_of_birth === ""}
          <td class="col1" />
        {:else if coachInfo1.date_of_birth === null}
          <td class="col1">-</td>
        {:else}
          <td class="col1">{age(coachInfo1.date_of_birth)} anos</td>
        {/if}
        <td class="col2">Idade</td>
        {#if coachInfo2.date_of_birth === ""}
          <td class="col3" />
        {:else if coachInfo2.date_of_birth === null}
          <td class="col3">-</td>
        {:else}
          <td class="col3">{age(coachInfo2.date_of_birth)} anos</td>
        {/if}
      </tr>
      <tr>
        {#if coachInfo1.country_of_birth === null}
          <td class="col1">-</td>
        {:else}
          <td class="col1">{coachInfo1.country_of_birth}</td>
        {/if}
        <td class="col2">País de Origem</td>
        {#if coachInfo2.country_of_birth === null}
          <td class="col3">-</td>
        {:else}
          <td class="col3">{coachInfo2.country_of_birth}</td>
        {/if}
      </tr>
      <tr>
        {#if coachInfo1.last_team_name === ""}
          <td class="col1" />
        {:else}
          <td class="col1"
            >{coachInfo1.last_team_name}/{coachInfo1.last_team_state}</td
          >
        {/if}
        <td class="col2">Último Clube/Mais Recente</td>
        {#if coachInfo2.last_team_name === ""}
          <td class="col3" />
        {:else}
          <td class="col3"
            >{coachInfo2.last_team_name}/{coachInfo2.last_team_state}</td
          >
        {/if}
      </tr>
      <tr>
        {#if coachInfo1.last_match_date !== ""}
          <td class="col1">{shortDate(coachInfo1.last_match_date)}</td>
        {:else}
          <td class="col1" />
        {/if}
        <td class="col2">Última Partida</td>
        {#if coachInfo2.last_match_date !== ""}
          <td class="col3">{shortDate(coachInfo2.last_match_date)}</td>
        {:else}
          <td class="col3" />
        {/if}
      </tr>
      <tr>
        <td class="col1">{coachInfo1.teams}</td>
        <td class="col2">Clubes</td>
        <td class="col3">{coachInfo2.teams}</td>
      </tr>
      <tr>
        <td class="col1">{coachInfo1.matches}</td>
        <td class="col2">Partidas</td>
        <td class="col3">{coachInfo2.matches}</td>
      </tr>
      <tr>
        {#if coachInfo1.most_matches_team === ""}
          <td class="col1" />
        {:else}
          <td class="col1"
            >{coachInfo1.most_matches_team}/{coachInfo1.most_matches_team_state}
            ({coachInfo1.most_matches})</td
          >
        {/if}
        <td class="col2">Mais Partidas</td>
        {#if coachInfo2.most_matches_team === ""}
          <td class="col3" />
        {:else}
          <td class="col3"
            >{coachInfo2.most_matches_team}/{coachInfo2.most_matches_team_state}
            ({coachInfo2.most_matches})</td
          >
        {/if}
      </tr>
      <tr>
        {#if coachInfo1.point_percentage !== ""}
          <td class="col1">{coachInfo1.point_percentage}%</td>
        {:else}
          <td class="col1" />
        {/if}
        <td class="col2">Aproveitamento</td>
        {#if coachInfo2.point_percentage !== ""}
          <td class="col3">{coachInfo2.point_percentage}%</td>
        {:else}
          <td class="col3" />
        {/if}
      </tr>
      <tr>
        <td class="col1">{coachInfo1.goals_scored_average}</td>
        <td class="col2">Média de Gols Marcados</td>
        <td class="col3">{coachInfo2.goals_scored_average}</td>
      </tr>
      <tr>
        <td class="col1">{coachInfo1.goals_conceded_average}</td>
        <td class="col2">Média de Gols Sofridos</td>
        <td class="col3">{coachInfo2.goals_conceded_average}</td>
      </tr>
    </tbody>
  </table>
  <table class="table" id="h2h">
    <thead>
      <tr>
        <th />
        <th class="col2">Confrontos</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="col1">{h2h.coach1_goals}</td>
        <td class="col2">Gols</td>
        <td class="col3">{h2h.coach2_goals}</td>
      </tr>
      <tr>
        <td class="col1">{h2h.coach1_yellow_cards}</td>
        <td class="col2">Cartões Amarelos</td>
        <td class="col3">{h2h.coach2_yellow_cards}</td>
      </tr>
      <tr>
        <td class="col1">{h2h.coach1_red_cards}</td>
        <td class="col2">Cartões Vermelhos</td>
        <td class="col3">{h2h.coach2_red_cards}</td>
      </tr>
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
