import React from "react";

interface TimerDisplayProps {
  currentRound: number;
  currentInterval: number;
  intervalsPerRound: number;
  isResting: boolean;
  countdown: number;
  numberOfRounds: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  currentRound,
  numberOfRounds,
  currentInterval,
  intervalsPerRound,
  isResting,
  countdown
}) => {
  const getOrdinalSuffix = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return [n, (s[(v - 20) % 10] || s[v] || s[0])];
  };

  return (
    <div className={`timer-display ${isResting ? "is-resting" : "is-working"}`}>
      <span className="countdown">{countdown}</span>
      {/* <h2 className="status">{isResting ? "Resting" : "Working"}</h2> */}
      <h2 className="heading heading--2 round-info">
        — {getOrdinalSuffix(currentRound)[0]}<sup>{getOrdinalSuffix(currentRound)[1]}</sup> —
      </h2>
      <h2 className="heading heading--3 interval-info">
        {currentInterval} of {intervalsPerRound}
      </h2>
    </div>
  );
};

export default TimerDisplay;
