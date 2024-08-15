import { writable, derived } from "svelte/store";
import { StarStream } from "@star-stream/core";

export function useStarStream(k: number, targetRange: [number, number], reAlignCount: number) {
  const StarBuilder = StarStream(k, targetRange, reAlignCount);
  const builder = new StarBuilder();

  const starStream = writable({
    stars: builder.stars,
    mean: builder.mean,
    stdDev: builder.stdDev,
    addStar: (value: number) => {
      builder.addStar(value);
      starStream.update((store) => ({
        stars: builder.stars.slice(),
        mean: builder.mean,
        stdDev: builder.stdDev,
        addStar: store.addStar,
        removeStar: store.removeStar,
        reAlignStar: store.reAlignStar,
      }));
    },
    removeStar: (index: number) => {
      builder.removeStar(index);
      starStream.update((store) => ({
        stars: builder.stars.slice(),
        mean: builder.mean,
        stdDev: builder.stdDev,
        addStar: store.addStar,
        removeStar: store.removeStar,
        reAlignStar: store.reAlignStar,
      }));
    },
    reAlignStar: (ratings: number[]) => {
      builder.reAlignStar(ratings);
      starStream.update((store) => ({
        stars: builder.stars.slice(),
        mean: builder.mean,
        stdDev: builder.stdDev,
        addStar: store.addStar,
        removeStar: store.removeStar,
        reAlignStar: store.reAlignStar,
      }));
    },
  });

  const stars = derived(starStream, ($starStream) => $starStream.stars);
  const mean = derived(starStream, ($starStream) => $starStream.mean);
  const stdDev = derived(starStream, ($starStream) => $starStream.stdDev);

  return {
    stars,
    mean,
    stdDev,
    addStar: (value: number) =>
      starStream.update((store) => {
        store.addStar(value);
        return store;
      }),
    removeStar: (index: number) =>
      starStream.update((store) => {
        store.removeStar(index);
        return store;
      }),
    reAlignStar: (ratings: number[]) =>
      starStream.update((store) => {
        store.reAlignStar(ratings);
        return store;
      }),
  };
}
