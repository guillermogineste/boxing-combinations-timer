interface ControlButtonsProps {
  toggleTimer: () => void;
  resetTimer: () => void;
  replayInterval: () => void;
  isTimerRunning: boolean;
  shouldShowResetButton: boolean;
  shouldShowReplayButton: boolean;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  toggleTimer,
  resetTimer,
  replayInterval,
  isTimerRunning,
  shouldShowResetButton,
  shouldShowReplayButton
}) => {
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
