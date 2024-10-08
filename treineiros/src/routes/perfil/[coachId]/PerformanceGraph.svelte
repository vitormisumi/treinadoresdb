<script>
  export let distribution;
  export let coachData;
  export let coach;
  export let binSize;
  export let xLabel;
  export let decimals;
  export let help;

  let highestCount = distribution.reduce((previous, current) => {
    return current.count > previous.count ? current : previous;
  });
  highestCount = highestCount.count;

  let lowestBin = distribution.reduce((previous, current) => {
    return Number(current.bins) < Number(previous.bins) ? current : previous;
  });
  lowestBin = Number(lowestBin.bins);

  let highestBin = distribution.reduce((previous, current) => {
    return Number(current.bins) > Number(previous.bins) ? current : previous;
  });
  highestBin = Number(highestBin.bins);

  let width;
  let height = 450;

  $: barWidth = width / ((highestBin - lowestBin) / binSize + 1);

  function y(count) {
    return (count * height) / highestCount;
  }

  $: coachBar =
    ((Number(coachData) - lowestBin) *
      ((((highestBin - lowestBin) / binSize) * width) /
        ((highestBin - lowestBin) / binSize + 1))) /
    (highestBin - lowestBin);

  let hoverBar;
  let hoverCoach;
  let hoverHelp = null;

  let mousePosition = { x: 0, y: 0 };
  let helpWidth;
</script>

<div
  bind:clientWidth={width}
  class="graph"
  on:mousemove={(e) => (mousePosition = { x: e.pageX, y: e.pageY })}
>
  <svg {width} {height}>
    {#each distribution as { bins, count }, i}
      <g class="bars">
        <rect
          x={((bins - lowestBin) / binSize) * barWidth}
          y={height - y(count)}
          width={barWidth}
          height={y(count)}
          class="bar"
          on:mouseenter={() => {
            hoverBar = { bins: Number(bins), count: Number(count) };
          }}
          on:mouseleave={() => {
            hoverBar = null;
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
    {#each { length: Math.round((highestBin - lowestBin) / binSize) } as _, i}
      <g class="ticks">
        <line
          x1={(i + 1) * barWidth}
          x2={(i + 1) * barWidth}
          y1={height}
          y2={height - 5}
          class="ticks"
        />
      </g>
      <text
        x={(i + 1) * barWidth}
        y={height - 10}
        text-anchor="middle"
        class="tick-labels"
        >{(lowestBin + (i + 1) * binSize).toFixed(decimals)}</text
      >
    {/each}
    <text
      x="0"
      y="0"
      class="y-axis-label"
      text-anchor="end"
      alignment-baseline="before-edge"># de treinadores</text
    >
    <text
      x={width - 6}
      y="1"
      class="help"
      text-anchor="end"
      alignment-baseline="before-edge">?</text
    >
    <circle
      cx={width - 10}
      cy="10"
      r="9"
      class="help-circle"
      on:mouseenter={() => {
        if (coach.nickname !== null) {
          hoverHelp = coach.nickname;
        } else {
          hoverHelp = coach.name;
        }
      }}
      on:mouseleave={() => {
        hoverHelp = null;
      }}
    />
    <line x1="0" x2={width} y1={height} y2={height} class="axis" />
  </svg>
  <p class="x-axis-title title main-color">{xLabel}</p>
</div>
{#if hoverBar}
  {#if hoverBar.count === 1}
    <div
      class="tooltip main"
      style="top: {mousePosition.y}px; left: {mousePosition.x}px;"
    >
      <b>{hoverBar.count}</b> treinador<br />tem entre {hoverBar.bins.toFixed(
        decimals
      )} e {(hoverBar.bins + binSize).toFixed(decimals)}<br />{xLabel}
    </div>
  {:else}
    <div
      class="tooltip main"
      style="top: {mousePosition.y}px; left: {mousePosition.x}px;"
    >
      <b>{hoverBar.count}</b> treinadores<br />tem entre {hoverBar.bins.toFixed(
        decimals
      )} e {(hoverBar.bins + binSize).toFixed(decimals)}<br />{xLabel}
    </div>
  {/if}
{/if}
{#if hoverCoach}
  <div
    class="tooltip accent main-color"
    style="top: {mousePosition.y}px; left: {mousePosition.x}px;"
  >
    {hoverCoach}:<br /><b>{coachData}</b>
    {xLabel}
  </div>
{/if}
{#if hoverHelp}
  <div
    bind:offsetWidth={helpWidth}
    class="tooltip main main-color help-tooltip"
    style="top: {mousePosition.y}px; left: {mousePosition.x - helpWidth}px;"
  >
    <b>O que esse gráfico mostra?</b><br />
    Esse gráfico apresenta a distribuição de {xLabel} entre todos os treinadores
    com pelo menos 50 partidas disputadas. A barra vermelha representa o posicionamento
    de {hoverHelp} em relação a essa distribuição.<br />
    {help}
  </div>
{/if}

<style>
  .tick-labels,
  .y-axis-label,
  .x-axis-title {
    font-family: var(--main-font);
    font-size: clamp(0.6rem, 1.5vw, 1.5rem);
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
  .coach:hover,
  .help-circle:hover {
    transition: all 500ms ease-in-out;
    cursor: pointer;
  }

  .bar:hover {
    fill: var(--table-accent);
  }

  .coach {
    fill: var(--accent-color);
  }

  .title {
    text-transform: capitalize;
  }

  .x-axis-title {
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

  .help-tooltip {
    width: 200px;
    text-align: left;
  }

  .main {
    background-color: var(--main-color);
    color: var(--background-color);
  }

  .accent {
    background-color: var(--accent-color);
  }

  .help {
    fill: var(--main-color);
    font-family: var(--main-font);
  }

  .help-circle {
    fill: transparent;
    stroke: var(--main-color);
  }
</style>
