import React from 'react';

const getPerformance = (time) => {
    if (time < 200) return 'Godlike!';
    if (time < 250) return 'Excellent';
    if (time < 300) return 'Great';
    if (time < 400) return 'Average';
    return 'Keep practicing';
};

const Result = ({ gameData, onNext }) => {
    const { attempts, averageTime, bestTime } = gameData;

    return (
        <div className="reaction-timer-container">
            <h2>Results</h2>
            <p>Best Time: {bestTime ? `${bestTime.toFixed(2)} ms` : 'N/A'}</p>
            <p>Average Time: {averageTime ? `${averageTime.toFixed(2)} ms` : 'N/A'}</p>
            <p>Performance: {averageTime ? getPerformance(averageTime) : 'N/A'}</p>
            <h3>All Attempts:</h3>
            <ul>
                {attempts.map((time, index) => (
                    <li key={index}>{time} ms</li>
                ))}
            </ul>
            <button onClick={onNext}>Play Again</button>
        </div>
    );
};

export default Result;
