import React from "react";
import { ReactComponent as DotIcon } from "../../icons/dot.svg";
import { ReactComponent as DotIconFilled } from "../../icons/dot-filled.svg";

import { VStack } from "@chakra-ui/react";

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

  const intervals = new Array(intervalsPerRound).fill(null);

  return (
    <VStack className={`timer-display ${isResting ? "is-resting" : "is-working"}`}>
      <span className="countdown">{countdown}</span>
      {/* <h2 className="status">{isResting ? "Resting" : "Working"}</h2> */}
      <h2 className="heading heading--2 round-info">
        — {getOrdinalSuffix(currentRound)[0]}<sup>{getOrdinalSuffix(currentRound)[1]}</sup> —
      </h2>
      <div className="interval-icons">
        {intervals.map((_, index) => 
          index < currentInterval ? <DotIconFilled key={index} /> : <DotIcon key={index} />
        )}
      </div>
    </VStack>
  );
};

export default TimerDisplay;
