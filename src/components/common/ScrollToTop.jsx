import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// This component ensures that navigation to a new page scrolls the window to the top.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default ScrollToTop;
