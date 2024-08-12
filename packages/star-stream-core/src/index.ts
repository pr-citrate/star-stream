import { mean, zScore } from "../utils/statistics";

type range = [number, number];

export function StarStream(k: number, targetRange: range) {
    return class Star {
        private readonly _k: number;
        private readonly _range: range;

        constructor() {
            this._k = k;
            this._range = targetRange;
        }

        public readStar(ratings: number[], value: number): number {
            const z = zScore(ratings, value);
            const t = z * this._k + mean(this._range);
            return this.restrictValue(t);
        }

        private restrictValue(value: number): number {
            return value > this._range[1] ? this._range[1] : value < this._range[0] ? this._range[0] : value;
        }
    };
}

export type StarMaker = ReturnType<typeof StarStream>;