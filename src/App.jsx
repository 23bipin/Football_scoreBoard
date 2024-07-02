import React, { useState } from 'react';
import countries from './countries';
import Match from './Match';
import MatchesList from './MatchesList';

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
      startTime: Date.now()
    };
    setMatches([...matches, newMatch]);
    setTeamA('');
    setTeamB('');
  };

  //update, reset matches
  const updateScore = (id) => {
    console.log ('match status', {id})
    if (scoreTeamA < 0 || scoreTeamB < 0) {
      setError('Scores cannot be negative');
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

  //compare score and arrange matches according the scores
  const getSortedMatches = () => {
    return [...matches].sort((a, b) => {
      const totalScoreA = a.scoreTeamA + a.scoreTeamB;
      const totalScoreB = b.scoreTeamA + b.scoreTeamB;
      if (totalScoreA === totalScoreB) {
        return b.startTime - a.startTime;
      }
      return totalScoreB - totalScoreA;
    });
  };

  //reset for new series
  const resetApp = () => {
    setMatches([]);
    setTeamA('');
    setTeamB('');
    setScoreTeamA(0);
    setScoreTeamB(0);
    setError('');
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
          <Match
            key={match.id}
            match={match}
            scoreTeamA={scoreTeamA}
            scoreTeamB={scoreTeamB}
            setScoreTeamA={setScoreTeamA}
            setScoreTeamB={setScoreTeamB}
            updateScore={updateScore}
          />
        ))}
      </div>
      
      <h2>Matches in Progress</h2>
      <MatchesList matches={getSortedMatches()} />
      <button onClick ={resetApp}>Reset</button>
    </div>
  );
};

export default App;
