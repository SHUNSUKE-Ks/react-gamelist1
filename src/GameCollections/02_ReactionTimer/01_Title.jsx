import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Title = ({ onNext }) => {
    const comp = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from("h1", { opacity: 0, y: -50, duration: 1, ease: "power3.out" });
            gsap.from("p", { opacity: 0, y: 50, duration: 1, ease: "power3.out", delay: 0.2 });
            gsap.from("button", { opacity: 0, scale: 0.5, duration: 0.8, ease: "back.out(1.7)", delay: 0.4 });
        }, comp);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={comp} className="reaction-timer-container">
            <h1>Reaction Timer</h1>
            <p>Test your reaction speed!</p>
            <button onClick={onNext}>Start Game</button>
        </div>
    );
};

export default Title;
