import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../styles/Feature2.css';

const memoryRef = collection(db, 'memoryTimeline');

function Feature2() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ date: '', text: '' });

  useEffect(() => {
    const unsubscribe = onSnapshot(memoryRef, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(fetched);
    });

    return () => unsubscribe();
  }, []);

  const handleAddEvent = async () => {
    if (!newEvent.date.trim() || !newEvent.text.trim()) return;
    await addDoc(memoryRef, newEvent);
    setNewEvent({ date: '', text: '' });
  };

  const handleDeleteEvent = async (id) => {
    await deleteDoc(doc(db, 'memoryTimeline', id));
  };

  const handleEventChange = async (id, field, value) => {
    const eventDoc = doc(db, 'memoryTimeline', id);
    await updateDoc(eventDoc, { [field]: value });
  };

  return (
    <div className="memory-container">
      <h2 className="memory-title">📅 Memory Timeline</h2>

      <div className="memory-timeline">
        {events.map((event) => (
          <div className="memory-card" key={event.id}>
            <input
              type="text"
              value={event.date}
              onChange={(e) => handleEventChange(event.id, 'date', e.target.value)}
              className="memory-date-input"
              spellCheck={false}
            />
            <textarea
              rows={3}
              value={event.text}
              onChange={(e) => handleEventChange(event.id, 'text', e.target.value)}
              className="memory-textarea"
              spellCheck={false}
            />
            
          </div>
        ))}
      </div>

      <div className="memory-form">
        <h3 className="memory-form-title">➕ Add New Event</h3>
        <input
          type="text"
          placeholder="Date (e.g., 10 May 2025)"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          className="memory-form-input"
        />
        <textarea
          placeholder="Note"
          rows={3}
          value={newEvent.text}
          onChange={(e) => setNewEvent({ ...newEvent, text: e.target.value })}
          className="memory-form-textarea"
        />
        <button
          onClick={handleAddEvent}
          className="memory-form-button"
        >
          Add Event
        </button>
      </div>
    </div>
  );
}

export default Feature2;
