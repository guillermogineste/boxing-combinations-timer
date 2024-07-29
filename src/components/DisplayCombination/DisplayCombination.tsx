import React from "react";
import { ReactComponent as SyncIcon } from "../../icons/sync.svg";
import { Tooltip, VStack, Heading } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";

interface Combination {
  description: string;
}

interface DisplayCombinationProps {
  combination: Combination | null;
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
  let displayText = isResting ? "~ Rest ~" : combination?.description || "Loading...";
  const tooltipBg = isResting ? "#182d6c" : "#650d08";

  return (
    <VStack
      data-testid="display-combination"
      minHeight={"clamp(200px, 23vh, 300px)"}
      justifyContent={"center"}
    >
      <Heading
        opacity={theme.resting[String(isTimerRunning)]}
        as='h1'
        size={{ base: "3xl", md: "3xl"}}
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
