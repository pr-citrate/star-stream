export function sum(array: number[]): number {
    return array.reduce((a, b) => a + b, 0);
}

export function mean(array: number[]): number {
    return sum(array) / array.length;
}

export function dev(array: number[]): number[] {
    const m = mean(array);
    return array.map((a) => a - m);
}

export function stdDev(array: number[]): number {
    const d = dev(array);
    return Math.sqrt(sum(d.map((a) => a * a)) / array.length);
}

export function zScore(array: number[], value: number): number {
    return (value - mean(array)) / stdDev(array);
}