import React from 'react';

const Title = ({ onNext }) => {
    return (
        <div className="reaction-timer-container">
            <h1>Reaction Timer</h1>
            <p>Test your reaction speed!</p>
            <button onClick={onNext}>Start Game</button>
        </div>
    );
};

export default Title;
