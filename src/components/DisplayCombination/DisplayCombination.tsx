import React from "react";
import { ReactComponent as SyncIcon } from "../../icons/sync.svg";
import { Tooltip, VStack, Heading } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";

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
  const theme = useTheme();
  let displayText = isResting ? "~ Rest ~" : combination.description;
  const tooltipBg = isResting ? "#182d6c" : "#650d08";
  
  return (
    <VStack 
    className={`display-combination--${
      isTimerRunning === true ? "running" : "paused"
    }`}
    minHeight={"clamp(200px, 23vh, 300px)"}
    justifyContent={"center"}
    >
      <Heading 
        opacity={theme.resting[String(isTimerRunning)]} 
        as='h1'
        size="2x"
        className="heading heading--1 combination"
      >
          {displayText}
      </Heading>
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
