import React, { useState, useEffect } from "react";

import { ReactComponent as PlayIcon } from "../../icons/play_arrow.svg";
import { ReactComponent as PauseIcon } from "../../icons/pause.svg";
import { ReactComponent as ReplayIcon } from "../../icons/replay.svg";
import { ReactComponent as StopIcon } from "../../icons/stop.svg";

import { Text, HStack, VStack, Button, Grid, GridItem, useTheme } from "@chakra-ui/react";

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
  const theme = useTheme();
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

  const ResetAndReplayVisible =
    isTimerRunning ||
    currentRound > 1 ||
    currentInterval > 1 ||
    countdown < (countdownType === "interval" ? intervalTime : restTime);

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
  const maskShape = {
    // Block to hide border
    content: '""', // necessary for ::before to work
    display: "block",
    position: "absolute",
    width: "390px",
    height: "146px",
    backgroundColor: "blue",
    zIndex: "-1",
    bottom: (ResetAndReplayVisible ? "-30px" : "-120px"),
    bg: isResting ? "app.restBackground" : "app.workBackground"
  }
  return (
    <VStack
      className={isResting ? "is-rest" : ""}
      justifyContent={"top"}
      gap={"0"}
      pl={16}
      pr={16}
      pt={16}
      position={"absolute"}
      top={0}
      zIndex={"50"}
      _before={{ base: '', md: maskShape }}
    >
      <Grid
        templateColumns={{ base: "repeat(3, auto)", md: "repeat(2, auto)" }}
        templateRows={{ base: "auto", md: "repeat(2, auto)" }}
        rowGap={0}
        columnGap={4}
        alignItems="center"
      >
        <GridItem gridColumn={{ base: "auto", md: "1" }} gridRow={{ base: "auto", md: "2" }}>
          {/* Replay button to replay the interval */}
          {shouldShowReplayButton && (
            <Button variant="round" onClick={replayInterval}>
              <VStack gap={{ base: "2px", md: "8px" }}>
                <ReplayIcon />
                <Text className="button-text">Replay</Text>
              </VStack>
            </Button>
          )}
        </GridItem>
        <GridItem gridColumn={{ base: "auto", md: "1 / span 2" }}
          gridRow={{ base: "auto", md: "1" }} display="flex" justifyContent="center">
          {/* Toggle button to start/pause the timer */}
          <Button
            variant="round"
            onClick={toggleTimer}
            h={"90px"}
            w={"90px"}
            bg={isResting ? theme.colors.app.restBackground : theme.colors.app.background}
          >
            <VStack gap={{ base: "2px", md: "8px" }}>
              {isTimerRunning ? (
                <>
                  <PauseIcon />
                  <Text className="button-text">Pause</Text>
                </>
              ) : (
                <>
                  <PlayIcon />
                  <Text className="button-text">Play</Text>
                </>
              )}
            </VStack>
          </Button>
        </GridItem>
        <GridItem gridColumn={{ base: "auto", md: "2" }} gridRow={{ base: "auto", md: "2" }}>
          {/* Reset button to reset the timer */}
          {shouldShowResetButton && (
            <Button variant="round" onClick={resetTimer}>
              <VStack gap={{ base: "2px", md: "8px" }}>
                <StopIcon />
                <Text className="button-text">Stop</Text>
              </VStack>
            </Button>
          )}
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default ControlButtons;
