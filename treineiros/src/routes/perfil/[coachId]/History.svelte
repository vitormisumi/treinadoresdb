<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  export let history;
  export let totalHistory;

  const groupMenu = [
    {
      slug: "team",
      name: "Clube",
    },
    {
      slug: "competition",
      name: "Competição",
    },
  ];

  let groups;

  const handleGroupChange = () => {
    goto(`?groups=${groups}`, {
      noScroll: true,
    });
  };
</script>

<section id="history">
  <h2>Histórico</h2>
  <form>
    <div id="groups">
      <h3 id="group-heading">Agrupar por:</h3>
      {#each groupMenu as group}
        <label>
          <input
            type="checkbox"
            bind:group={groups}
            name="groups"
            value={group.slug}
            on:change={handleGroupChange}
          />
          {group.name}
        </label>
      {/each}
    </div>
  </form>
  <div id="table">
    <table>
      <thead>
        <tr>
          <th>Ano</th>
          {#if history[0].team !== undefined}
            <th>Clube</th>
          {/if}
          {#if history[0].competition !== undefined}
            <th>Campeonato</th>
          {/if}
          <th>P</th>
          <th>V</th>
          <th>E</th>
          <th>D</th>
          <th>GM</th>
          <th>GS</th>
          <th>SG</th>
          <th>CA</th>
          <th>CV</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        {#each history as column}
          <tr>
            <td>{column.year}</td>
            {#if column.team !== undefined}
              <td>{column.team}</td>
            {/if}
            {#if column.competition !== undefined}
              <td>{column.competition}</td>
            {/if}
            <td>{column.matches}</td>
            <td>{column.wins}</td>
            <td>{column.draws}</td>
            <td>{column.losses}</td>
            <td>{column.goals_scored}</td>
            <td>{column.goals_conceded}</td>
            <td>{column.goals_scored - column.goals_conceded}</td>
            <td>{column.yellow_cards}</td>
            <td>{column.red_cards}</td>
            <td>{Number(column.average).toFixed(1)}</td>
          </tr>
        {/each}
        <tr id="total-row">
          <td class="total">TOTAL</td>
          {#if history[0].team !== undefined}
            <td />
          {/if}
          {#if history[0].competition !== undefined}
            <td />
          {/if}
          <td class="total">{totalHistory.matches}</td>
          <td class="total">{totalHistory.wins}</td>
          <td class="total">{totalHistory.draws}</td>
          <td class="total">{totalHistory.losses}</td>
          <td class="total">{totalHistory.goals_scored}</td>
          <td class="total">{totalHistory.goals_conceded}</td>
          <td class="total"
            >{totalHistory.goals_scored - totalHistory.goals_conceded}</td
          >
          <td class="total">{totalHistory.yellow_cards}</td>
          <td class="total">{totalHistory.red_cards}</td>
          <td class="total">{Number(totalHistory.average).toFixed(1)}</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<style>
  #groups {
    justify-content: flex-end;
    align-items: center;
    display: flex;
    padding: 0 0 1rem 0;
    gap: 2%;
  }

  table {
    color: var(--main-color);
    font-family: var(--main-font);
    font-size: clamp(0.75rem, 2vw, 1.25rem);
    border-collapse: collapse;
    white-space: nowrap;
  }
  
  #group-heading,
  label {
    color: var(--main-color);
    font-family: var(--main-font);
    font-size: clamp(0.75rem, 1.5vw, 1rem);
    margin: 0;
  }

  table {
    width: 100%;
    text-align: center;
  }

  #table {
    max-width: 100%;
    overflow-x: auto;
  }

  th {
    text-transform: uppercase;
    background-color: var(--main-color);
    color: var(--background-color);
  }

  th,
  td {
    padding: 0.25rem;
  }

  tr:nth-last-of-type(2n) {
    background-color: var(--table-background);
  }

  #total-row {
    background-color: black;
  }

  .total {
    font-weight: var(--bold);
  }
</style>
