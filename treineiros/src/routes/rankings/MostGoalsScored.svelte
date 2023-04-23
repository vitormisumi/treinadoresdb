<script>
    import { getContext } from "svelte";

    const mostGoalsScored = getContext('mostGoalsScored');
</script>

<table id="ranking-table">
  <tbody>
    {#each $mostGoalsScored as coach, i}
      <tr>
        <td class="position-column">{i + 1}º</td>
        <td
          ><img
            src="/src/lib/assets/images/coaches/{coach.coach_id}.png"
            alt={coach.name}
            class="coach-img"
          /></td
        >
        {#if coach.nickname === null}
          <td class="coach-column"><a href="/perfil/{coach.coach_id}">{coach.name}</a></td>
        {:else}
          <td class="coach-column"><a href="/perfil/{coach.coach_id}">{coach.nickname}</a></td>
        {/if}
        <td class="value-column">{coach.goals_scored}</td>
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
    height: 50px;
    padding: 0;
    margin: 0;
  }
</style>
