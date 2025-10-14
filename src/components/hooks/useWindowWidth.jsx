import React, { useEffect, useState } from "react";

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  // Update the screen width state whenever the window is resized
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

export default useWindowWidth;
