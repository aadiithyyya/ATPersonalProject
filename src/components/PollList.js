// src/components/PollList.js

import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import PollItem from './PollItem';

export default function PollList() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'polls'), (snapshot) => {
      setPolls(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <div>
      {polls.map((poll) => (
        <PollItem key={poll.id} poll={poll} />
      ))}
    </div>
  );
}
