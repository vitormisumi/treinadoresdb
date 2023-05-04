<script>
  export let h2h;
  export let coachInfo1;
  export let coachInfo2;

  let width = 60;
  let coach1Color = "rgb(0, 100, 0)";
  let hoverCoach1Color = "rgb(0, 300, 0)";
  let drawColor = "rgb(100, 100, 100)";
  let hoverDrawColor = "rgb(300, 300, 300)";
  let coach2Color = "rgb(100, 0, 0)";
  let hoverCoach2Color = "rgb(300, 0, 0)";

  $: coach1Percent =
    h2h.coach1_wins /
    (Number(h2h.coach1_wins) + Number(h2h.draws) + Number(h2h.coach2_wins));
  $: drawPercent =
    h2h.draws /
    (Number(h2h.coach1_wins) + Number(h2h.draws) + Number(h2h.coach2_wins));
  $: radius = width / 2;
  $: halfCircumference = Math.PI * radius;
  $: coach1PieSize = halfCircumference * coach1Percent;
  $: drawPieSize = halfCircumference * (coach1Percent + drawPercent);
  $: coach1dashArray = `0 ${
    halfCircumference - coach1PieSize
  } ${coach1PieSize}`;
  $: drawDashArray = `0 ${halfCircumference - drawPieSize} ${drawPieSize}`;

  let hoveredData1;
  let hoveredData2;
  let hoveredData3;
</script>

<svg {width} height={width}>
  <circle
    r={radius / 1.21}
    cx={radius}
    cy={radius}
    fill={hoveredData1 ? hoverCoach2Color : coach2Color}
    on:mouseenter={() => {
      hoveredData1 = h2h.coach2_wins;
    }}
    on:mouseleave={() => {
      hoveredData1 = null;
    }}
  />
  <circle
    r={radius / 2}
    cx={radius}
    cy={radius}
    stroke={hoveredData2 ? hoverDrawColor : drawColor}
    stroke-width={radius / 1.5}
    stroke-dasharray={drawDashArray}
    transform="rotate(-90) translate(-{width})"
    on:mouseenter={() => {
      hoveredData2 = h2h.draws;
    }}
    on:mouseleave={() => {
      hoveredData2 = null;
    }}
  />
  <circle
    r={radius / 2}
    cx={radius}
    cy={radius}
    stroke={hoveredData3 ? hoverCoach1Color : coach1Color}
    stroke-width={radius / 1.5}
    stroke-dasharray={coach1dashArray}
    transform="rotate(-90) translate(-{width})"
    on:mouseenter={() => {
      hoveredData3 = h2h.coach1_wins;
    }}
    on:mouseleave={() => {
      hoveredData3 = null;
    }}
  />
  <circle
    r={radius / 2}
    cx={radius}
    cy={radius}
    fill="var(--background-color)"
  />
</svg>
{#if hoveredData1}
  {#if coachInfo2.nickname !== null}
    <p class="tooltip red">
      Vitórias<br />{coachInfo2.nickname}:<br />{hoveredData1}
    </p>
  {:else}
    <p class="tooltip red">
      Vitórias<br />{coachInfo2.name}:<br />{hoveredData1}
    </p>
  {/if}
{:else if hoveredData2}
  <p class="tooltip grey">Empates:<br />{hoveredData2}</p>
{:else if hoveredData3}
  {#if coachInfo1.nickname !== null}
    <p class="tooltip green">
      Vitórias<br />{coachInfo1.nickname}:<br />{hoveredData3}
    </p>
  {:else}
    <p class="tooltip green">
      Vitórias<br />{coachInfo1.name}:<br />{hoveredData3}
    </p>
  {/if}
{/if}

<style>
  circle {
    transition: stroke 500ms ease, stroke-dasharray 500ms ease;
  }

  circle:hover {
    cursor: pointer;
  }

  circle:focus {
    outline: none;
  }

  .tooltip {
    position: absolute;
    font-size: clamp(0.75rem, 1vw, 1rem);
    color: var(--background-color);
    text-align: center;
    padding: 3px;
    border-radius: 0.25vw;
  }

  .green {
    background-color: rgb(0, 300, 0);
  }

  .grey {
    background-color: rgb(300, 300, 300);
  }

  .red {
    background-color: rgb(300, 0, 0);
  }
</style>
