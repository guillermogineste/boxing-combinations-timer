import { useState, useEffect } from "react";
import { playBeep } from "../utils/playBeep";
import { SPEED_SETTINGS, INITIAL_MIN_ACTION_BEEP_INTERVAL, INITIAL_MAX_ACTION_BEEP_INTERVAL } from '../constants';

export const useActionBeep = (isTimerRunning: boolean, isResting: boolean) => {
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

  useEffect(() => {
    let actionBeepTimer: NodeJS.Timeout | null = null;

    /**
     * Sets a random interval for the action beep.
     * The function calculates a random time between the minimum and maximum beep intervals,
     * and sets a timeout to play a beep sound if the action beep mode is active.
     * It recursively calls itself to continue setting random intervals.
     */
    const setRandomActionBeep = () => {
      const randomTime =
        Math.random() * (maxActionBeepInterval - minActionBeepInterval) +
        minActionBeepInterval;

      actionBeepTimer = setTimeout(() => {
        const isActionBeepModeActive =
          isActionBeepRunning && !isResting && isActionBeepEnabled;
        if (isActionBeepModeActive) {
          playBeep(100, 500, 0.065, 1);
          setRandomActionBeep();
        }
      }, randomTime);
    };

    // Check if the timer is running and not in resting state
    const isRunningInterval = isTimerRunning && !isResting;
    if (isRunningInterval) {
      setIsActionBeepRunning(true);
      setRandomActionBeep();
    } else {
      setIsActionBeepRunning(false);
    }

    // Cleanup the timer on component unmount or when dependencies change
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
    // Update the beep intervals based on the selected speed
    const speedSettings = SPEED_SETTINGS[selectedSpeed];
    setMinActionBeepInterval(speedSettings.min);
    setMaxActionBeepInterval(speedSettings.max);

    // Enable or disable the action beep based on the selected speed
    if (selectedSpeed === "off") {
      setIsActionBeepEnabled(false);
    } else {
      setIsActionBeepEnabled(true);
    }
  }, [selectedSpeed]);

  return {
    isActionBeepEnabled,
    setIsActionBeepEnabled,
    selectedSpeed,
    setSelectedSpeed
  };
};