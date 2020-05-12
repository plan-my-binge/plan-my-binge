import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

export const ScrollToTop =() => {
  const { pathname } = useLocation();
  const history = useHistory()

  useEffect(() => {
    if (history.action === "PUSH")
      window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};