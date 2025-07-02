import { useState, useEffect, useRef, useCallback } from 'react';

const useBGM = (src, loop = true, volume = 0.5) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(src);
            audioRef.current.loop = loop;
            audioRef.current.volume = volume;
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [src, loop, volume]);

    const play = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(error => console.error("BGM play failed:", error));
        }
    }, []);

    const pause = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }, []);

    const stop = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    }, []);

    const setVolume = useCallback((newVolume) => {
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    }, []);

    return { play, pause, stop, isPlaying, setVolume };
};

export default useBGM;
