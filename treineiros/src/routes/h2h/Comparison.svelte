<script>
  import { age, shortDate } from "$lib/assets/functions";
  export let coachInfo1;
  export let coachInfo2;
  export let h2h;
</script>

<section id="comparison">
  <table class="table" id="generalData">
    <colgroup>
      <col class="col1" />
      <col class="col2" />
      <col class="col3" />
    </colgroup>
    <thead>
      <tr>
        <th />
        <th>Dados Gerais</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr>
        {#if coachInfo1.date_of_birth === ""}
          <td />
        {:else if coachInfo1.date_of_birth === null}
          <td>-</td>
        {:else}
          <td>{age(coachInfo1.date_of_birth)} anos</td>
        {/if}
        <td>Idade</td>
        {#if coachInfo2.date_of_birth === ""}
          <td />
        {:else if coachInfo2.date_of_birth === null}
          <td>-</td>
        {:else}
          <td>{age(coachInfo2.date_of_birth)} anos</td>
        {/if}
      </tr>
      <tr>
        {#if coachInfo1.country_of_birth === null}
          <td>-</td>
        {:else}
          <td>{coachInfo1.country_of_birth}</td>
        {/if}
        <td>País de Origem</td>
        {#if coachInfo2.country_of_birth === null}
          <td>-</td>
        {:else}
          <td>{coachInfo2.country_of_birth}</td>
        {/if}
      </tr>
      <tr>
        {#if coachInfo1.last_team_name === ""}
          <td />
        {:else}
          <td>{coachInfo1.last_team_name}/{coachInfo1.last_team_state}</td>
        {/if}
        <td>Último Clube/Mais Recente</td>
        {#if coachInfo2.last_team_name === ""}
          <td />
        {:else}
          <td>{coachInfo2.last_team_name}/{coachInfo2.last_team_state}</td>
        {/if}
      </tr>
      <tr>
        {#if coachInfo1.last_match_date !== ""}
          <td>{shortDate(coachInfo1.last_match_date)}</td>
        {:else}
          <td />
        {/if}
        <td>Última Partida</td>
        {#if coachInfo2.last_match_date !== ""}
          <td>{shortDate(coachInfo2.last_match_date)}</td>
        {:else}
          <td />
        {/if}
      </tr>
      <tr>
        <td>{coachInfo1.teams}</td>
        <td>Clubes</td>
        <td>{coachInfo2.teams}</td>
      </tr>
      <tr>
        <td>{coachInfo1.matches}</td>
        <td>Partidas</td>
        <td>{coachInfo2.matches}</td>
      </tr>
      <tr>
        {#if coachInfo1.most_matches_team === ""}
          <td />
        {:else}
          <td
            >{coachInfo1.most_matches_team}/{coachInfo1.most_matches_team_state}
            ({coachInfo1.most_matches})</td
          >
        {/if}
        <td>Mais Partidas</td>
        {#if coachInfo2.most_matches_team === ""}
          <td />
        {:else}
          <td
            >{coachInfo2.most_matches_team}/{coachInfo2.most_matches_team_state}
            ({coachInfo2.most_matches})</td
          >
        {/if}
      </tr>
      <tr>
        {#if coachInfo1.point_percentage !== ""}
          <td>{coachInfo1.point_percentage}%</td>
        {:else}
          <td />
        {/if}
        <td>Aproveitamento</td>
        {#if coachInfo2.point_percentage !== ""}
          <td>{coachInfo2.point_percentage}%</td>
        {:else}
          <td />
        {/if}
      </tr>
      <tr>
        <td>{coachInfo1.goals_scored_average}</td>
        <td>Média de Gols Marcados</td>
        <td>{coachInfo2.goals_scored_average}</td>
      </tr>
      <tr>
        <td>{coachInfo1.goals_conceded_average}</td>
        <td>Média de Gols Sofridos</td>
        <td>{coachInfo2.goals_conceded_average}</td>
      </tr>
    </tbody>
  </table>
  {#if Object.values(h2h)[0] !== ""}
    <table class="table" id="h2h">
      <colgroup>
        <col class="col1" />
        <col class="col2" />
        <col class="col3" />
      </colgroup>
      <thead>
        <tr>
          <th />
          <th>Confrontos</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{h2h.coach1_goals}</td>
          <td>Gols</td>
          <td>{h2h.coach2_goals}</td>
        </tr>
        <tr>
          <td>{h2h.coach1_yellow_cards}</td>
          <td>Cartões Amarelos</td>
          <td>{h2h.coach2_yellow_cards}</td>
        </tr>
        <tr>
          <td>{h2h.coach1_red_cards}</td>
          <td>Cartões Vermelhos</td>
          <td>{h2h.coach2_red_cards}</td>
        </tr>
      </tbody>
    </table>
  {/if}
  <p class="asterisk">
    *Considerando apenas jogos das Séries A, B, C e D e da Copa do Brasil desde
    2014. <a href="/sobre">Clique aqui</a> para mais informações.
  </p>
</section>

<style>
  .table {
    table-layout: fixed;
    margin: 5vh 0;
    white-space: inherit;
  }

  .col1 {
    width: 35%;
  }

  td:first-child {
    text-align: left;
    font-weight: var(--bold);
  }

  .col2 {
    width: 30%;
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
    width: 35%;
  }

  td:last-child {
    font-weight: var(--bold);
    text-align: right;
  }

  th {
    border: 1px solid;
    border-color: var(--background-color) var(--background-color) #e5e5e525;
  }

  td {
    border: 1px solid;
    border-color: var(--background-color) var(--background-color) #e5e5e525;
  }
</style>
