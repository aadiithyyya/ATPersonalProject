import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // adjust import as needed

function MoodSlider() {
  const [mood, setMood] = useState(5); // Default middle
  const [loading, setLoading] = useState(true);

  const moodDocRef = doc(db, 'moodTrack', 'currentMood'); // collection: moodTrack, doc: currentMood

  const moodLabels = [
    '😞 Sad',
    '😕 Meh',
    '😐 Okay',
    '🙂 Good',
    '😃 Great',
    '😍 Amazing',
  ];

  const getMoodLabel = () => {
    if (mood <= 2) return moodLabels[0];
    if (mood <= 4) return moodLabels[1];
    if (mood <= 6) return moodLabels[2];
    if (mood <= 7) return moodLabels[3];
    if (mood <= 8) return moodLabels[4];
    return moodLabels[5];
  };

  useEffect(() => {
    const fetchMood = async () => {
      const docSnap = await getDoc(moodDocRef);
      if (docSnap.exists()) {
        setMood(docSnap.data().level || 5);
        localStorage.setItem('moodLevel', docSnap.data().level); // cache in localStorage
      } else {
        await setDoc(moodDocRef, { level: 5 }); // initialize
      }
      setLoading(false);
    };

    fetchMood();
  }, []);

  const handleMoodChange = async (newMood) => {
    setMood(newMood);
    localStorage.setItem('moodLevel', newMood);
    await updateDoc(moodDocRef, { level: newMood });
  };

  if (loading) return <p>Loading mood...</p>;

  return (
    <div className="mood-slider" style={{ marginTop: '2rem', textAlign: 'center' }}>
      <h3>Feeling alright today? Slide your mood →</h3>
      <input
        type="range"
        min="1"
        max="10"
        value={mood}
        onChange={(e) => handleMoodChange(Number(e.target.value))}
        style={{ width: '80%', cursor: 'pointer' }}
      />
      <p style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>{getMoodLabel()}</p>
    </div>
  );
}

export default MoodSlider;
