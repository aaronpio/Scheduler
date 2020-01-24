import { useState } from "react";

const useVisualMode = initial => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (x, replace) => {
    if (replace) {
      setHistory([...history.slice(0, history.length - 1), x]);
      setMode(x);
    } else {
      setHistory([...history, x]);
      setMode(x);
    }
  };

  const back = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, history.length - 1));
      setMode(history[history.length - 2]);
    } else {
      setMode(history[0]);
    }
  };

  return { mode, transition, back };
};

export default useVisualMode;
