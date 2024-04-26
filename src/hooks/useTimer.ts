import { useState, useEffect } from "react";
import { getRandomCombination } from "../utils/getRandomCombination";
import { getRandomSet } from "../utils/getRandomSet";
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
import { Combination, AdditiveSet } from "../types";

export const useTimer = (
    setCurrentCombination: (combination: Combination | null) => void,
    setCurrentAdditiveSet: (set: AdditiveSet | null) => void,
    selectedLevel: "simple" | "advanced" | "both",
    selectedStance: "both" | "orthodox" | "southpaw",
    numberOfRounds: number) => {

    let intervalTime = INTERVAL_TIME;
    let restTime = REST_TIME;

    if (DEBUG_MODE) {
        intervalTime = 4;
        restTime = 4;
    }


    const [currentRound, setCurrentRound] = useState(1);
    const [currentInterval, setCurrentInterval] = useState(1);
    const [isResting, setIsResting] = useState(false);
    const [countdown, setCountdown] = useState(intervalTime);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [countdownType, setCountdownType] = useState<"interval" | "rest">(
        "interval",
    );

    const [totalWorkoutDuration, setTotalWorkoutDuration] = useState(NUMBER_OF_ROUNDS * intervalTime * INTERVALS_PER_ROUND + (NUMBER_OF_ROUNDS - 1) * restTime);

    const toggleTimer = () => {
        setIsTimerRunning(!isTimerRunning);
    };

    // Function to reset the timer
    const resetTimer = () => {
        setIsTimerRunning(false); // Stop the timer
        setCurrentRound(INITIAL_ROUND); // Reset to round 1
        setCurrentInterval(INITIAL_INTERVAL); // Reset to interval 1
        setIsResting(INITIAL_IS_RESTING); // Not resting
        setCountdown(intervalTime); // Reset countdown to 60 seconds
        setCountdownType(INITIAL_COUNTDOWN_TYPE); // Set type to interval
        setCurrentCombination(getRandomCombination(selectedLevel, selectedStance)); // Fetch a new random combination
        setCurrentAdditiveSet(getRandomSet(selectedStance)); // Fetch a new random set
    };

    // Function to replay the current interval
    const replayInterval = () => {
        setCountdown(intervalTime);
    };


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
        setTotalWorkoutDuration(numberOfRounds * intervalTime * INTERVALS_PER_ROUND + (numberOfRounds - 1) * restTime);
    }, [numberOfRounds]);

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
                        setCurrentCombination(getRandomCombination(selectedLevel, selectedStance));
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
                        setCurrentAdditiveSet(getRandomSet(selectedStance));
                    } else {
                        // End of workout
                        setIsTimerRunning(false);
                        setCurrentRound(INITIAL_ROUND);
                        setCurrentInterval(INITIAL_INTERVAL);
                        setIsResting(INITIAL_IS_RESTING);
                        setCountdown(INTERVAL_TIME);
                        setCountdownType(INITIAL_COUNTDOWN_TYPE);
                        setCurrentCombination(getRandomCombination(selectedLevel, selectedStance));
                        setCurrentAdditiveSet(getRandomSet(selectedStance));
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

    return {
        currentRound,
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