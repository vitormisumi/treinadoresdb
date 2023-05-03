<script>
  import Table from "./Table.svelte";
  import Filters from "./Filters.svelte";

  export let data;
</script>

<section id="ranking">
  <h2>Rankings</h2>
  <div id="filters">
    <Filters mostRecentYear={data.mostRecentYear} />
  </div>
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
</section>

<style>
  @media (min-width: 768px) {
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
      display: grid;
      grid-template-rows: 0fr;
    }
  }
</style>
