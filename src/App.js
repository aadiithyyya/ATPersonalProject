import React from 'react';
import Counter from './components/Counter';
import LoveNotes from './components/LoveNotes';
import Header from './components/Header';
import SharePage from './components/SharePage';

function App() {
  const handleRefreshAll = () => {
    localStorage.clear();  // Clears all stored values
    window.location.reload();  // Optionally reloads the page
  };

  return (
    <div className="App">
      <Header />
      <button onClick={handleRefreshAll}>Clear All Data 🔄</button>
      <Counter />
      <LoveNotes />
      <SharePage />
    </div>
  );
}

export default App;
