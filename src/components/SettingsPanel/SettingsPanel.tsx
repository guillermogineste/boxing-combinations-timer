import React, { useState, useEffect } from "react";
import Select, { StylesConfig, Theme } from "react-select";

import { ReactComponent as ExitFullScreenIcon } from "../../icons/fullscreen_exit.svg";
import { ReactComponent as FullScreenIcon } from "../../icons/fullscreen.svg";
import { ReactComponent as ExpandIcon } from "../../icons/expand.svg";
import { ReactComponent as CollapseIcon } from "../../icons/collapse.svg";

import { Tooltip, HStack, Grid } from "@chakra-ui/react";

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
  totalWorkoutDuration: number;
  setNumberOfRounds: React.Dispatch<React.SetStateAction<number>>;
  selectedStance: "orthodox" | "southpaw" | "both";
  setSelectedStance: (stance: "orthodox" | "southpaw" | "both") => void;
  isResting: boolean;
  isTimerRunning: boolean;
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
  { value: "Random", label: "Single interval" },
  { value: "Additive", label: "Additive round" },
];

const customStyles: StylesConfig<OptionType, false> = {
  control: (provided, state) => ({
    ...provided,
    color: "white",
    cursor: "pointer",
    padding: "4px 4px",
    fontSize: "16px",
    borderRadius: "6px",
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
    borderRadius: "6px",
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

const stanceOptions = [
  { value: "orthodox", label: "Orthodox" },
  { value: "southpaw", label: "Southpaw" },
  { value: "both", label: "Both" }
];

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  setSelectedLevel,
  isActionBeepEnabled,
  setIsActionBeepEnabled,
  isAdditiveModeEnabled,
  setIsAdditiveModeEnabled,
  setSelectedSpeed,
  numberOfRounds,
  setNumberOfRounds,
  totalWorkoutDuration,
  selectedStance,
  setSelectedStance,
  isResting,
  isTimerRunning
}) => {

  const tooltipBg = isResting ? "#182d6c" : "#650d08";

  const [isFullScreen, setIsFullScreen] = useState(!!document.fullscreenElement);
  const [isSettingsCollapsed, setIsSettingsCollapsed] = useState(false);


  const [lastToggle, setLastToggle] = useState(Date.now());

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isTimerRunning && Date.now() - lastToggle > 2000) {
      timeoutId = setTimeout(() => {
        setIsSettingsCollapsed(true);
      }, 2000); // 2 seconds delay
    }
  
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isTimerRunning, lastToggle]);

  useEffect(() => {
    if (!isTimerRunning) {
      setIsSettingsCollapsed(false);
    }
  }, [isTimerRunning]);

  const toggleSettings = () => {
    setIsSettingsCollapsed(!isSettingsCollapsed);
    setLastToggle(Date.now());
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);


  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };


  return (
    <HStack className="settings-container" gridTemplateColumns={"1fr auto"} gap={"3vw"} alignItems={"end"} width={"100%"}>
      <HStack className="settings-panel" alignItems={"end"} justifyContent={"flex-start"} flex={"1"}>
        <Grid className={`settings ${isSettingsCollapsed ? "settings--collapsed" : ""}`} gridTemplateColumns={"repeat(4, 1fr)"} gap={"3vw"}>
          <div className="selector selector--rounds">
            <label htmlFor="rounds-input">Rounds</label>
            <div className="sufix-input">
              <input
                id="rounds-input"
                type="number"
                value={numberOfRounds}
                onChange={(e) => setNumberOfRounds(Number(e.target.value))}
                min="1"
                className="rounds-input"
              />
              <span className="sufix">{Math.floor(totalWorkoutDuration / 60)} min</span>
            </div>
          </div>
          {/* <div className="selector selector--level">
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
      </div> */}
          <div className="selector selector--stance">
            <label htmlFor="stance-select">Stance</label>
            <Select
              id="stance-select"
              options={stanceOptions}
              className="dropdown"
              styles={customStyles}
              isSearchable={false}
              value={stanceOptions.find(option => option.value === selectedStance)}
              onChange={(selectedOption: OptionType | null) => {
                if (selectedOption) {
                  setSelectedStance(selectedOption.value as "orthodox" | "southpaw" | "both");
                }
              }}
            />
          </div>
          <div className="selector selector--mode">
            <label htmlFor="mode-select">Mode</label>
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
        </Grid>

        <Tooltip label={isSettingsCollapsed ? "Expand settings" : "Collapse settings"} bg={tooltipBg} px="3" py="2" placement='top'>
          <button className="button button--expand" onClick={toggleSettings}>
            {isSettingsCollapsed ? <ExpandIcon /> : <CollapseIcon />}
          </button>
        </Tooltip>
      </HStack>

      <Tooltip label={isFullScreen ? "Exit full screen" : "Full screen"} bg={tooltipBg} px="3" py="2" placement='top'>
        <button className="button button--full-screen" onClick={toggleFullScreen}>
          {isFullScreen ? <ExitFullScreenIcon /> : <FullScreenIcon />}
        </button>
      </Tooltip>
    </HStack>
  );
};

export default SettingsPanel;
