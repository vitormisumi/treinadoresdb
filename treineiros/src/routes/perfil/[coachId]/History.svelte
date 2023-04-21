<script>
  export let history;

  let filters = [];
  const filtersMenu = ["year", "team", "competition"];

  const groupBy = (arr, keys) => {
    return arr.reduce((storage, item) => {
      const objKey = keys.map((key) => `${item[key]}`).join(":");
      if (storage[objKey]) {
        storage[objKey].push(item);
      } else {
        storage[objKey] = [item];
      }
      console.log(storage);
      return storage;
    }, {});
  };
</script>

<section id="history">
  <h2>Histórico</h2>
  <div id="filters">
    <p>Agrupar por:</p>
    {#each filtersMenu as filter}
      <label>
        <input
          type="checkbox"
          bind:group={filters}
          name="filters"
          value={filter}
        />
        {filter}
      </label>
    {/each}
    <p>{filters}</p>
  </div>
  <div id="table">
    <table>
      <thead>
        <tr>
          <th>Ano</th>
          <th>Campeonato</th>
          <th>Clube</th>
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
        {#each history as data}
          <tr>
            <td>{data.year}</td>
            <td>{data.competition}</td>
            <td>{data.team}</td>
            <td>{data.matches}</td>
            <td>{data.wins}</td>
            <td>{data.draws}</td>
            <td>{data.losses}</td>
            <td>{data.goals_scored}</td>
            <td>{data.goals_conceded}</td>
            <td>{data.goals_scored - data.goals_conceded}</td>
            <td>{data.yellow_cards}</td>
            <td>{data.red_cards}</td>
            <td>{Number(data.average).toFixed(1)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>

<style>
  #filters {
    justify-content: flex-end;
    align-items: center;
    display: flex;
    padding: 0 0 2rem 0;
    gap: 2%;
  }

  table,
  label,
  p {
    color: var(--main-color);
    font-family: var(--main-font);
    font-size: clamp(0.75rem, 2vw, 1.25rem);
    border-collapse: collapse;
    white-space: nowrap;
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
</style>
