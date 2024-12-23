import { useState, useEffect } from "react";

function useMediaQuery(query) {
  let matchQueryList;
  const [matches, setMatches] = useState();
  useEffect(() => {
    matchQueryList = window.matchMedia(query);
    setMatches(matchQueryList.matches);

    function handleChange(e) {
      setMatches(e.matches);
    }
    matchQueryList.addEventListener("change", handleChange);

    return () => {
      matchQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);
  return matches;
}

export default useMediaQuery;
