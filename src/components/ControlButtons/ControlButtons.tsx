import { ReactComponent as PlayIcon } from "../../icons/play_arrow.svg";
import { ReactComponent as PauseIcon } from "../../icons/pause.svg";
import { ReactComponent as ReplayIcon } from "../../icons/replay.svg";
import { ReactComponent as StopIcon } from "../../icons/stop.svg";

import { HStack } from "@chakra-ui/react";

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
    <HStack justifyContent={"center"} gap={"3vw"}>
      {shouldShowReplayButton && (
        <button className="button button--replay" onClick={replayInterval}>
          <ReplayIcon /><span>Replay</span>
        </button>
      )}
      <button className="button button--toggle" onClick={toggleTimer}>
        {isTimerRunning ?
          (<><PauseIcon /><span>Pause</span></>) :
          (<><PlayIcon /><span>Play</span></>)
        }
      </button>
      {shouldShowResetButton && (
        <button className="button button--reset" onClick={resetTimer}>
          <StopIcon /><span>Stop</span>
        </button>
      )}
    </HStack>
  );
};

export default ControlButtons;
