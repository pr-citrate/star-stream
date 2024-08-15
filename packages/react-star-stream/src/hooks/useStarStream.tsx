import {useState, useCallback, useMemo} from 'react';
import {StarStream} from '@star-stream/core';
import type {range} from '@star-stream/core';

export default function useStarStream(k: number, targetRange: range, reAlignCount: number = 10) {
    const StarBuilder = StarStream(k, targetRange, reAlignCount);
    const [starBuilder] = useState(new StarBuilder());

    const [stars, setStars] = useState<number[]>(starBuilder.stars);

    const addStar = useCallback((value: number) => {
        starBuilder.addStar(value);
        setStars(starBuilder.stars.slice());
    }, [starBuilder]);

    const removeStar = useCallback((index: number) => {
        starBuilder.removeStar(index);
        setStars(starBuilder.stars.slice());
    }, [starBuilder]);

    const reAlignStar = useCallback((ratings: number[]) => {
        starBuilder.reAlignStar(ratings);
        setStars(starBuilder.stars.slice());
    }, [starBuilder]);

    const mean = useMemo(() => starBuilder.mean, [stars]);
    const stdDev = useMemo(() => starBuilder.stdDev, [stars]);

    return {
        stars,
        mean,
        stdDev,
        addStar,
        removeStar,
        reAlignStar,
    };
}