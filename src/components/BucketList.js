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

function BucketList() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  const bucketRef = collection(db, 'bucketList');

  // Load bucket list items from Firestore in real-time
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

  // Add item to Firestore
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

  // Toggle 'done' in Firestore
  const toggleDone = async (id, current) => {
    const itemRef = doc(db, 'bucketList', id);
    await updateDoc(itemRef, { done: !current });
  };

  // Remove item from Firestore
  const removeItem = async (id) => {
    const itemRef = doc(db, 'bucketList', id);
    await deleteDoc(itemRef);
  };

  return (
    <div className="bucket-list" style={{ maxWidth: 480, margin: '2rem auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <h2 style={{ color: '#c94f7c', textAlign: 'center' }}>Our Bucket List 🎯</h2>

      <div style={{ display: 'flex', gap: 8, marginBottom: '1rem' }}>
        <input
          type="text"
          value={input}
          placeholder="Add a bucket list item..."
          onChange={(e) => setInput(e.target.value)}
          style={{ flexGrow: 1, padding: '0.5rem 1rem', borderRadius: 6, border: '1.5px solid #c94f7c' }}
          onKeyDown={(e) => { if (e.key === 'Enter') addItem(); }}
        />
        <button
          onClick={addItem}
          style={{ backgroundColor: '#c94f7c', color: '#fff', border: 'none', borderRadius: 6, padding: '0 1.2rem', cursor: 'pointer' }}
        >
          Add
        </button>
      </div>

      {items.length === 0 && <p style={{ textAlign: 'center', color: '#a93a68' }}>No bucket list items yet. Start adding!</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(({ id, text, done }) => (
          <li
            key={id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.6rem 1rem',
              marginBottom: 6,
              borderRadius: 8,
              backgroundColor: done ? '#fce4ec' : '#fff0f6',
              boxShadow: done ? 'inset 0 0 5px #c94f7c88' : 'none',
              cursor: 'default',
            }}
          >
            <input
              type="checkbox"
              checked={done}
              onChange={() => toggleDone(id, done)}
              style={{ marginRight: 12, cursor: 'pointer' }}
              title={done ? 'Mark as not done' : 'Mark as done'}
            />
            <span style={{ flexGrow: 1, textDecoration: done ? 'line-through' : 'none', color: done ? '#a93a68' : '#702646' }}>
              {text}
            </span>
            <button
              onClick={() => removeItem(id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#c94f7c',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: 12,
              }}
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
