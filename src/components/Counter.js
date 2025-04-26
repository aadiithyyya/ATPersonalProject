import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(() => {
    // Retrieve from localStorage if available
    const savedCount = localStorage.getItem('missedCount');
    return savedCount ? JSON.parse(savedCount) : 0;
  });

  useEffect(() => {
    // Save the count to localStorage whenever it changes
    localStorage.setItem('missedCount', JSON.stringify(count));
  }, [count]);

  return (
    <div className="counter">
      <h2>Thara missed me how many times today? :D</h2>
      <p>Aadi, I missed you <strong>{count}</strong> times!</p>
      <button onClick={() => setCount(count + 1)}>Miss You 💌</button>
      <button onClick={() => setCount(0)}>Reset 🔄</button>
    </div>
  );
}

export default Counter;
