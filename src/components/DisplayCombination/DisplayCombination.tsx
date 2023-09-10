import React from "react";

interface Combination {
  description: string;
}

interface DisplayCombinationProps {
  combination: Combination;
  refreshCombination: () => void;
  isResting: boolean;
}

const DisplayCombination: React.FC<DisplayCombinationProps> = ({
  combination,
  refreshCombination,
  isResting
}) => {
  let displayText = combination.description;

  if (isResting) {
    displayText = "Rest";
  }

  return (
    <div className="display-combination">
      <h1 className="heading heading--1 combination">{displayText}</h1>
      {!isResting && (
        <button className="button button--refresh" onClick={refreshCombination}>
          Refresh
        </button>
      )}
    </div>
  );
};

export default DisplayCombination;
