import React, { useEffect, useState } from 'react';
import MessagePopup from '../components/MessagePopup';
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function Feature4() {
  const [messages, setMessages] = useState([]);
  const [newText, setNewText] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'popupMessages'), orderBy('timestamp', 'asc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })));
    });

    return () => unsub();
  }, []);

  const sendMessage = async () => {
    if (!newText.trim()) return;
    await addDoc(collection(db, 'popupMessages'), {
      text: newText,
      timestamp: new Date(),
    });
    setNewText('');
  };

  const deleteMessage = async (id) => {
    await deleteDoc(doc(db, 'popupMessages', id));
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'cursive' }}>
      <h2 style={{ marginBottom: '1rem' }}>💌 Sweet Chat Popups</h2>
      <div style={{ marginBottom: '1.5rem' }}>
        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Write something cute..."
          style={{
            padding: '0.6rem 1rem',
            borderRadius: '20px',
            border: '1px solid #ddd',
            outline: 'none',
            width: '60%',
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: '1rem',
            background: '#ffb6c1',
            border: 'none',
            borderRadius: '20px',
            padding: '0.6rem 1.2rem',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Send 💖
        </button>
      </div>

      {messages.map((msg, idx) => (
        <MessagePopup key={msg.id} message={msg} onDelete={deleteMessage} />
      ))}
    </div>
  );
}

export default Feature4;
