import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const getPerformance = (time) => {
    if (time < 200) return 'Godlike!';
    if (time < 250) return 'Excellent';
    if (time < 300) return 'Great';
    if (time < 400) return 'Average';
    return 'Keep practicing';
};

const Result = ({ gameData, onNext }) => {
    const { attempts, averageTime, bestTime } = gameData;
    const comp = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from("h2", { opacity: 0, y: -30, duration: 0.8, ease: "power3.out" });
            gsap.from("p", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out", stagger: 0.1, delay: 0.2 });
            gsap.from("h3", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out", delay: 0.5 });
            gsap.from("li", { opacity: 0, x: -20, duration: 0.5, ease: "power2.out", stagger: 0.1, delay: 0.6 });
            gsap.from("button", { opacity: 0, scale: 0.5, duration: 0.8, ease: "back.out(1.7)", delay: 1 });
        }, comp);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={comp} className="reaction-timer-container">
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
