import React from "react";
import { ReactComponent as SyncIcon } from "../../icons/sync.svg";
import { Tooltip, VStack } from "@chakra-ui/react";

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
    <VStack 
    className={`display-combination--${
      isTimerRunning === true ? "running" : "paused"
    }`}
    minHeight={"230px"}
    justifyContent={"center"}
    >
      <h1 className="heading heading--1 combination">{displayText}</h1>
      {!isResting && (
        <Tooltip label="Refresh combination" bg={tooltipBg} px="3" py="2">
          <button className="button button--refresh" onClick={refreshCombination}>
            <SyncIcon />
          </button>
        </Tooltip>
      )}
    </VStack>
  );
};

export default DisplayCombination;
