// Feature4.jsx
import React, { useEffect, useState } from 'react';
import MessagePopup from '../components/MessagePopup';
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../styles/Feature4.css';
 
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
    <div className="feature4-container">
      <h2>TharaChat</h2>
      <div className="input-group">
        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Yap here"
          onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
          className="chat-input"
        />
        <button onClick={sendMessage} className="send-button">Send 👆🏻</button>
      </div>

      <div className="messages-list">
        {messages.map((msg) => (
          <MessagePopup key={msg.id} message={msg} onDelete={deleteMessage} />
        ))}
      </div>
    </div>
  );
}

export default Feature4;
