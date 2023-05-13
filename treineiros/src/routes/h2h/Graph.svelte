<script>
  export let h2h;
  export let coachInfo1;
  export let coachInfo2;

  let width = 60;
  const coach1Color = "rgb(100, 100, 0)";
  const hoverCoach1Color = "rgb(300, 300, 0)";
  const drawColor = "rgb(100, 100, 100)";
  const hoverDrawColor = "rgb(300, 300, 300)";
  const coach2Color = "rgb(0, 100, 100)";
  const hoverCoach2Color = "rgb(0, 300, 300)";

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

  let mousePosition = { x: 0, y: 0 };
</script>

<div
  bind:offsetWidth={width}
  class="graph"
  on:mousemove={(e) => (mousePosition = { x: e.pageX, y: e.pageY })}
>
  <svg {width} height={width}>
    <circle
      r={radius / 2}
      cx={radius}
      cy={radius}
      stroke={hoveredData1 ? hoverCoach2Color : coach2Color}
      stroke-width={radius / 1.5}
      stroke-dasharray="0"
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
</div>
{#if hoveredData1}
  {#if coachInfo2.nickname !== null}
    <div
      class="tooltip red"
      style="top: {mousePosition.y}px; left: {mousePosition.x}px;"
    >
      Vitórias<br />{coachInfo2.nickname}:<br />{hoveredData1}
    </div>
  {:else}
    <div
      class="tooltip red"
      style="top: {mousePosition.y}px; left: {mousePosition.x}px;"
    >
      Vitórias<br />{coachInfo2.name}:<br />{hoveredData1}
    </div>
  {/if}
{:else if hoveredData2}
  <div
    class="tooltip grey"
    style="top: {mousePosition.y}px; left: {mousePosition.x}px;"
  >
    Empates:<br />{hoveredData2}
  </div>
{:else if hoveredData3}
  {#if coachInfo1.nickname !== null}
    <div
      class="tooltip green"
      style="top: {mousePosition.y}px; left: {mousePosition.x}px;"
    >
      Vitórias<br />{coachInfo1.nickname}:<br />{hoveredData3}
    </div>
  {:else}
    <div
      class="tooltip green"
      style="top: {mousePosition.y}px; left: {mousePosition.x}px;"
    >
      Vitórias<br />{coachInfo1.name}:<br />{hoveredData3}
    </div>
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
    font-family: var(--main-font);
    font-size: clamp(0.75rem, 1vw, 1rem);
    color: var(--background-color);
    text-align: center;
    padding: 3px;
    border-radius: 0.25vw;
    pointer-events: none;
    transition: all 500ms ease-in-out;
  }

  .green {
    background-color: rgb(300, 300, 0);
  }

  .grey {
    background-color: rgb(300, 300, 300);
  }

  .red {
    background-color: rgb(0, 300, 300);
  }
</style>
