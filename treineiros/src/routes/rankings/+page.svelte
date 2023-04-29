<script>
  import Table from "./Table.svelte";
  import Filters from "./Filters.svelte";

  export let data;
</script>

<section id="ranking">
  <h2>Rankings</h2>
  <div id="table">
    <Table
      mostMatches={data.mostMatches}
      mostGoalsScored={data.mostGoalsScored}
      mostGoalsConceded={data.mostGoalsConceded}
      mostYellowCards={data.mostYellowCards}
      mostRedCards={data.mostRedCards}
      bestPointPercentage={data.bestPointPercentage}
    />
  </div>
  <div id="filters">
    <Filters mostRecentYear={data.mostRecentYear} />
  </div>
</section>

<style>
  #ranking {
    display: grid;
    grid-template-columns: 8fr 2fr;
    grid-template-rows: auto;
    grid-template-areas:
      "title title"
      "table filters";
    gap: 1.5vw;
  }

  h2 {
    grid-area: title;
  }

  #table {
    grid-area: table;
  }

  #filters {
    grid-area: filters;
  }
</style>
