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
  }
</script>

<section id="history">
  <h2>Histórico</h2>
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
</section>

<style>
  table,
  label,
  p {
    color: var(--main-color);
  }
</style>
