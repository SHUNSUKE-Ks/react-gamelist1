import React from 'react';

const Tutorial = ({ onNext }) => {
    return (
        <div className="reaction-timer-container">
            <h2>How to Play</h2>
            <p>When the screen turns red, click the button as fast as you can.</p>
            <p>There will be 5 attempts.</p>
            <button onClick={onNext}>Got it!</button>
        </div>
    );
};

export default Tutorial;
