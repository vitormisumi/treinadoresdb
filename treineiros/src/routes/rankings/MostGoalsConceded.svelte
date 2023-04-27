<script>
  import { getContext } from "svelte";

  const mostGoalsConceded = getContext("mostGoalsConceded");
</script>

<table id="ranking-table">
  <tbody>
    {#each $mostGoalsConceded as coach, i}
      <tr>
        <td class="position-column">{i + 1}º</td>
        <td
          ><img
            src="/src/lib/assets/images/coaches/{coach.coach_id}.png"
            alt={coach.coach_name}
            class="coach-img"
          /></td
        >
        {#if coach.coach_nickname === null}
          <td class="coach-column"
            ><a href="/perfil/{coach.coach_id}">{coach.coach_name}</a></td
          >
        {:else}
          <td class="coach-column"
            ><a href="/perfil/{coach.coach_id}">{coach.coach_nickname}</a></td
          >
        {/if}
        <td class="value-column">{coach.goals_conceded}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  #ranking-table {
    font-family: var(--main-font);
    font-size: clamp(1rem, 4vw, 2.5rem);
    border-collapse: collapse;
    grid-area: table;
  }

  #ranking-table tr:first-child td {
    border-radius: 1vw 1vw 0 0;
  }

  #ranking-table tr:last-child td {
    border-radius: 0 0 1vw 1vw;
    border: 0;
  }

  td {
    border: 1px solid;
    border-color: var(--background-color) var(--background-color) #e5e5e525;
  }

  a {
    color: var(--main-color);
  }

  .position-column {
    color: var(--main-color);
  }

  .coach-column {
    color: var(--main-color);
    background-color: var(--table-background);
  }

  .value-column {
    color: var(--accent-color);
  }

  .coach-img {
    width: auto;
    max-height: 50px;
    padding: 0;
    margin: 0;
  }
</style>
