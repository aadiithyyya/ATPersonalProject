import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

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
    <div style={{
      maxWidth: '900px',
      margin: '3rem auto',
      fontFamily: "'Inter', sans-serif",
      padding: '0 1rem',
      color: '#3b3b3b'
    }}>
      <h2 style={{ textAlign: 'center', color: '#e91e63', marginBottom: '2rem', fontWeight: '700' }}>
        📅 Memory Timeline
      </h2>

      <div style={{
        display: 'flex',
        overflowX: 'auto',
        paddingBottom: '1rem',
        gap: '1.5rem',
        borderBottom: '2px solid #e91e63',
        scrollSnapType: 'x mandatory',
      }}>
        {events.map((event, index) => (
          <div
            key={event.id}
            style={{
              flex: '0 0 200px',
              backgroundColor: '#fce4ec',
              borderRadius: '14px',
              padding: '1rem',
              boxShadow: '0 4px 12px rgba(233, 30, 99, 0.2)',
              position: 'relative',
              scrollSnapAlign: 'start',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              userSelect: 'none',
            }}
          >
            <input
              type="text"
              value={event.date}
              onChange={(e) => handleEventChange(event.id, 'date', e.target.value)}
              style={{
                fontWeight: '700',
                fontSize: '1.1rem',
                border: 'none',
                background: 'transparent',
                color: '#c2185b',
                outline: 'none',
                cursor: 'text',
              }}
              spellCheck={false}
            />
            <textarea
              rows={3}
              value={event.text}
              onChange={(e) => handleEventChange(event.id, 'text', e.target.value)}
              style={{
                fontSize: '1rem',
                border: 'none',
                background: 'transparent',
                color: '#880e4f',
                resize: 'none',
                outline: 'none',
                cursor: 'text',
                fontFamily: "'Inter', sans-serif",
                lineHeight: '1.3',
                whiteSpace: 'pre-wrap'
              }}
              spellCheck={false}
            />
            <button
              onClick={() => handleDeleteEvent(event.id)}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: 'none',
                border: 'none',
                color: '#e91e63',
                fontSize: '1.3rem',
                cursor: 'pointer',
                lineHeight: 1,
              }}
              title="Delete this event"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '3rem',
        borderTop: '2px dashed #e91e63',
        paddingTop: '1.5rem',
        maxWidth: '400px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <h3 style={{ color: '#e91e63', marginBottom: '0.8rem', fontWeight: '600' }}>➕ Add New Event</h3>
        <input
          type="text"
          placeholder="Date (e.g., 10 May 2025)"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            marginBottom: '0.75rem',
            borderRadius: '8px',
            border: '1.5px solid #e91e63',
            fontSize: '1rem',
            outline: 'none',
            fontFamily: "'Inter', sans-serif"
          }}
        />
        <textarea
          placeholder="Note"
          rows={3}
          value={newEvent.text}
          onChange={(e) => setNewEvent({ ...newEvent, text: e.target.value })}
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            marginBottom: '1rem',
            borderRadius: '8px',
            border: '1.5px solid #e91e63',
            fontSize: '1rem',
            resize: 'vertical',
            fontFamily: "'Inter', sans-serif"
          }}
        />
        <button
          onClick={handleAddEvent}
          style={{
            width: '100%',
            padding: '0.65rem',
            backgroundColor: '#e91e63',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#c2185b')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#e91e63')}
        >
          Add Event
        </button>
      </div>
    </div>
  );
}

export default Feature2;
