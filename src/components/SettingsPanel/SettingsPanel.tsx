import React from "react";
import Select, { StylesConfig, Theme } from "react-select";

interface SettingsPanelProps {
  setSelectedLevel: React.Dispatch<
    React.SetStateAction<"simple" | "advanced" | "both">
  >;
  setSelectedSpeed: React.Dispatch<
    React.SetStateAction<"off" | "fast" | "medium" | "slow">
  >;
  isActionBeepEnabled: boolean;
  setIsActionBeepEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  isAdditiveModeEnabled: boolean;
  setIsAdditiveModeEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  numberOfRounds: number;
  setNumberOfRounds: React.Dispatch<React.SetStateAction<number>>;
}

interface OptionType {
  value: string;
  label: string;
}

const levelOptions = [
  { value: "simple", label: "Simple" },
  { value: "advanced", label: "Advanced" },
  { value: "both", label: "Both" },
];

const speedOptions = [
  { value: "off", label: "Off" },
  { value: "fast", label: "Fast" },
  { value: "medium", label: "Medium" },
  { value: "slow", label: "Slow" },
];

const modeOptions = [
  { value: "Random", label: "Random" },
  { value: "Additive", label: "Additive" },
];

const customStyles: StylesConfig<OptionType, false> = {
  control: (provided, state) => ({
    ...provided,
    color: "white",
    cursor: "pointer",
    padding: "4px 4px",
    fontSize: "16px",
    borderRadius: "4px",
    fontFamily: '"IBM Plex Mono", monospace',
    fontWeight: "500",
    background: "transparent",
    border: "2px solid white",
    "&:hover": {
      backgroundColor: "#650d08",
    },
    opacity: state.isDisabled ? 0.5 : 1,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
    textAlign: "left",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "4px",
    fontWeight: "500",
    background: "#a33934",
    border: "2px solid white",
    textAlign: "left",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "white",
    "&:hover": {
      color: "white",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    padding: "16px",
    color: "white",
    backgroundColor: state.isSelected ? "#650d08" : "transparent",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#650d08",
      color: "#fff",
    },
  }),
};

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  setSelectedLevel,
  isActionBeepEnabled,
  setIsActionBeepEnabled,
  isAdditiveModeEnabled,
  setIsAdditiveModeEnabled,
  setSelectedSpeed,
  numberOfRounds,
  setNumberOfRounds
}) => {
  const handleModeChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      setIsAdditiveModeEnabled(selectedOption.value === "Additive");
    }
  };
  return (
    <div className="settings">
      <div className="selector selector--rounds">
        <label htmlFor="rounds-input">Rounds</label>
        <input
          id="rounds-input"
          type="number"
          value={numberOfRounds}
          onChange={(e) => setNumberOfRounds(Number(e.target.value))}
          min="1"
          className="rounds-input"
        />
    </div>
      <div className="selector selector--level">
        <label htmlFor="level-select">Difficulty</label>
        <Select
          id="level-select"
          options={levelOptions}
          className="dropdown"
          styles={customStyles}
          isSearchable={false}
          isDisabled={isAdditiveModeEnabled}
          defaultValue={levelOptions[0]}
          onChange={(selectedOption: OptionType | null) => {
            if (selectedOption) {
              setSelectedLevel(
                selectedOption.value as "simple" | "advanced" | "both",
              );
            }
          }}
        />
      </div>
      <div className="selector selector--mode">
        <label htmlFor="mode-select">Combination mode</label>
        <Select
          id="mode-select"
          options={modeOptions}
          className="dropdown"
          styles={customStyles}
          isSearchable={false}
          value={modeOptions.find(
            (option) =>
              option.value === (isAdditiveModeEnabled ? "Additive" : "Random"),
          )}
          onChange={(selectedOption: OptionType | null) => {
            if (selectedOption) {
              setIsAdditiveModeEnabled(selectedOption.value === "Additive");
            }
          }}
        />
      </div>
      <div className="selector selector--speed">
        <label htmlFor="speed-select">Action beep</label>
        <Select
          id="speed-select"
          options={speedOptions}
          defaultValue={speedOptions[0]}
          className="dropdown"
          styles={customStyles}
          isSearchable={false}
          onChange={(selectedOption: OptionType | null) => {
            if (selectedOption) {
              setSelectedSpeed(
                selectedOption.value as "off" | "fast" | "medium" | "slow",
              );
            }
          }}
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
