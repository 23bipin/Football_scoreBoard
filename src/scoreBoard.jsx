import { useState } from 'react'

const scoreBoard = () => {
    const [matches, setMatches] = useState(new Map())

    const startMatch = (teamA, teamB) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newMatch = {
            id,
            teamA,
            teamB,
            scoreTeamA: 0,
            scoreTeamB: 0,
            startTime: Date.now(),
        };
        setMatches(prevMatches => new Map(prevMatches).set(id, newMatch));
        return id;
    }

    const updateScore = (id, scoreTeamA, scoreTeamB) => {
        setMatches(prevMatches => {
            const newMatches = new Map(prevMatches);
            const match = newMatches.get(id);
            if (match){
                match.scoreTeamA = scoreTeamA;
                match.scoreTeamB = scoreTeamB;
            } else {
                throw new Error('Match not found');
            }
            return newMatches;
        });
    };

    const finishMatch = (id) => {
        setMatches(prevMatches => {
            const newMatches = new Map(prevMatches);
            newMatches.delete(id);
            return newMatches;

        })
    }

    const getSummary = () => {
        return Array.from(matches.values()).sort((a, b) => {
            const scoreDifference = (b.scoreTeamA + b.scoreTeamB) - (a.scoreTeamA + a.scoreTeamB);
            return scoreDifference !== 0 ? scoreDifference : b.startTime - a.startTime;
        })
    }
    
    return {
        startMatch,
        updateScore,
        finishMatch,
        getSummary,
    }
}

export default scoreBoard;