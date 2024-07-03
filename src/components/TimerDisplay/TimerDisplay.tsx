import React from "react";
import { ReactComponent as DotIcon } from "../../icons/dot.svg";
import { ReactComponent as DotIconFilled } from "../../icons/dot-filled.svg";

import { VStack, Text, useTheme } from "@chakra-ui/react";

interface TimerDisplayProps {
  countdown: number;
  isTimerRunning: boolean;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  countdown,
  isTimerRunning
}) => {
  const theme = useTheme();
  return (
    <VStack 
      data-testid="timer-display"
      mt={"clamp(0, 1vh, 100px)"}
    >
      <Text
        fontSize="clamp(3em, 4.5vw, 6em)"
        p="0"
        m="0"
        letterSpacing="-4px"
        opacity={theme.resting[String(isTimerRunning)]}
      >
        {countdown}
    </Text>
    </VStack>
  );
};

export default TimerDisplay;