<script>
  import { indicator } from "$lib/stores/indicator";
  import fallback from "$lib/assets/images/defaultCoach.png";

  const handleError = (ev) => (ev.target.src = fallback);

  export let mostMatches;
  export let mostGoalsScored;
  export let mostGoalsConceded;
  export let mostYellowCards;
  export let mostRedCards;
  export let bestPointPercentage;

  let tableData;
  $: if ($indicator === "Partidas") {
    tableData = mostMatches;
  } else if ($indicator === "Gols Feitos") {
    tableData = mostGoalsScored;
  } else if ($indicator === "Gols Sofridos") {
    tableData = mostGoalsConceded;
  } else if ($indicator === "Cartões Amarelos") {
    tableData = mostYellowCards;
  } else if ($indicator === "Cartões Vermelhos") {
    tableData = mostRedCards;
  } else if ($indicator === "Aproveitamento (%)") {
    tableData = bestPointPercentage;
  }
</script>

<table id="ranking-table">
  <colgroup>
    <col id="col1" />
    <col id="col2" />
    <col id="col3" />
    <col id="col4" />
  </colgroup>
  <tbody>
    {#each tableData as coach, i}
      <tr>
        <td class="position-column">{i + 1}º</td>
        <td class="img-column"
          ><img
            src={`/coaches/${coach.id}.png`}
            alt={coach.name}
            class="coach-img"
            on:error={handleError}
          /></td
        >
        {#if coach.nickname === null}
          <td class="coach-column"
            ><a href="/perfil/{coach.id}">{coach.name}</a></td
          >
        {:else}
          <td class="coach-column"
            ><a href="/perfil/{coach.id}">{coach.nickname}</a></td
          >
        {/if}
        <td class="value-column">{coach.value}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  #ranking-table {
    font-family: var(--main-font);
    font-size: clamp(1rem, 4vw, 2.5rem);
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
  }

  #ranking-table tr:first-child td {
    border-radius: 1vw 1vw 0 0;
  }

  #ranking-table tr:last-child td {
    border-radius: 0 0 1vw 1vw;
    border: 0;
  }

  td {
    height: clamp(30px, 6vh, 60px);
    border: 1px solid;
    border-color: transparent transparent #e5e5e525;
    text-align: center;
    padding: 0;
    height: clamp(40px, 8vw, 70px);
  }
  
  .coach-column {
    padding-left: 1vw;
    text-align: left;
  }

  a {
    color: var(--main-color);
  }

  #col1,
  #col2,
  #col4 {
    width: clamp(35px, 8vw, 80px);
  }

  #col3 {
    width: auto;
  }

  .position-column {
    color: var(--main-color);
  }

  .coach-column {
    color: var(--main-color);
    background-color: var(--table-background);
  }

  .value-column {
    text-align: right;
    color: var(--accent-color);
  }

  .coach-img {
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
</style>
