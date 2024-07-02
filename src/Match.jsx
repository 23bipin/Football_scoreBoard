import React from 'react';

const Match = ({ match, scoreTeamA, scoreTeamB, setScoreTeamA, setScoreTeamB, updateScore }) => {
  return (
    <div>
      <h3>{match.teamA} vs {match.teamB}</h3>
      <input type="number" value={scoreTeamA} onChange={e => setScoreTeamA(Number(e.target.value))} placeholder='Home Score' />
      <input type="number" value={scoreTeamB} onChange={e => setScoreTeamB(Number(e.target.value))} placeholder='Away Score' />
      <button onClick={() => updateScore(match.id)}>Update Score</button>
    </div>
  );
};

export default Match;
