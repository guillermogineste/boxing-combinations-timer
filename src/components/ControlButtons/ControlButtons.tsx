import React, { useState, useEffect } from "react";

import { ReactComponent as PlayIcon } from "../../icons/play_arrow.svg";
import { ReactComponent as PauseIcon } from "../../icons/pause.svg";
import { ReactComponent as ReplayIcon } from "../../icons/replay.svg";
import { ReactComponent as StopIcon } from "../../icons/stop.svg";

import { HStack, VStack } from "@chakra-ui/react";

// Define the props for the ControlButtons component
interface ControlButtonsProps {
  toggleTimer: () => void;
  resetTimer: () => void;
  replayInterval: () => void;
  isTimerRunning: boolean;
  currentRound: number;
  currentInterval: number;
  countdown: number;
  countdownType: "interval" | "rest";
  intervalTime: number;
  restTime: number;
  isResting: boolean;
}

// ControlButtons component to control the timer and intervals
const ControlButtons: React.FC<ControlButtonsProps> = ({
  toggleTimer,
  resetTimer,
  replayInterval,
  isTimerRunning,
  currentRound,
  currentInterval,
  countdown,
  countdownType,
  intervalTime,
  restTime,
  isResting
}) => {
  // State to manage the inactive class for buttons
  const [inactiveStateClass, setInactiveStateClass] = useState('');

  // Effect to handle mouse movement and set inactive state
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const mouseMoveHandler = () => {
      setInactiveStateClass('');
      clearTimeout(timeoutId);
      if (isTimerRunning) {
        timeoutId = setTimeout(() => setInactiveStateClass('inactive'), 1000);
      }
    };
  
    window.addEventListener('mousemove', mouseMoveHandler);
  
    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      clearTimeout(timeoutId);
    };
  }, [isTimerRunning]);

  // Determine if the Reset button should be displayed
  const shouldShowResetButton =
    isTimerRunning ||
    currentRound > 1 ||
    currentInterval > 1 ||
    countdown < (countdownType === "interval" ? intervalTime : restTime);
  
    // Determine if the Replay button should be displayed
  const shouldShowReplayButton =
    isTimerRunning ||
    currentInterval > 1 ||
    countdown < (countdownType === "interval" ? intervalTime : restTime);

  // Style for the mask shape
  const maskShape ={
    // Block to hide border
    content: '""', // necessary for ::before to work
    display: "block",
    position: "absolute",
    width: "390px",
    height: "144px",
    backgroundColor: "blue",
    zIndex: "-1",
    bottom: "-12px",
    bg: isResting ? "app.restBackground" : "app.workBackground"
  }
  return (
    <VStack
      className={isResting ? "is-rest" : ""}
      justifyContent={"top"}
      gap={"0"}
      w={"360px"}
      h={"260px"}
      pl={16}
      pr={16}
      pt={16}
      position={"absolute"}
      borderRadius={"50vw 50vw 8px 8px"}
      top={0}
      zIndex={"50"}
      _before={maskShape}
    >
      {/* Toggle button to start/pause the timer */}
      <button className={`button button--toggle button--${inactiveStateClass}`} onClick={toggleTimer}>
        {isTimerRunning ?
          (<><PauseIcon /><span>Pause</span></>) :
          (<><PlayIcon /><span>Play</span></>)
        }
      </button>
      <HStack gap={"22px"} flexGrow={1}>
        {/* Replay button to replay the interval */}
        {shouldShowReplayButton && (
          <button className={`button button--replay button--${inactiveStateClass}`} onClick={replayInterval}>
            <ReplayIcon /><span>Replay</span>
          </button>
        )}
        {/* Reset button to reset the timer */}
        {shouldShowResetButton && (
          <button className={`button button--reset button--${inactiveStateClass}`} onClick={resetTimer}>
            <StopIcon /><span>Stop</span>
          </button>
        )}
      </HStack>
    </VStack>
  );
};

export default ControlButtons;
