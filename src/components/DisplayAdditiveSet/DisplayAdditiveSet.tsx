import React from "react";
import { AdditiveSet } from "../../types";
import { ReactComponent as SyncIcon } from "../../icons/sync.svg";
import { Tooltip, VStack, Heading, useTheme } from "@chakra-ui/react";


interface DisplayAdditiveSetProps {
  additiveSet: AdditiveSet | null;
  refreshCombination: () => void;
  isResting: boolean;
  currentInterval: number;
  isTimerRunning: boolean;
}

const DisplayAdditiveSet: React.FC<DisplayAdditiveSetProps> = ({
  additiveSet,
  refreshCombination,
  isResting,
  currentInterval,
  isTimerRunning
}) => {
  if (!additiveSet) {
    return <div>No data available</div>;
  }

  const tooltipBg = isResting ? "#182d6c" : "#650d08";
  const setsArray = [additiveSet.set1, additiveSet.set2, additiveSet.set3];
  const theme = useTheme();

  const renderSet = (set: string, index: number) => (
    <div key={index}>
      {additiveSet ?
        <Heading
          opacity={theme.resting[String(isTimerRunning)]}
          as='h1'
          size="2xl"
        >
          {set}
        </Heading>
        :
        <Heading
          opacity={theme.resting[String(isTimerRunning)]}
          as='h1'
          size="2xl"
        >
          Loading...
        </Heading>
      }

    </div>
  );

  return (
    <VStack className={`display-combination--${isTimerRunning === true ? "running" : "paused"
      }`}>
      {!isResting &&
        setsArray
          .slice(0, currentInterval)
          .map((set, index) => renderSet(set, index))}
      {isResting && <h1 className={`heading heading--1`}>~ Rest ~</h1>}
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

export default DisplayAdditiveSet;
