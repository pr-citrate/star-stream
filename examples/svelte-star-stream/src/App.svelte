<script lang="ts">
  import { onMount } from 'svelte';
  import { useStarStream } from '@star-stream/core';
  import Graph from './Graph.svelte';

  let stars: number[] = [];
  let mean: number;
  let stdDev: number;

  const { addStar, removeStar, reAlignStar } = useStarStream(100, [0, 100]);

  const updateStars = () => {
    stars = useStarStream(100, [0, 100]).stars;
    mean = useStarStream(100, [0, 100]).mean;
    stdDev = useStarStream(100, [0, 100]).stdDev;
  };

  onMount(() => {
    updateStars();
  });

  const handleAddStar = () => {
    addStar(Math.random() * 100);
    updateStars();
  };

  const handleRemoveStar = () => {
    removeStar(stars.length - 1);
    updateStars();
  };

  const handleReAlignStars = () => {
    reAlignStar([50, 75]);
    updateStars();
  };
</script>

<style>
  @import './app.css';
</style>

<main>
  <h1>Star Stream Example</h1>
  <Graph {stars} />
  <div>
    <button on:click={handleAddStar}>Add Star</button>
    <button on:click={handleRemoveStar}>Remove Star</button>
    <button on:click={handleReAlignStars}>Re-align Stars</button>
  </div>
  <div>
    <p>Mean: {mean}</p>
    <p>Standard Deviation: {stdDev}</p>
  </div>
</main>
