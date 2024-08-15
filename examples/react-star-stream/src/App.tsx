import React, { useState } from 'react';
import { StarStream } from '@star-stream/core';
import StarChart from './StarChart';
import './App.css';

const App: React.FC = () => {
    const [starStream] = useState(new StarStream(1, [0, 10]));
    const [newStar, setNewStar] = useState<number>(0);
    const [stars, setStars] = useState<number[]>(starStream.stars);
    const [sum, setSum] = useState<number>(starStream.sum);
    const [mean, setMean] = useState<number>(starStream.mean);
    const [stdDev, setStdDev] = useState<number>(starStream.stdDev);

    const addStar = () => {
        if (newStar >= 0) {
            starStream.addStar(newStar);
            updateStats();
        }
    };

    const removeStar = (index: number) => {
        starStream.removeStar(index);
        updateStats();
    };

    const updateStats = () => {
        setStars(starStream.stars);
        setSum(starStream.sum);
        setMean(starStream.mean);
        setStdDev(starStream.stdDev);
    };

    return (
        <div className="App">
            <h1>Star Rating System</h1>
            <input
                type="number"
                value={newStar}
                onChange={(e) => setNewStar(Number(e.target.value))}
                min="0"
                max="10"
            />
            <button onClick={addStar}>Add Star</button>

            <ul>
                {stars.map((star, index) => (
                    <li key={index}>
                        {star} <button onClick={() => removeStar(index)}>Remove</button>
                    </li>
                ))}
            </ul>

            <div>
                <p>Total Sum: {sum}</p>
                <p>Mean: {mean.toFixed(2)}</p>
                <p>Standard Deviation: {stdDev.toFixed(2)}</p>
            </div>

            <StarChart stars={stars} mean={mean} stdDev={stdDev} />
        </div>
    );
};

export default App;
