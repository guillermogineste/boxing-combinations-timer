import React from "react";
import { AdditiveSet } from "../../types";

interface DisplayAdditiveSetProps {
  additiveSet: AdditiveSet | null;
  refreshCombination: () => void;
  isResting: boolean;
  currentInterval: number;
}

const DisplayAdditiveSet: React.FC<DisplayAdditiveSetProps> = ({
  additiveSet,
  refreshCombination,
  isResting,
  currentInterval,
}) => {
  if (!additiveSet) {
    return <div>No data available</div>;
  }

  const setsArray = [additiveSet.set1, additiveSet.set2, additiveSet.set3];

  const renderSet = (set: Array<{ description: string }>, index: number) => (
    <div key={index}>
      {set.map((item, idx) => (
        <h1
          className={`heading heading--1 additive-set ${
            currentInterval === index + 1 ? "additive-set--active" : ""
          }`}
          key={idx}
        >
          {item.description}
        </h1>
      ))}
    </div>
  );

  return (
    <div className="display-combination">
      {!isResting &&
        setsArray
          .slice(0, currentInterval)
          .map((set, index) => renderSet(set, index))}
      {isResting && <h1 className={`heading heading--1`}>Rest</h1>}
      {!isResting && (
        <button className="button button--refresh" onClick={refreshCombination}>
          Refresh
        </button>
      )}
    </div>
  );
};

export default DisplayAdditiveSet;
