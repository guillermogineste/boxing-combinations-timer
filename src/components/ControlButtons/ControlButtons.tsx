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
}

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
  restTime
}) => {
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
  return (
    <div className="buttons">
      {shouldShowReplayButton && (
        <button className="button button--replay" onClick={replayInterval}>
          ⏮ Replay
        </button>
      )}
      <button className="button button--toggle" onClick={toggleTimer}>
        {isTimerRunning ? "⏸ Pause" : "⏵ Start"}
      </button>
      {shouldShowResetButton && (
        <button className="button button--reset" onClick={resetTimer}>
          ⏹ Finish
        </button>
      )}
    </div>
  );
};

export default ControlButtons;
