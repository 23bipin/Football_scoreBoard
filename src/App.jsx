import React, { useState } from 'react';
import countries from './countries'; // Make sure you have a countries.js file exporting an array of country names

const App = () => {
  const [matches, setMatches] = useState([]);
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [scoreTeamA, setScoreTeamA] = useState(0);
  const [scoreTeamB, setScoreTeamB] = useState(0);
  const [error, setError] = useState('');

  const startMatch = () => {
    if (teamA === teamB) {
      setError('Home team and away team cannot be the same');
      return;
    }
    setError('');
    const newMatch = {
      id: matches.length + 1,
      teamA,
      teamB,
      scoreTeamA: 0,
      scoreTeamB: 0,
      startTime: Date.now() // Add timestamp for sorting purposes
    };
    setMatches([...matches, newMatch]);
    setTeamA('');
    setTeamB('');
  };

  const updateScore = (id) => {
    if (scoreTeamA < 0 || scoreTeamB < 0) {
      setError('Score cannot be a negative');
      return;
    }
    setError('');
    const updatedMatches = matches.map(match => {
      if (match.id === id) {
        return { ...match, scoreTeamA, scoreTeamB };
      }
      return match;
    });
    setMatches(updatedMatches);
    setScoreTeamA(0);
    setScoreTeamB(0);
  };

  const finishMatch = (id) => {
    const updatedMatches = matches.filter(match => match.id !== id);
    setMatches(updatedMatches);
  };

  // Function to sort matches by total score and then by start time
  const getSortedMatches = () => {
    return [...matches].sort((a, b) => {
      const totalScoreA = a.scoreTeamA + a.scoreTeamB;
      const totalScoreB = b.scoreTeamA + b.scoreTeamB;
      if (totalScoreA === totalScoreB) {
        return b.startTime - a.startTime; // Newer matches come first
      }
      return totalScoreB - totalScoreA; // Higher total scores come first
    });
  };

  return (
    <div>
      <h1>Live Football World Cup Scoreboard</h1>
      <div>
        <h2>Start a new match</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <select value={teamA} onChange={e => setTeamA(e.target.value)}>
          <option value="" disabled>Select Home Team</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        <select value={teamB} onChange={e => setTeamB(e.target.value)}>
          <option value="" disabled>Select Away Team</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        <button onClick={startMatch}>Start Match</button>
      </div>
      <div>
        <h2>Update Score</h2>
        {matches.map(match => (
          <div key={match.id}>
            <h3>{match.teamA} vs {match.teamB}</h3>
            <input type="number" value={scoreTeamA} onChange={e => setScoreTeamA(Number(e.target.value))} placeholder='Home Score' />
            <input type="number" value={scoreTeamB} onChange={e => setScoreTeamB(Number(e.target.value))} placeholder='Away Score' />
            <button onClick={() => updateScore(match.id)}>Update Score</button>
            <button onClick={() => finishMatch(match.id)}>Finish Match</button>
          </div>
        ))}
      </div>
      <h2>Matches in Progress</h2>
      <ul>
        {getSortedMatches().map(match => (
          <li key={match.id}>
            {match.teamA} vs {match.teamB} - {match.scoreTeamA}:{match.scoreTeamB}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
