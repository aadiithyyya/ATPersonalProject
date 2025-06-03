// src/pages/CouplePolls.js
import PollForm from '../components/PollForm';
import PollList from '../components/PollList';
import '../App.css';

export default function CouplePolls() {
  return (
    <div className="feature1-container">
      <h2>Majority Wins</h2>
      <PollForm />
      <PollList />
    </div>
  );
}
