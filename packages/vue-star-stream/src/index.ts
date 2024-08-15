import { reactive, computed, toRefs } from 'vue';
import { StarStream } from '@star-stream/core';
import type { range } from '@star-stream/core';

export default function useStarStream(k: number, targetRange: range, reAlignCount: number = 10) {
    const StarBuilder = StarStream(k, targetRange, reAlignCount);
    const state = reactive({
        starBuilder: new StarBuilder(),
        stars: [] as number[],
    });

    state.stars = state.starBuilder.stars.slice();

    const addStar = (value: number) => {
        state.starBuilder.addStar(value);
        state.stars = state.starBuilder.stars.slice();
    };

    const removeStar = (index: number) => {
        state.starBuilder.removeStar(index);
        state.stars = state.starBuilder.stars.slice();
    };

    const reAlignStar = (ratings: number[]) => {
        state.starBuilder.reAlignStar(ratings);
        state.stars = state.starBuilder.stars.slice();
    };

    const mean = computed(() => state.starBuilder.mean);
    const stdDev = computed(() => state.starBuilder.stdDev);

    return {
        ...toRefs(state),
        mean,
        stdDev,
        addStar,
        removeStar,
        reAlignStar,
    };
}
