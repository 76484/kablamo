import { useEffect, useState } from "react";

import Lap from "./Lap";
import formattedSeconds from "./helpers/formattedSeconds";

const Stopwatch = ({ initialSeconds }: { initialSeconds: number }) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(initialSeconds);
  const [laps, setLaps] = useState([] as number[]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const incrementer = setInterval(() => {
      setElapsedSeconds((elapsedSeconds) => elapsedSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(incrementer);
    };
  }, [isRunning, setElapsedSeconds]);

  const handleDeleteLapClick = (index: number) => {
    setLaps((laps) => laps.slice(0, index).concat(laps.slice(index + 1)));
  };

  const handleLapClick = () => {
    setLaps((laps) => laps.concat(elapsedSeconds));
  };

  const handleResetClick = () => {
    setIsRunning(false);
    setElapsedSeconds(0);
  };

  const handleStartClick = () => {
    setIsRunning(true);
  };

  const handleStopClick = () => {
    setIsRunning(false);
  };

  const hasLapButton = isRunning && elapsedSeconds > 0;
  const hasStartButton = !isRunning;
  const hasStopButton = isRunning;
  const hasResetButton = !isRunning && elapsedSeconds > 0;

  return (
    <div className="stopwatch">
      <h1 className="stopwatch-timer">{formattedSeconds(elapsedSeconds)}</h1>
      {hasStartButton && (
        <button type="button" className="start-btn" onClick={handleStartClick}>
          start
        </button>
      )}
      {hasLapButton && (
        <button type="button" onClick={handleLapClick}>
          lap
        </button>
      )}
      {hasStopButton && (
        <button type="button" className="stop-btn" onClick={handleStopClick}>
          stop
        </button>
      )}
      {hasResetButton && (
        <button type="button" onClick={handleResetClick}>
          reset
        </button>
      )}
      <div className="stopwatch-laps">
        {laps.map((lap: number, i: number) => (
          <Lap
            index={i + 1}
            key={lap}
            lap={lap}
            onDelete={() => handleDeleteLapClick(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Stopwatch;
