import React from 'react';
import Counter from '../components/Counter';
import MoodSlider from '../components/MoodSlider';

function Feature1() {
  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem', background: 'rgba(255, 255, 255, 0.9)', borderRadius: '15px', boxShadow: '0 0 15px rgba(100, 80, 150, 0.3)' }}>
      <h2 style={{ color: '#6a4f9c', fontWeight: '600', marginBottom: '1rem' }}>
        💜 Feature 1: Miss Counter & Mood Slider 💜
      </h2>
      <Counter />
      <MoodSlider />
    </div>
  );
}

export default Feature1;
