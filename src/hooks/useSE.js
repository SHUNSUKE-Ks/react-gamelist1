import { useCallback } from "react";

const useSE = (src, volume = 1.0) => {
  const play = useCallback(() => {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play().catch((error) => console.error("SFX play failed:", error));
  }, [src, volume]);

  return { play };
};

export default useSE;
