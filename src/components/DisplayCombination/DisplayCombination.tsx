import React from "react";
import { ReactComponent as SyncIcon } from "../../icons/sync.svg";
import { ReactComponent as StanceOrthodoxIcon } from "../../icons/stance-orthodox.svg";
import { ReactComponent as StanceSouthpawIcon } from "../../icons/stance-southpaw.svg";
import { Tooltip } from "@chakra-ui/react";

interface Combination {
  description: string;
}

interface DisplayCombinationProps {
  combination: Combination;
  refreshCombination: () => void;
  isResting: boolean;
  isTimerRunning: boolean;
}

const DisplayCombination: React.FC<DisplayCombinationProps> = ({
  combination,
  refreshCombination,
  isResting,
  isTimerRunning
}) => {
  let displayText = combination.description;

  if (isResting) {
    displayText = "Rest";
  }

  const tooltipBg = isResting ? "#182d6c" : "#650d08";

  return (
    <div className={`display-combination display-combination--${
      isTimerRunning === true ? "running" : "paused"
    }`}>
      <h1 className="heading heading--1 combination">{displayText}</h1>
      {!isResting && (
        <Tooltip label="Refresh combination" bg={tooltipBg} px="3" py="2">
          <button className="button button--refresh" onClick={refreshCombination}>
            <SyncIcon />
          </button>
        </Tooltip>
      )}
    </div>
  );
};

export default DisplayCombination;
