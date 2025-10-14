import { useEffect, useState } from "react";

const useScrollY = () => {
  const [scrollY, setScrollY] = useState(window.scrollY);

  // Update scroll position state when the user scrolls the page
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);
    // Clean up the event listener when component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
};

export default useScrollY;
