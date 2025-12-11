import { useState, useEffect } from "react";

export const useWindowDimension = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const deviceType =
    width < 576 ? "mobile" : width < 1024 ? "tablet" : "desktop";

  return { width, deviceType };
};
