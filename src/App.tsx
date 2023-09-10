import React, { useState, useEffect } from "react";
import "./styles.css";
import DisplayCombination from "./components/DisplayCombination/DisplayCombination";
import TimerDisplay from "./components/TimerDisplay/TimerDisplay";
import ControlButtons from "./components/ControlButtons/ControlButtons";
import SettingsPanel from "./components/SettingsPanel/SettingsPanel";

import { Combination } from "./types";

import { getRandomCombination } from "./utils/getRandomCombination";
import { playBeep } from "./utils/playBeep";

// Constants
const REST_TIME = 30;
const NUMBER_OF_ROUNDS = 3;
const INTERVALS_PER_ROUND = 3;
const INTERVAL_TIME = 60;
// Constants for initial state
const INITIAL_ROUND = 1;
const INITIAL_INTERVAL = 1;
const INITIAL_IS_RESTING = false;
const INITIAL_COUNTDOWN_TYPE = "interval";
// Random intervals
const INITIAL_MIN_ACTION_BEEP_INTERVAL = 1200;
const INITIAL_MAX_ACTION_BEEP_INTERVAL = 4000;

const App: React.FC = () => {
  // State to hold the random combination
  const [
    randomCombination,
    setRandomCombination
  ] = useState<Combination | null>(null);

  // Countdown type
  const [countdownType, setCountdownType] = useState<"interval" | "rest">(
    "interval"
  );

  // Timer feature
  const [currentRound, setCurrentRound] = useState(1);
  const [currentInterval, setCurrentInterval] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [countdown, setCountdown] = useState(INTERVAL_TIME);

  // Track timer status
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Track level
  const [selectedLevel, setSelectedLevel] = useState<
    "simple" | "advanced" | "both"
  >("simple");

  // Random timer
  const [isActionBeepEnabled, setIsActionBeepEnabled] = useState(false);
  const [isActionBeepRunning, setIsActionBeepRunning] = useState(false);
  const [minActionBeepInterval, setMinActionBeepInterval] = useState(
    INITIAL_MIN_ACTION_BEEP_INTERVAL
  );
  const [maxActionBeepInterval, setMaxActionBeepInterval] = useState(
    INITIAL_MAX_ACTION_BEEP_INTERVAL
  );

  // Refresh the combination
  const refreshCombination = () => {
    setRandomCombination(getRandomCombination(selectedLevel));
  };

  // useEffect to set the random combination when the component mounts
  useEffect(() => {
    setRandomCombination(getRandomCombination(selectedLevel));
  }, [selectedLevel]);
  const isStartOfFirstRound = currentRound === 1 && currentInterval === 1 &&
  countdown === INTERVAL_TIME;
  const isEndOfAnInterval = countdown === 1 && countdownType === "interval" &&
      !(currentInterval === INTERVALS_PER_ROUND);
  const isEndOfRestPeriod = countdown === 1 &&
      countdownType === "rest" &&
      currentRound !== NUMBER_OF_ROUNDS;
  const isEndOfRound = countdown <= 3 &&
      countdownType === "interval" &&
      currentInterval === INTERVALS_PER_ROUND;
  const isEndOfWorkout = countdownType === "rest" && currentRound === NUMBER_OF_ROUNDS;
  // useEffect for the timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      // Play a beep at the start of the first round
      if (isStartOfFirstRound) {
        console.log("Start of first round - Beep")
        playBeep(1200, 750, 1, 1);
      }
      timer = setTimeout(() => {
        if (countdown > 0) {
          setCountdown(countdown - 1);
          // At the end of an interval
          if (isEndOfAnInterval) {
            console.log("End of an interval - Beep")
            playBeep(900, 750, 1, 1);
          }
          // At the end of a rest period
          if (isEndOfRestPeriod) {
            console.log("End of rest period - Beep")
            playBeep(1200, 750, 1, 1);
          }
        } else {
          // Play three overlapping beeps at the end of a round
          if (isEndOfRound) {
            console.log("End of a round - Beep Beep Beep")
            playBeep(600, 750, 1, 1, 400);
          }
          // At the end of the full workout
          if (isEndOfWorkout) {
            console.log("End of full workout - Beep")
            playBeep(900, 750, 1, 2, 100); // Long beeps
          }
          // Logic to set countdown duration based on type
          const currentIntervalType = countdownType === "interval" ? INTERVAL_TIME : REST_TIME
          setCountdown(currentIntervalType);

          // Fetch new combination only if it's not a rest period
          const isCurrentInterval = countdownType === "interval"
          if (isCurrentInterval) {
            setRandomCombination(getRandomCombination(selectedLevel));
          }

          // Logic for intervals, rounds, and rest periods
          const isNextIntervalInRound = currentInterval < INTERVALS_PER_ROUND &&
          countdownType === "interval";
          const isNextRestPeriod = currentInterval === INTERVALS_PER_ROUND &&
          countdownType === "interval";
          const isFirstRoundInterval = countdownType === "rest" &&
          currentRound < NUMBER_OF_ROUNDS;
          if (isNextIntervalInRound) {
            console.log("Increase interval count + 1")
            setCurrentInterval(currentInterval + 1);
          } else if (isNextRestPeriod) {
            console.log("Change to rest period")
            setIsResting(true);
            setCountdownType("rest");
          } else if (isFirstRoundInterval) {
            console.log("Reset intervals after rest")
            setIsResting(false);
            setCountdownType("interval");
            setCurrentInterval(1);
            setCurrentRound(currentRound + 1);
          }
        }
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [
    countdown,
    currentRound,
    currentInterval,
    isTimerRunning,
    countdownType,
    selectedLevel
  ]);

  // useEffect for the action beep
  useEffect(() => {
    let actionBeepTimer: NodeJS.Timeout | null = null;

    // Function to set a random timeout and then play the action beep
    const setRandomActionBeep = () => {
      // Get a random time between minActionBeepInterval and maxActionBeepInterval
      const randomTime =
        Math.random() * (maxActionBeepInterval - minActionBeepInterval) +
        minActionBeepInterval;

      actionBeepTimer = setTimeout(() => {
        const isActionBeepModeActive = isActionBeepRunning && !isResting && isActionBeepEnabled;
        if (isActionBeepModeActive) {
          playBeep(100, 500, 1, 1); // Modify these parameters as per your beep function
          setRandomActionBeep(); // Set the next random beep
        }
      }, randomTime);
    };
    const isRunningInterval = isTimerRunning && !isResting;
    if (isRunningInterval) {
      setIsActionBeepRunning(true);
      setRandomActionBeep();
    } else {
      setIsActionBeepRunning(false);
    }

    return () => {
      if (actionBeepTimer) {
        clearTimeout(actionBeepTimer);
      }
    };
  }, [
    isActionBeepRunning,
    isTimerRunning,
    isResting,
    minActionBeepInterval,
    maxActionBeepInterval,
    isActionBeepEnabled
  ]);

  // Function to toggle timer
  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  // Function to reset the timer
  const resetTimer = () => {
    setIsTimerRunning(false); // Stop the timer
    setCurrentRound(INITIAL_ROUND); // Reset to round 1
    setCurrentInterval(INITIAL_INTERVAL); // Reset to interval 1
    setIsResting(INITIAL_IS_RESTING); // Not resting
    setCountdown(INTERVAL_TIME); // Reset countdown to 60 seconds
    setCountdownType(INITIAL_COUNTDOWN_TYPE); // Set type to interval
    setRandomCombination(getRandomCombination(selectedLevel)); // Fetch a new random combination
  };

  // Function to replay the current interval
  const replayInterval = () => {
    setCountdown(INTERVAL_TIME);
  };

  // Determine if the Reset button should be displayed
  const shouldShowResetButton =
    isTimerRunning ||
    currentRound > 1 ||
    currentInterval > 1 ||
    countdown < (countdownType === "interval" ? INTERVAL_TIME : REST_TIME);

  // Determine if the Replay button should be displayed
  const shouldShowReplayButton =
    isTimerRunning ||
    currentInterval > 1 ||
    countdown < (countdownType === "interval" ? INTERVAL_TIME : REST_TIME);

  return (
    <div className={`App ${isResting ? "is-rest" : "is-work"}`}>
      <ControlButtons
        toggleTimer={toggleTimer}
        resetTimer={resetTimer}
        replayInterval={replayInterval}
        isTimerRunning={isTimerRunning}
        shouldShowResetButton={shouldShowResetButton}
        shouldShowReplayButton={shouldShowReplayButton}
      />
      {randomCombination ? (
        <DisplayCombination
          combination={randomCombination}
          refreshCombination={refreshCombination}
          isResting={isResting}
        />
      ) : (
        <p>Loading...</p>
      )}

      <TimerDisplay
        currentRound={currentRound}
        numberOfRounds={NUMBER_OF_ROUNDS}
        currentInterval={currentInterval}
        intervalsPerRound={INTERVALS_PER_ROUND}
        isResting={isResting}
        countdown={countdown}
      />
      <SettingsPanel
        setSelectedLevel={setSelectedLevel}
        isActionBeepEnabled={isActionBeepEnabled}
        setIsActionBeepEnabled={setIsActionBeepEnabled}
      />
    </div>
  );
};

export default App;
