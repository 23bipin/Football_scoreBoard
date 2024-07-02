import React from 'react';

const MatchesList = ({ matches }) => {
  return (
    <ol style ={{ listStyleType: 'lower-alpha'}}>
      {matches.map(match => (
        <li key={match.id}>
          {match.teamA} {match.scoreTeamA} - {match.teamB} {match.scoreTeamB}
        </li>
      ))}
    </ol>
  );
};

export default MatchesList;
