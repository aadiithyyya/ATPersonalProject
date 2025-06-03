import React, { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import '../styles/PollForm.css';

export default function PollForm() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [error, setError] = useState('');

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => {
    if (options.length < 4) setOptions([...options, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || options.some(opt => !opt.trim())) {
      setError('Please fill in all fields');
      return;
    }
    try {
      const poll = {
        question,
        options: options.map(opt => ({ text: opt, votes: 0 })),
        createdBy: auth.currentUser.email,
        createdAt: Timestamp.now(),
        voted: {},
      };
      await addDoc(collection(db, 'polls'), poll);
      setQuestion('');
      setOptions(['', '']);
      setError('');
    } catch (err) {
      console.error('Error creating poll:', err);
      setError('Failed to create poll.');
    }
  };

  return (
    <div className="pollform-container">
      <form className="pollform-form" onSubmit={handleSubmit}>
        <h2>Create a Poll</h2>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Poll question"
          required
        />
        {options.map((opt, i) => (
          <input
            key={i}
            type="text"
            value={opt}
            onChange={(e) => handleOptionChange(i, e.target.value)}
            placeholder={`Option ${i + 1}`}
            required
          />
        ))}
        {options.length < 4 && (
          <button type="button" className="add-option" onClick={addOption}>
            + Add Option
          </button>
        )}
        <button type="submit">Post Poll</button>
        {error && <p className="poll-error">{error}</p>}
      </form>
    </div>
  );
}
