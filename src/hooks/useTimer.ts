import { useState, useEffect } from "react";
import { resetUsedCombinations, getRandomCombinationAsync } from "../utils/getRandomCombination";
import { getRandomSetAsync, resetUsedSets } from "../utils/getRandomSet";
import { playBeep } from "../utils/playBeep";
import {
    REST_TIME,
    INTERVALS_PER_ROUND,
    INTERVAL_TIME,
    INITIAL_ROUND,
    INITIAL_INTERVAL,
    INITIAL_IS_RESTING,
    INITIAL_COUNTDOWN_TYPE,
    NUMBER_OF_ROUNDS,
    DEBUG_MODE
} from '../constants';
import { Combination, AdditiveSet, FocusItem } from "../types";
import { getRandomFocusItem } from "../utils/getRandomFocusItem";

/**
* Custom hook to manage a workout timer with intervals and rest periods.
* 
* @param setCurrentCombination - Function to set the current combination.
* @param setCurrentAdditiveSet - Function to set the current additive set.
* @param selectedStance - The selected stance ("both" | "orthodox" | "southpaw").
* @param numberOfRounds - The number of rounds for the workout.
* @param setCurrentFocusItem - Function to set the current focus item.
* 
* @returns {
*   currentRound: number,                          // The current round number.
*   setCurrentFocusItem: (focusItem: FocusItem | null) => void, // Function to set the current focus item.
*   setCurrentRound: (round: number) => void,      // Function to set the current round number.
*   currentInterval: number,                       // The current interval number.
*   setCurrentInterval: (interval: number) => void,// Function to set the current interval number.
*   isResting: boolean,                            // Boolean indicating if the timer is in a rest period.
*   setIsResting: (isResting: boolean) => void,    // Function to set the resting state.
*   countdown: number,                             // The current countdown value.
*   setCountdown: (countdown: number) => void,     // Function to set the countdown value.
*   isTimerRunning: boolean,                       // Boolean indicating if the timer is running.
*   toggleTimer: () => void,                       // Function to toggle the timer on and off.
*   resetTimer: () => void,                        // Function to reset the timer to its initial state.
*   replayInterval: () => void,                    // Function to replay the current interval.
*   setIsTimerRunning: (isRunning: boolean) => void, // Function to set the timer running state.
*   countdownType: "interval" | "rest",            // The type of countdown ("interval" or "rest").
*   setCountdownType: (type: "interval" | "rest") => void, // Function to set the countdown type.
*   intervalTime: number,                          // The duration of an interval.
*   restTime: number,                              // The duration of a rest period.
*   totalWorkoutDuration: number                   // The total duration of the workout.
* }
*/


export const useTimer = (
    setCurrentCombination: (combination: Combination | null) => void,
    setCurrentAdditiveSet: (set: AdditiveSet | null) => void,
    selectedStance: "both" | "orthodox" | "southpaw",
    numberOfRounds: number,
    setCurrentFocusItem: (focusItem: FocusItem | null) => void,
    restTime: number
) => {

    const noSleep = new NoSleep();

    const intervalTime = DEBUG_MODE ? 4 : INTERVAL_TIME;


    const [currentRound, setCurrentRound] = useState(1);
    const [currentInterval, setCurrentInterval] = useState(1);
    const [isResting, setIsResting] = useState(false);
    const [countdown, setCountdown] = useState(intervalTime);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [countdownType, setCountdownType] = useState<"interval" | "rest">(
        "interval",
    );

    const [totalWorkoutDuration, setTotalWorkoutDuration] = useState(NUMBER_OF_ROUNDS * intervalTime * INTERVALS_PER_ROUND + (NUMBER_OF_ROUNDS - 1) * restTime);

    /**
     * Toggles the timer on and off.
     * Enables or disables the NoSleep functionality based on the timer state.
     */
    const toggleTimer = () => {
        setIsTimerRunning(!isTimerRunning);
        if (!isTimerRunning) {
            noSleep.enable();
        } else {
            noSleep.disable();
        }
    };

    /**
     * Resets the timer to its initial state.
     * Stops the timer, resets rounds, intervals, resting state, and countdown.
     * Fetches new random combinations, sets, and focus items.
     */
    const resetTimer = () => {
        setIsTimerRunning(false); // Stop the timer
        setCurrentRound(INITIAL_ROUND); // Reset to round 1
        setCurrentInterval(INITIAL_INTERVAL); // Reset to interval 1
        setIsResting(INITIAL_IS_RESTING); // Not resting
        setCountdown(intervalTime); // Reset countdown to 60 seconds
        setCountdownType(INITIAL_COUNTDOWN_TYPE); // Set type to interval
        getRandomCombinationAsync(selectedStance).then(setCurrentCombination); // Fetch a new random combination
        getRandomSetAsync(selectedStance).then(setCurrentAdditiveSet); // Fetch a new random set
        getRandomFocusItem().then(setCurrentFocusItem);
        resetUsedCombinations();
        resetUsedSets();
    };

    /**
     * Replays the current interval by resetting the countdown.
     */
    const replayInterval = () => {
        setCountdown(intervalTime);
    };

    /**
     * Checks various conditions related to the timer state.
     * Returns an object with boolean values indicating the state of the timer.
     */
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
            countdown === intervalTime,
        isEndOfAnInterval:
            countdown === 1 &&
            countdownType === "interval" &&
            !(currentInterval === INTERVALS_PER_ROUND),
        isEndOfRestPeriod:
            countdown === 1 &&
            countdownType === "rest" &&
            currentRound !== NUMBER_OF_ROUNDS,
        isAlmostEndOfRound:
            countdown <= 3 &&
            countdownType === "interval" &&
            currentInterval === INTERVALS_PER_ROUND,
        isEndOfWorkout:
            countdown === 1 &&
            countdownType === "interval" &&
            currentInterval === INTERVALS_PER_ROUND &&
            currentRound === NUMBER_OF_ROUNDS,
        isNextIntervalInRound:
            currentInterval < INTERVALS_PER_ROUND && countdownType === "interval",
        isNextRestPeriod:
            currentInterval === INTERVALS_PER_ROUND &&
            countdownType === "interval" &&
            currentRound !== NUMBER_OF_ROUNDS,
        isFirstRoundInterval:
            countdownType === "rest" && currentRound < NUMBER_OF_ROUNDS,
    });

    useEffect(() => {
        setTotalWorkoutDuration(
            numberOfRounds * intervalTime * INTERVALS_PER_ROUND + (numberOfRounds - 1) * restTime
        );
    }, [numberOfRounds, restTime]);

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
                playBeep(1200, 650, 0.08, 1);
            }
            timer = setTimeout(() => {
                if (countdown > 0) {
                    setCountdown(countdown - 1);
                    conditions.isEndOfAnInterval && playBeep(700, 650, 0.08, 1);
                    conditions.isEndOfRestPeriod && playBeep(1200, 650, 0.08, 1);
                    conditions.isEndOfWorkout && playBeep(800, 700, 0.06, 2, 100, 1);
                    conditions.isAlmostEndOfRound && playBeep(500, 700, 0.045, 1, 400);
                } else {
                    const newCountdownDuration =
                        countdownType === "interval" ? intervalTime : restTime;
                    setCountdown(newCountdownDuration);

                    if (countdownType === "interval") {
                        getRandomCombinationAsync(selectedStance).then(setCurrentCombination);
                    }

                    if (conditions.isNextIntervalInRound) {
                        setCurrentInterval(currentInterval + 1);
                    } else if (conditions.isNextRestPeriod) {
                        setIsResting(true);
                        setCountdownType("rest");
                        setCountdown(restTime);
                    } else if (conditions.isFirstRoundInterval) {
                        setIsResting(false);
                        setCountdownType("interval");
                        setCurrentInterval(1);
                        setCurrentRound(currentRound + 1);
                        getRandomSetAsync(selectedStance).then(setCurrentAdditiveSet);
                        getRandomFocusItem().then(setCurrentFocusItem);
                    } else {
                        // End of workout
                        setIsTimerRunning(false);
                        setCurrentRound(INITIAL_ROUND);
                        setCurrentInterval(INITIAL_INTERVAL);
                        setIsResting(INITIAL_IS_RESTING);
                        setCountdown(intervalTime);
                        setCountdownType(INITIAL_COUNTDOWN_TYPE);
                        getRandomCombinationAsync(selectedStance).then(setCurrentCombination);
                        getRandomSetAsync(selectedStance).then(setCurrentAdditiveSet);
                        getRandomFocusItem().then(setCurrentFocusItem);
                        resetUsedCombinations();
                        resetUsedSets();
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
        countdownType
    ]);

    return {
        currentRound,
        setCurrentFocusItem,
        setCurrentRound,
        currentInterval,
        setCurrentInterval,
        isResting,
        setIsResting,
        countdown,
        setCountdown,
        isTimerRunning,
        toggleTimer,
        resetTimer,
        replayInterval,
        setIsTimerRunning,
        countdownType,
        setCountdownType,
        intervalTime,
        restTime,
        totalWorkoutDuration
    };
};