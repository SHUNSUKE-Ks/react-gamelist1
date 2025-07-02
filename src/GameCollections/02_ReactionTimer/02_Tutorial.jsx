import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Tutorial = ({ onNext }) => {
    const comp = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from("h2", { opacity: 0, y: -30, duration: 0.8, ease: "power3.out" });
            gsap.from("p", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out", stagger: 0.2, delay: 0.2 });
            gsap.from("button", { opacity: 0, scale: 0.5, duration: 0.8, ease: "back.out(1.7)", delay: 0.6 });
        }, comp);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={comp} className="reaction-timer-container">
            <h2>How to Play</h2>
            <p>When the screen turns red, click the button as fast as you can.</p>
            <p>There will be 5 attempts.</p>
            <button onClick={onNext}>Got it!</button>
        </div>
    );
};

export default Tutorial;
