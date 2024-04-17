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

// Constants
const REST_TIME = 60;
const NUMBER_OF_ROUNDS = 12;
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
const SPEED_SETTINGS = {
  off: { min: 1200, max: 4000 },
  fast: { min: 900, max: 1600 },
  medium: { min: 1200, max: 4000 },
  slow: { min: 3000, max: 8000 },
};

const App: React.FC = () => {
  // Number of rounds
  const [numberOfRounds, setNumberOfRounds] = useState(NUMBER_OF_ROUNDS);
  const [totalWorkoutDuration, setTotalWorkoutDuration] = useState(numberOfRounds * INTERVAL_TIME * INTERVALS_PER_ROUND + (numberOfRounds - 1) * REST_TIME);
  // State to hold the random combination
  const [currentCombination, setCurrentCombination] =
    useState<Combination | null>(null);

  // Additive set
  const [isAdditiveModeEnabled, setIsAdditiveModeEnabled] = useState(false);
  // const [currentAdditiveInterval, setCurrentAdditiveInterval] = useState(1);
  const [currentAdditiveSet, setCurrentAdditiveSet] =
    useState<AdditiveSet | null>(null);

  // Countdown type
  const [countdownType, setCountdownType] = useState<"interval" | "rest">(
    "interval",
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
    INITIAL_MIN_ACTION_BEEP_INTERVAL,
  );
  const [maxActionBeepInterval, setMaxActionBeepInterval] = useState(
    INITIAL_MAX_ACTION_BEEP_INTERVAL,
  );
  const [selectedSpeed, setSelectedSpeed] = useState<
    "off" | "fast" | "medium" | "slow"
  >("off");

  // Refresh the combination
  const refreshCombination = () => {
    setCurrentCombination(getRandomCombination(selectedLevel));
    setCurrentAdditiveSet(getRandomSet());
  };

  // useEffect to set the random combination when the component mounts
  useEffect(() => {
    setCurrentCombination(getRandomCombination(selectedLevel));
    setCurrentAdditiveSet(getRandomSet());
  }, [selectedLevel]);

  useEffect(() => {
    const totalDuration = numberOfRounds * INTERVAL_TIME * INTERVALS_PER_ROUND + (numberOfRounds - 1) * REST_TIME;
    setTotalWorkoutDuration(totalDuration);
  }, [numberOfRounds]);

  const checkConditions = ({
    countdown,
    countdownType,
    currentInterval,
    currentRound,
  }: {
    countdown: number;
    countdownType: string;
    currentInterval: number;
    currentRound: number;
  }) => ({
    isStartOfFirstRound:
      currentRound === 1 &&
      currentInterval === 1 &&
      countdown === INTERVAL_TIME,
    isEndOfAnInterval:
      countdown === 1 &&
      countdownType === "interval" &&
      !(currentInterval === INTERVALS_PER_ROUND),
    isEndOfRestPeriod:
      countdown === 1 &&
      countdownType === "rest" &&
      currentRound !== numberOfRounds,
    isAlmostEndOfRound:
      countdown <= 3 &&
      countdownType === "interval" &&
      currentInterval === INTERVALS_PER_ROUND,
    isEndOfWorkout:
      countdown === 1 &&
      countdownType === "interval" &&
      currentInterval === INTERVALS_PER_ROUND &&
      currentRound === numberOfRounds,
    isNextIntervalInRound:
      currentInterval < INTERVALS_PER_ROUND && countdownType === "interval",
    isNextRestPeriod:
      currentInterval === INTERVALS_PER_ROUND &&
      countdownType === "interval" &&
      currentRound !== numberOfRounds,
    isFirstRoundInterval:
      countdownType === "rest" && currentRound < numberOfRounds,
  });

  // useEffect for the timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      const conditions = checkConditions({
        countdown,
        countdownType,
        currentInterval,
        currentRound,
      });
      if (conditions.isStartOfFirstRound) {
        playBeep(1200, 650, 0.05, 1);
      }
      timer = setTimeout(() => {
        if (countdown > 0) {
          setCountdown(countdown - 1);
          conditions.isEndOfAnInterval && playBeep(700, 650, 0.05, 1);
          conditions.isEndOfRestPeriod && playBeep(1200, 650, 0.05, 1);
          conditions.isEndOfWorkout && playBeep(800, 700, 0.06, 2, 100, 1);
          conditions.isAlmostEndOfRound && playBeep(500, 700, 0.045, 1, 400);
        } else {
          const newCountdownDuration =
            countdownType === "interval" ? INTERVAL_TIME : REST_TIME;
          setCountdown(newCountdownDuration);

          if (countdownType === "interval") {
            setCurrentCombination(getRandomCombination(selectedLevel));
          }

          if (conditions.isNextIntervalInRound) {
            setCurrentInterval(currentInterval + 1);
          } else if (conditions.isNextRestPeriod) {
            setIsResting(true);
            setCountdownType("rest");
            setCountdown(REST_TIME);
          } else if (conditions.isFirstRoundInterval) {
            setIsResting(false);
            setCountdownType("interval");
            setCurrentInterval(1);
            setCurrentRound(currentRound + 1);
            setCurrentAdditiveSet(getRandomSet());
          } else {
            // End of woekout
            setIsTimerRunning(false);
            setCurrentRound(INITIAL_ROUND);
            setCurrentInterval(INITIAL_INTERVAL);
            setIsResting(INITIAL_IS_RESTING);
            setCountdown(INTERVAL_TIME);
            setCountdownType(INITIAL_COUNTDOWN_TYPE);
            setCurrentCombination(getRandomCombination(selectedLevel));
            setCurrentAdditiveSet(getRandomSet());
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
    selectedLevel,
  ]);

  // Additive mode
  useEffect(() => {
    setCurrentAdditiveSet(getRandomSet());
  }, [isAdditiveModeEnabled]);

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
        const isActionBeepModeActive =
          isActionBeepRunning && !isResting && isActionBeepEnabled;
        if (isActionBeepModeActive) {
          playBeep(100, 500, 0.065, 1); // Modify these parameters as per your beep function
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
    isActionBeepEnabled,
  ]);

  useEffect(() => {
    const speedSettings = SPEED_SETTINGS[selectedSpeed];
    setMinActionBeepInterval(speedSettings.min);
    setMaxActionBeepInterval(speedSettings.max);

    if (selectedSpeed === "off") {
      setIsActionBeepEnabled(false);
    } else {
      setIsActionBeepEnabled(true);
    }
  }, [selectedSpeed]);

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
    setCurrentCombination(getRandomCombination(selectedLevel)); // Fetch a new random combination
    setCurrentAdditiveSet(getRandomSet()); // Fetch a new random set
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
      {currentCombination ? (
        isAdditiveModeEnabled ? (
          <DisplayAdditiveSet
            additiveSet={currentAdditiveSet}
            isResting={isResting}
            currentInterval={currentInterval}
            refreshCombination={refreshCombination}
          />
        ) : (
          <DisplayCombination
            combination={currentCombination}
            refreshCombination={refreshCombination}
            isResting={isResting}
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
      />
    </div>
  );
};

export default App;
