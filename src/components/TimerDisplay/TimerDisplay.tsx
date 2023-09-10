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
  return (
    <div className={`timer-display ${isResting ? "is-resting" : "is-working"}`}>
      <span className="countdown">{countdown}</span>
      {/* <h2 className="status">{isResting ? "Resting" : "Working"}</h2> */}
      <h2 className="heading heading--2 round-info">
        Round: {currentRound} of {numberOfRounds}
      </h2>
      <h2 className="heading heading--2 interval-info">
        Interval: {currentInterval} of {intervalsPerRound}
      </h2>
    </div>
  );
};

export default TimerDisplay;
