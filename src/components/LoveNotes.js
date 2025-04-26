import React, { useState, useEffect } from 'react';

function LoveNotes() {
  const [notes, setNotes] = useState(() => {
    // Retrieve from localStorage if available
    const savedNotes = localStorage.getItem('loveNotes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    // Save the notes to localStorage whenever they change
    localStorage.setItem('loveNotes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (input.trim() !== '') {
      setNotes([...notes, input]);
      setInput('');
    }
  };

  return (
    <div className="love-notes">
      <h2>Leave Cute notes 💬</h2>
      <input 
        type="text" 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write something cute..."
      />
      <button onClick={addNote}>Send 💖</button>

      <div className="notes-list">
        {notes.map((note, index) => (
          <div key={index} className="note">
            {note}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoveNotes;
