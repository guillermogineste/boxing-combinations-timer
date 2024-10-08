import React, { useState, useEffect } from "react";
import "./styles.css";
import DisplayCombination from "./components/DisplayCombination/DisplayCombination";
import TimerDisplay from "./components/TimerDisplay/TimerDisplay";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import ControlButtons from "./components/ControlButtons/ControlButtons";
import SettingsPanel from "./components/SettingsPanel/SettingsPanel";
import DisplayAdditiveSet from "./components/DisplayAdditiveSet/DisplayAdditiveSet";
import FocusItemDisplay from "./components/FocusItemDisplay/FocusItemDisplay";
import { Combination, AdditiveSet, FocusItem } from "./types";
import { getRandomCombinationAsync } from "./utils/getRandomCombination";
import { getRandomSetAsync } from "./utils/getRandomSet";
import { getRandomFocusItem } from "./utils/getRandomFocusItem";
import { useTimer } from './hooks/useTimer';
import { useActionBeep } from './hooks/useActionBeep';
import { ChakraProvider, VStack, Center, Heading } from "@chakra-ui/react";
import { theme } from './theme';
import {
  NUMBER_OF_ROUNDS,
  INTERVALS_PER_ROUND,
  REST_TIME,
  DEBUG_MODE
} from './constants';

// TODO:
// DONE - Move settings to a dialog
// DONE - Opening settings stops the timer
// DONE - User has to manually restart the workout
// Look into adding options for short and long rest (30s or 1min)
// Mobile first refactor
// Look into adding a prepare timer, can be customised
// Look into adding a heavy bag mode

const App: React.FC = () => {
  // Number of rounds
  const [numberOfRounds, setNumberOfRounds] = useState(NUMBER_OF_ROUNDS);

  // State to hold the random combination
  const [currentCombination, setCurrentCombination] =
    useState<Combination | null>(null);

  // Additive set
  const [isAdditiveModeEnabled, setIsAdditiveModeEnabled] = useState(false);
  const [currentAdditiveSet, setCurrentAdditiveSet] =
    useState<AdditiveSet | null>(null);

  // Refresh the combination
  const refreshCombination = () => {
    getRandomCombinationAsync(selectedStance).then(setCurrentCombination);
    getRandomSetAsync(selectedStance).then(setCurrentAdditiveSet);
  };

  // Track rest time
  const [restTime, setRestTime] = useState(DEBUG_MODE ? 4 : REST_TIME);

  // Track stance
  const [selectedStance, setSelectedStance] = useState<"orthodox" | "southpaw" | "both">("orthodox");

  // useEffect to set the random combination when the component mounts
  useEffect(() => {
    getRandomCombinationAsync(selectedStance).then(setCurrentCombination);
    getRandomSetAsync(selectedStance).then(setCurrentAdditiveSet);
    getRandomFocusItem().then(setCurrentFocusItem);
  }, [selectedStance]);

  // Additive mode
  useEffect(() => {
    getRandomSetAsync(selectedStance).then(setCurrentAdditiveSet);
  }, [isAdditiveModeEnabled]);

  // Focus
  const [currentFocusItem, setCurrentFocusItem] = useState<FocusItem | null>(null);

  const {
    currentRound,
    currentInterval,
    isResting,
    countdown,
    isTimerRunning,
    countdownType,
    toggleTimer,
    resetTimer,
    replayInterval,
    intervalTime,
    totalWorkoutDuration
  } = useTimer(setCurrentCombination, setCurrentAdditiveSet, selectedStance, numberOfRounds, setCurrentFocusItem, restTime);


  const {
    isActionBeepEnabled,
    setIsActionBeepEnabled,
    selectedSpeed,
    setSelectedSpeed
  } = useActionBeep(isTimerRunning, isResting);

  const restingBackground = `radial-gradient(${theme.colors.app.restBackground} 10%, transparent 10%),
    linear-gradient(45deg, transparent 49.5%, ${theme.colors.app.restBackground} 49.5% 50.5%, transparent 50.5%),
    linear-gradient(-45deg, transparent 49.5%, ${theme.colors.app.restBackground} 49.5% 50.5%, transparent 50.5%)`;

  const activeBackground = `radial-gradient(${theme.colors.app.background} 10%, transparent 10%),
    linear-gradient(45deg, transparent 49.5%, ${theme.colors.app.background} 49.5% 50.5%, transparent 50.5%),
    linear-gradient(-45deg, transparent 49.5%, ${theme.colors.app.background} 49.5% 50.5%, transparent 50.5%)`;

  const roundBackgroundShape = {
    // Round shape behind timer
    content: '""',
    display: "block",
    position: "absolute",
    width: "376px",
    height: "270px",
    zIndex: "30",
    top: "0",
    outline: "2px solid",
    outlineColor: isResting ? "app.restBackground" : "app.background",
    border: "8px solid black",
    bg: isResting ? "app.restBackground" : "app.workBackground",
    borderRadius: "50vw 50vw 8px 8px"
  }
  return (
    <ChakraProvider theme={theme}>
      <Center
        w="100vw"
        h="100vh"
        bg={isResting ? restingBackground : activeBackground}
        bgSize={"5em 5em"}
      >
        <VStack
          data-testid="timer-container"
          justifyContent={"space-between"}
          paddingTop={{ base: '0', md: "120px"}}
          position={"relative"}
          w={"90vw"}
          h={{ base: '95vh', md: "auto"}}
          minH={{ base: '95vh', md: "85vh"}}
          flexGrow={"1"}
          maxW={"1280px"}
          _before={{ base: '', md: roundBackgroundShape}}
        >
          <ControlButtons
            toggleTimer={toggleTimer}
            resetTimer={resetTimer}
            replayInterval={replayInterval}
            isTimerRunning={isTimerRunning}
            currentRound={currentRound}
            currentInterval={currentInterval}
            countdown={countdown}
            countdownType={countdownType}
            intervalTime={intervalTime}
            restTime={restTime}
            isResting={isResting}
          />
          <VStack
            data-testid="timer-content"
            bg={isResting ? "app.restBackground" : "app.workBackground"}
            p={{ 
              base: '180px 32px 32px 32px', 
              md: "clamp(140px, 2.1vw, 160px) clamp(24px, 3.5vw, 250px) clamp(24px, 3.5vw, 250px) clamp(24px, 3.5vw, 250px)"
            }}
            borderRadius={"clamp(100px, 17vw, 260px) clamp(100px, 17vw, 260px) 40px 40px"}
            outline={"2px solid"}
            outlineColor={isResting ? "app.restBackground" : "app.background"}
            border={"8px solid black"}
            w={"100%"}
            h={{ base: '95vh', md: "auto"}}
            minH={"80vh"}
            flexGrow={"1"}
            justifyContent={"space-between"}
          >
            {isAdditiveModeEnabled ? (
                <DisplayAdditiveSet
                  additiveSet={currentAdditiveSet}
                  isResting={isResting}
                  currentInterval={currentInterval}
                  refreshCombination={refreshCombination}
                  isTimerRunning={isTimerRunning}
                />
              ) : (
                <DisplayCombination
                  combination={currentCombination}
                  refreshCombination={refreshCombination}
                  isResting={isResting}
                  isTimerRunning={isTimerRunning}
                />
              )}

            <FocusItemDisplay
              focusItem={currentFocusItem}
              isResting={isResting}
              isTimerRunning={isTimerRunning}
            />

            <TimerDisplay
              countdown={countdown}
              isTimerRunning={isTimerRunning}
            />
            <ProgressBar
              currentRound={currentRound}
              numberOfRounds={numberOfRounds}
              currentInterval={currentInterval}
              intervalsPerRound={INTERVALS_PER_ROUND}
              isResting={isResting}
            />
            <SettingsPanel
              setSelectedSpeed={setSelectedSpeed}
              isActionBeepEnabled={isActionBeepEnabled}
              setIsActionBeepEnabled={setIsActionBeepEnabled}
              isAdditiveModeEnabled={isAdditiveModeEnabled}
              setIsAdditiveModeEnabled={setIsAdditiveModeEnabled}
              numberOfRounds={numberOfRounds}
              setNumberOfRounds={setNumberOfRounds}
              totalWorkoutDuration={totalWorkoutDuration}
              selectedStance={selectedStance}
              setSelectedStance={setSelectedStance}
              isResting={isResting}
              toggleTimer={toggleTimer}
              isTimerRunning={isTimerRunning}
              restTime={restTime}
              setRestTime={setRestTime}
            />
          </VStack>
        </VStack>
      </Center>
    </ChakraProvider>
  );
};

export default App;