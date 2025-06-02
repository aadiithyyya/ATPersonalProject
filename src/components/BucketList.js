import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot
} from 'firebase/firestore';

import '../styles/BucketList.css'; // import the new stylesheet

function BucketList() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  const bucketRef = collection(db, 'bucketList');

  useEffect(() => {
    const unsubscribe = onSnapshot(bucketRef, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(list);
    });

    return () => unsubscribe();
  }, []);

  const addItem = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    await addDoc(bucketRef, {
      text: trimmed,
      done: false,
      timestamp: Date.now()
    });

    setInput('');
  };

  const toggleDone = async (id, current) => {
    const itemRef = doc(db, 'bucketList', id);
    await updateDoc(itemRef, { done: !current });
  };

  const removeItem = async (id) => {
    const itemRef = doc(db, 'bucketList', id);
    await deleteDoc(itemRef);
  };

  return (
    <div className="bucket-list">
      <h2>Our Bucket List 🎯</h2>

      <div className="input-group">
        <input
          type="text"
          value={input}
          placeholder="Add a bucket list item..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') addItem(); }}
        />
        <button onClick={addItem}>Add</button>
      </div>

      {items.length === 0 && <p className="no-items">No bucket list items yet. Start adding!</p>}

      <ul>
        {items.map(({ id, text, done }) => (
          <li key={id} className={done ? 'done' : ''}>
            <input
              type="checkbox"
              checked={done}
              onChange={() => toggleDone(id, done)}
              title={done ? 'Mark as not done' : 'Mark as done'}
            />
            <span>{text}</span>
            <button
              className="remove-btn"
              onClick={() => removeItem(id)}
              title="Remove item"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BucketList;
