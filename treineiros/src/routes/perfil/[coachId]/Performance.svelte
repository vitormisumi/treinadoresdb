<script>
  export let goalsScoredDistribution;
  export let goalsScoredAvg;
  export let coach;

  const highestCount = goalsScoredDistribution.reduce((previous, current) => {
    return current.count > previous.count ? current : previous;
  });

  const lowestBin = goalsScoredDistribution.reduce((previous, current) => {
    return current.bins < previous.bins ? current : previous;
  });

  const highestBin = goalsScoredDistribution.reduce((previous, current) => {
    return current.bins > previous.bins ? current : previous;
  });

  let width;
  let height = 450;

  $: barWidth = width / goalsScoredDistribution.length;
  function y(count) {
    return (count * height) / highestCount.count;
  }

  $: coachBar =
    ((Number(goalsScoredAvg) - Number(lowestBin.bins)) * width) /
    (Number(highestBin.bins) - Number(lowestBin.bins));
</script>

<section id="performance">
  <h2>Desempenho</h2>
  <div bind:clientWidth={width} class="graph">
    <svg {width} {height}>
      {#each goalsScoredDistribution as { bins, count }, i}
        <g class="bars">
          <rect
            x={i * barWidth}
            y={height - y(count)}
            width={barWidth}
            height={y(count)}
            class="bar"
          />
        </g>
      {/each}
      <rect x={coachBar - 5} y="0" width="10" {height} class="coach" />
      {#each goalsScoredDistribution as { bins, count }, i}
        <g class="ticks">
          <line
            x1={i * barWidth}
            x2={i * barWidth}
            y1={height}
            y2={height - 5}
            class="ticks"
          />
        </g>
        <text
          x={i * barWidth}
          y={height - 10}
          text-anchor="middle"
          class="tick-labels">{bins}</text
        >
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
    <p class="x-axis-title">Gols Feitos/Partida</p>
  </div>
</section>

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
    fill: var(--main-color);
    transition: all 500ms ease;
  }

  .coach {
    fill: var(--accent-color);
  }

  .x-axis-title {
    color: var(--main-color);
    margin: 0;
    text-align: center;
  }
</style>
