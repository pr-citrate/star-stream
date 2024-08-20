import React from 'react';
import './App.css';
import StarChart from './StarChart';
import { useStarStream } from '@star-stream/core';

function App() {
  const {
    stars,
    mean,
    stdDev,
    addStar,
    removeStar,
    reAlignStar,
  } = useStarStream(100, [0, 100]);

  return (
    <div className="App">
      <h1>Star Stream Example</h1>
      <StarChart stars={stars} />
      <div>
        <button onClick={() => addStar(Math.random() * 100)}>Add Star</button>
        <button onClick={() => removeStar(stars.length - 1)}>Remove Star</button>
        <button onClick={() => reAlignStar([50, 75])}>Re-align Stars</button>
      </div>
      <div>
        <p>Mean: {mean}</p>
        <p>Standard Deviation: {stdDev}</p>
      </div>
    </div>
  );
}

export default App;
