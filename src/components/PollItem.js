import React, { useState } from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

export default function PollItem({ poll }) {
  const userEmail = auth.currentUser.email;
  const userVoted = poll.voted?.[userEmail] !== undefined;
  const [votedIndex, setVotedIndex] = useState(poll.voted?.[userEmail]);

  const handleVote = async (index) => {
    if (userVoted) return;

    const newOptions = [...poll.options];
    newOptions[index].votes += 1;

    const updatedVoted = { ...poll.voted, [userEmail]: index };

    try {
      await updateDoc(doc(db, 'polls', poll.id), {
        options: newOptions,
        voted: updatedVoted,
      });
      setVotedIndex(index);
    } catch (err) {
      console.error('Error voting:', err);
    }
  };

  const deletePoll = async () => {
    const confirm = window.confirm("Are you sure you want to delete this poll?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, 'polls', poll.id));
    } catch (err) {
      console.error("Failed to delete poll:", err);
    }
  };

  return (
    <div style={{ marginBottom: '2rem', padding: '1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.03)' }}>
      <h3>{poll.question}</h3>
      {!userVoted ? (
        poll.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleVote(i)}
            style={{ display: 'block', margin: '0.5rem auto' }}
          >
            {opt.text}
          </button>
        ))
      ) : (
        poll.options.map((opt, i) => (
          <p key={i} style={{ fontWeight: votedIndex === i ? 'bold' : 'normal' }}>
            {opt.text}: {opt.votes} vote{opt.votes !== 1 ? 's' : ''}
          </p>
        ))
      )}

      {userEmail === poll.createdBy && (
        <button
          onClick={deletePoll}
          style={{
            marginTop: '1rem',
            background: '#ff4d4f',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Delete Poll
        </button>
      )}
    </div>
  );
}
