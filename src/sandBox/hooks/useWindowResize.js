import { useEffect, useState } from "react";

export default function useWindowResize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleWindowChange = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleWindowChange);

    return () => {
        window.removeEventListener("resize", handleWindowChange);
      };
}, []);

 return windowSize;
}