import React, { useState, useEffect } from "react";
import "./styles.css";
import DisplayCombination from "./components/DisplayCombination/DisplayCombination";
import TimerDisplay from "./components/TimerDisplay/TimerDisplay";
import ControlButtons from "./components/ControlButtons/ControlButtons";
import SettingsPanel from "./components/SettingsPanel/SettingsPanel";
import DisplayAdditiveSet from "./components/DisplayAdditiveSet/DisplayAdditiveSet";

import { Combination, AdditiveSet } from "./types";

import { getRandomCombination } from "./utils/getRandomCombination";
import { getRandomSet } from "./utils/getRandomSet";
import { playBeep } from "./utils/playBeep";

import { useTimer } from './hooks/useTimer';
import { useActionBeep } from './hooks/useActionBeep';

import {
  REST_TIME,
  NUMBER_OF_ROUNDS,
  INTERVALS_PER_ROUND,
  INTERVAL_TIME,
  INITIAL_ROUND,
  INITIAL_INTERVAL,
  INITIAL_IS_RESTING,
  INITIAL_COUNTDOWN_TYPE,
  DEBUG_MODE
} from './constants';

// let intervalTime = INTERVAL_TIME
// let restTime = REST_TIME

// if (DEBUG_MODE) {
//   intervalTime = 4;
//   restTime = 4;
// }

const App: React.FC = () => {
  // Number of rounds
  const [numberOfRounds, setNumberOfRounds] = useState(NUMBER_OF_ROUNDS);
  
  // State to hold the random combination
  const [currentCombination, setCurrentCombination] =
    useState<Combination | null>(null);

  // Additive set
  const [isAdditiveModeEnabled, setIsAdditiveModeEnabled] = useState(false);
  // const [currentAdditiveInterval, setCurrentAdditiveInterval] = useState(1);
  const [currentAdditiveSet, setCurrentAdditiveSet] =
    useState<AdditiveSet | null>(null);

  // Refresh the combination
  const refreshCombination = () => {
    setCurrentCombination(getRandomCombination(selectedLevel, selectedStance));
    setCurrentAdditiveSet(getRandomSet(selectedStance));
  };

  // Track level
  const [selectedLevel, setSelectedLevel] = useState<
    "simple" | "advanced" | "both"
  >("simple");
  
  // Track stance
  const [selectedStance, setSelectedStance] = useState<"orthodox" | "southpaw" | "both">("orthodox");
  
  // useEffect to set the random combination when the component mounts
  useEffect(() => {
    setCurrentCombination(getRandomCombination(selectedLevel, selectedStance));
    setCurrentAdditiveSet(getRandomSet(selectedStance));
  }, [selectedLevel, selectedStance]);
  
  // Additive mode
  useEffect(() => {
    setCurrentAdditiveSet(getRandomSet(selectedStance));
  }, [isAdditiveModeEnabled]);


  const {
    currentRound,
    setCurrentRound,
    currentInterval,
    setCurrentInterval,
    isResting,
    setIsResting,
    countdown,
    setCountdown,
    isTimerRunning,
    setIsTimerRunning,
    countdownType,
    setCountdownType,
    toggleTimer,
    resetTimer,
    replayInterval,
    intervalTime,
    restTime,
    totalWorkoutDuration
  } = useTimer(setCurrentCombination, setCurrentAdditiveSet, selectedLevel, selectedStance, numberOfRounds);


  const {
    isActionBeepEnabled,
    setIsActionBeepEnabled,
    selectedSpeed,
    setSelectedSpeed
  } = useActionBeep(isTimerRunning, isResting);

  
  
  return (
    <div className={`App ${isResting ? "is-rest" : "is-work"}`}>
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
      />
      {currentCombination ? (
        isAdditiveModeEnabled ? (
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
        )
      ) : (
        <p>Loading...</p>
      )}

      <TimerDisplay
        currentRound={currentRound}
        numberOfRounds={numberOfRounds}
        currentInterval={currentInterval}
        intervalsPerRound={INTERVALS_PER_ROUND}
        isResting={isResting}
        countdown={countdown}
      />
      <SettingsPanel
        setSelectedLevel={setSelectedLevel}
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
      />
    </div>
  );
};

export default App;