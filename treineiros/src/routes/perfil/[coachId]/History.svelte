<script>
  import { goto } from "$app/navigation";
  import { profileHistoryGroups } from "$lib/stores/filters";

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

  const handleGroupChange = () => {
    goto(`?groups=${$profileHistoryGroups}`, {
      noScroll: true,
    });
  };
</script>

<section id="history">
  <h2>Histórico</h2>
  <form>
    <div id="groups">
      <p class="group main-color">Agrupar por:</p>
      {#each groupMenu as group}
        <label>
          <input
            type="checkbox"
            bind:group={$profileHistoryGroups}
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
    <table class="table main-color">
      <thead>
        <tr>
          <th class="headers">Ano</th>
          {#if history[0].team !== undefined}
            <th class="headers">Clube</th>
          {/if}
          {#if history[0].competition !== undefined}
            <th class="headers">Campeonato</th>
          {/if}
          <th class="headers">P</th>
          <th class="headers">V</th>
          <th class="headers">E</th>
          <th class="headers">D</th>
          <th class="headers">GF</th>
          <th class="headers">GS</th>
          <th class="headers">SG</th>
          <th class="headers">CA</th>
          <th class="headers">CV</th>
          <th class="headers">%</th>
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

  .group {
    font-family: var(--main-font);
    font-size: clamp(0.75rem, 1.5vw, 1rem);
    font-weight: var(--bold);
    margin: 0;
  }

  tr:nth-last-of-type(2n) {
		background-color: var(--table-background);
	}

  #table {
    max-width: 100%;
    overflow-x: auto;
  }

  #total-row {
    background-color: black;
  }

  .total {
    font-weight: var(--bold);
  }
</style>
