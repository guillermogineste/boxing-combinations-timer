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
    <VStack 
    className={`timer-display ${isResting ? "is-resting" : "is-working"}`}
    mt={"clamp(0, 1vh, 100px)"}
    >
      <span className="countdown">{countdown}</span>
    </VStack>
  );
};

export default TimerDisplay;
