import React from 'react';
import Counter from '../components/Counter';
import MoodSlider from '../components/MoodSlider';
import '../styles/Feature1.css';

function Feature1() {
  return (
    <div className="feature1-container">
      <h2> Miss Counter & Mood Slider 🫶🏻</h2>
      <Counter />
      <MoodSlider />
    </div>
  );
}

export default Feature1;
