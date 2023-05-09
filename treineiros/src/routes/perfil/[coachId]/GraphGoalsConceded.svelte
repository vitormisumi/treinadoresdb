<script>
  export let goalsConcededDistribution;
  export let goalsConcededAvg;
  export let coach;

  const highestCount = goalsConcededDistribution.reduce((previous, current) => {
    return current.count > previous.count ? current : previous;
  });

  const lowestBin = goalsConcededDistribution.reduce((previous, current) => {
    return current.bins < previous.bins ? current : previous;
  });

  const highestBin = goalsConcededDistribution.reduce((previous, current) => {
    return current.bins > previous.bins ? current : previous;
  });

  const binSize = 0.1;

  let width;
  let height = 450;

  $: barWidth = width / ((highestBin.bins - lowestBin.bins) / binSize + 1);

  function y(count) {
    return (count * height) / highestCount.count;
  }

  $: coachBar =
    ((Number(goalsConcededAvg) - Number(lowestBin.bins)) *
      ((((highestBin.bins - lowestBin.bins) / binSize + 1 - 1) * width) /
        ((highestBin.bins - lowestBin.bins) / binSize + 1))) /
    (Number(highestBin.bins) - Number(lowestBin.bins));

  let hoveredData;
  let hoverCoach;

  let mousePosition = { x: 0, y: 0 };
</script>

<div
  bind:clientWidth={width}
  class="graph"
  on:mousemove={(e) => (mousePosition = { x: e.pageX, y: e.pageY })}
>
  <svg {width} {height}>
    {#each goalsConcededDistribution as { bins, count }, i}
      <g class="bars">
        <rect
          x={((bins - lowestBin.bins) / binSize) * barWidth}
          y={height - y(count)}
          width={barWidth}
          height={y(count)}
          class="bar"
          on:mouseenter={() => {
            hoveredData = { bins: Number(bins), count: Number(count) };
          }}
          on:mouseleave={() => {
            hoveredData = null;
          }}
        />
      </g>
    {/each}
    <rect
      x={coachBar - 5}
      y="0"
      width="10"
      {height}
      class="coach"
      on:mouseenter={() => {
        if (coach.nickname !== null) {
          hoverCoach = coach.nickname;
        } else {
          hoverCoach = coach.name;
        }
      }}
      on:mouseleave={() => {
        hoverCoach = null;
      }}
    />
    {#each { length: highestBin.bins / binSize + 1 } as _, i}
      {#if i * binSize > lowestBin.bins + 1}
        <g class="ticks">
          <line
            x1={((i * binSize - lowestBin.bins) / binSize) * barWidth}
            x2={((i * binSize - lowestBin.bins) / binSize) * barWidth}
            y1={height}
            y2={height - 5}
            class="ticks"
          />
        </g>
        <text
          x={((i * binSize - lowestBin.bins) / binSize) * barWidth}
          y={height - 10}
          text-anchor="middle"
          class="tick-labels">{(i * binSize).toFixed(1)}</text
        >
      {/if}
    {/each}
    <text
      x="0"
      y="0"
      class="y-axis-label"
      text-anchor="end"
      alignment-baseline="before-edge"># de treinadores</text
    >
    <line x1="0" x2={width} y1={height} y2={height} class="axis" />
  </svg>
  <p class="x-axis-title">Gols Sofridos/Partida</p>
</div>
{#if hoveredData}
  {#if hoveredData.count === 1}
    <div
      class="tooltip main"
      style="top: {mousePosition.y}px; left: {mousePosition.x}px;"
    >
      <b>{hoveredData.count}</b> treinador<br />tem entre {hoveredData.bins.toFixed(
        1
      )} e {(hoveredData.bins + 0.1).toFixed(1)}<br />gols sofridos/partida
    </div>
  {:else}
    <div
      class="tooltip main"
      style="top: {mousePosition.y}px; left: {mousePosition.x}px;"
    >
      <b>{hoveredData.count}</b> treinadores<br />tem entre {hoveredData.bins.toFixed(
        1
      )} e {(hoveredData.bins + 0.1).toFixed(1)}<br />gols sofridos/partida
    </div>
  {/if}
{/if}
{#if hoverCoach}
  <div
    class="tooltip accent"
    style="top: {mousePosition.y}px; left: {mousePosition.x}px;"
  >
    {hoverCoach}:<br /><b>{goalsConcededAvg}</b> gols sofridos/partida
  </div>
{/if}

<style>
  .tick-labels,
  .y-axis-label,
  .x-axis-title {
    font-family: var(--main-font);
    font-size: clamp(0.75rem, 1.5vw, 1.5rem);
    fill: var(--main-color);
  }

  .bar {
    fill: var(--table-background);
  }

  .axis,
  .ticks {
    stroke: var(--main-color);
  }

  .y-axis-label {
    transform: rotate(-90deg);
  }

  .bar:hover,
  .coach:hover {
    transition: all 500ms ease-in-out;
    cursor: pointer;
  }

  .bar:hover {
    fill: var(--table-accent);
  }

  .coach {
    fill: var(--accent-color);
  }

  .x-axis-title {
    color: var(--main-color);
    margin: 0;
    text-align: center;
  }

  .tooltip {
    font-family: var(--main-font);
    text-align: center;
    border: 1px solid var(--background-color);
    border-radius: 0.5vw;
    padding: 0.5rem;
    position: absolute;
    pointer-events: none;
    transition: all 500ms ease-in-out;
  }

  .main {
    background-color: var(--main-color);
    color: var(--background-color);
  }

  .accent {
    background-color: var(--accent-color);
    color: var(--main-color);
  }
</style>
