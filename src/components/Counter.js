import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h2>Thara missed me how many times tday? :D</h2>
      <p>Aadi i missed you <strong>{count}</strong> times!</p>
      <button onClick={() => setCount(count + 1)}>Miss You 💌</button>
      <button onClick={() => setCount(0)}>Reset 🔄</button>
    </div>
  );
}

export default Counter;
