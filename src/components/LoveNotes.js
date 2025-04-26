import React, { useState } from 'react';

function LoveNotes() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');

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
      <button onClick={addNote}>send 💖</button>

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
