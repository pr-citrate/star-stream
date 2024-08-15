<script lang="ts">
  import { onMount } from 'svelte';
  import { StarStream } from '@star-stream/core';
  import Graph from './Graph.svelte';

  let starStream: any;
  let stars: number[] = [];
  let sum: number = 0;
  let mean: number = 0;
  let stdDev: number = 0;

  onMount(() => {
      starStream = StarStream(1, [0, 10]);
      starStream = new starStream();

      stars = starStream.stars;
      sum = starStream.sum;
      mean = starStream.mean;
      stdDev = starStream.stdDev;
  });

  function addStar(i: number) {
      if (i >= 0) {
          starStream.addStar(i);
          count=i;
          updateStats();
      }
  }

  function updateStats() {
      stars = starStream.stars;
      sum = starStream.sum;
      mean = starStream.mean;
      stdDev = starStream.stdDev;
  }

  let count: number = 0;
</script>

<style>
  .container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      flex-direction: column;

  }
</style>

<div class="container">
  <div style="display: flex; cursor: pointer;">
    {#each Array(5) as _, i}
      <div
        style="color: {i < count ? '#ffd700' : '#ccc'}; font-size: 24px;" on:click={() => addStar(i+1)}
      >
        ★
      </div>
    {/each}
  </div>

  <div>
      <p>Total Sum : {sum}</p>
      <p>Mean : {mean.toFixed(2)}</p>
      <p>stdDev : {stdDev.toFixed(2)}</p>
  </div>

  <Graph {stars} {mean} {stdDev} />
</div>
