import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // adjust path as needed
import '../styles/Counter.css';
// (rest remains the same, remove inline styles)

function Counter() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const counterDocRef = doc(db, 'loveCounter', 'missed'); // collection: loveCounter, doc: missed

  useEffect(() => {
    const fetchCount = async () => {
      const docSnap = await getDoc(counterDocRef);
      if (docSnap.exists()) {
        setCount(docSnap.data().count || 0);
      } else {
        await setDoc(counterDocRef, { count: 0 }); // initialize
      }
      setLoading(false);
    };

    fetchCount();
  }, []);

  const incrementCount = async () => {
    const newCount = count + 1;
    setCount(newCount);
    await updateDoc(counterDocRef, { count: newCount });
  };

  const resetCount = async () => {
    setCount(0);
    await updateDoc(counterDocRef, { count: 0 });
  };

  if (loading) return <p>Loading counter...</p>;

  return (
    <div className="counter" style={{ textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
      <h2>Missed me how many times today? 🤠</h2>
      <p>I missed you <strong>{count}</strong> times!</p>
      <button
        onClick={incrementCount}
        style={{
          padding: '0.6rem 1.2rem',
          marginRight: '0.8rem',
          backgroundColor: '#e91e63',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Miss You 😚
      </button>
      <button
        onClick={resetCount}
        style={{
          padding: '0.6rem 1.2rem',
          backgroundColor: '#fce4ec',
          color: '#880e4f',
          border: '1px solid #e91e63',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        I don’t now 🫥
      </button>
    </div>
  );
}

export default Counter;
