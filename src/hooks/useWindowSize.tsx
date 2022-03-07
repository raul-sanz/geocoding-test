import { useState, useEffect } from "react";
import {Window} from '../types/interfaces';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<Window>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
  
    handleResize();
  
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}