export type range = [number, number];

export function StarStream(k: number, targetRange: range, reAlignCount: number = 10) {
    return class StarBuilder {
        private readonly _k: number;
        private readonly _range: range;
        private readonly _reAlignCount: number;
        private _alignCount: number;

        private _sum: number;
        private _stars: number[];
        private _stdDev: number;

        constructor(stars: number[] = []) {
            this._k = k;
            this._range = targetRange;
            this._reAlignCount = reAlignCount;
            this._alignCount = 0;

            this._stars = stars;
            this._sum = stars.length > 0 ? stars.reduce((a, b) => a + b, 0) : 0;
            this._stdDev = stars.length > 1 ? Math.sqrt(stars.map((a) => (a - this.mean) ** 2).reduce((a, b) => a + b, 0) / stars.length) : 0;
        }

        public reAlignStar(ratings: number[]): void {
            this._stars = ratings;

            this._sum = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) : 0;
            this._stdDev = ratings.length > 1 ? Math.sqrt(ratings.map((a) => (a - this.mean) ** 2).reduce((a, b) => a + b, 0) / ratings.length) : 0;
        }

        public readStar(value: number): number {
            const z = this._zScore(value);
            const t = z * this._k + (this._range[1] + this._range[0]) / 2;
            return this._restrictValue(t);
        }

        public addStar(value: number): void {
            const prevMean = this.mean;
            const prevStdDev = this._stdDev;
            const n = this._stars.length;

            this._stars.push(value);
            this._sum += value;

            const postMean = this.mean;
            const currentVariance = n > 0 ? (n * (prevStdDev ** 2 + (prevMean - postMean) ** 2) + (value - postMean) ** 2) / (n + 1) : 0;
            this._stdDev = Math.sqrt(currentVariance);

            this.checkReAlign();
        }

        public removeStar(index: number): void {
            const value = this._stars[index];
            const prevMean = this.mean;
            const prevStdDev = this._stdDev;
            const n = this._stars.length;

            this._stars.splice(index, 1);
            this._sum -= value;

            if (n > 1) {
                const postMean = this.mean;
                const currentVariance = (n * (prevStdDev ** 2 + (prevMean - postMean) ** 2) - (value - postMean) ** 2) / (n - 1);
                this._stdDev = Math.sqrt(currentVariance);
            } else {
                this._stdDev = 0;
            }

            this.checkReAlign();
        }

        get stars(): number[] {
            return this._stars;
        }

        get sum(): number {
            return this._sum;
        }

        get stdDev(): number {
            return this._stdDev;
        }

        get mean(): number {
            return this._stars.length > 0 ? this._sum / this._stars.length : 0;
        }

        private _zScore(value: number): number {
            return this._stdDev > 0 ? (value - this.mean) / this._stdDev : 0;
        }

        private _restrictValue(value: number): number {
            return Math.max(this._range[0], Math.min(this._range[1], value));
        }

        private checkReAlign(): void {
            this._alignCount++;
            if (this._alignCount >= this._reAlignCount) {
                this.reAlignStar(this._stars);
                this._alignCount = 0;
            }
        }
    };
}
