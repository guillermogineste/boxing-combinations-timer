import React, { useState, useEffect } from "react";
// import Select, { StylesConfig, Theme } from "react-select";

import { ReactComponent as ExitFullScreenIcon } from "../../icons/fullscreen_exit.svg";
import { ReactComponent as FullScreenIcon } from "../../icons/fullscreen.svg";
import { ReactComponent as ExpandIcon } from "../../icons/expand.svg";
import { ReactComponent as CollapseIcon } from "../../icons/collapse.svg";
import { ReactComponent as SettingsIcon } from "../../icons/settings.svg";

import { Tooltip, HStack, Grid, FormControl, FormLabel, InputGroup, Input, InputRightAddon, Select } from "@chakra-ui/react";

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
  { value: "Random", label: "Single" },
  { value: "Additive", label: "Additive" },
];

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
        <Grid className={`settings ${isSettingsCollapsed ? "settings--collapsed" : ""}`} gridTemplateColumns={"auto repeat(3, 1fr)"} gap={"2vw"}>
          <FormControl>
            <FormLabel htmlFor="rounds-input">Rounds</FormLabel>
            <InputGroup size="lg">
              <Input
                id="rounds-input"
                type="number"
                value={numberOfRounds}
                onChange={(e) => setNumberOfRounds(Number(e.target.value))}
                min="1"
                placeholder="mysite"
                border={"2px solid white"}
                maxW={"64px"}
                fontWeight={"500"}
              />
              <InputRightAddon
                bg={"rgba(256,256,256, 0.1)"}
                border={"2px solid white"}
                borderLeft={0}
                fontSize={"sm"}
                children={`${Math.floor(totalWorkoutDuration / 60)} min`}
                cursor={"default"}
                fontWeight={"500"}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="stance-select">Stance</FormLabel>
            <Select
              id="stance-select"
              value={selectedStance}
              onChange={(e) => {
                setSelectedStance(e.target.value as "orthodox" | "southpaw" | "both");
              }}
              size='lg'
              border={"2px solid white"}
            >
              {stanceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="mode-select">Mode</FormLabel>
            <Select
              id="mode-select"
              value={isAdditiveModeEnabled ? "Additive" : "Random"}
              onChange={(e) => {
                setIsAdditiveModeEnabled(e.target.value === "Additive");
              }}
              size='lg'
              border={"2px solid white"}
            >
              {modeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="speed-select">Action beep</FormLabel>
            <Select
              id="speed-select"
              defaultValue="off"
              onChange={(e) => {
                setSelectedSpeed(e.target.value as "off" | "fast" | "medium" | "slow");
              }}
              size='lg'
              border={"2px solid white"}
            >
              {speedOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Tooltip label={isSettingsCollapsed ? "Expand settings" : "Collapse settings"} bg={tooltipBg} px="3" py="2" placement='top'>
          <button className="button button--expand" onClick={toggleSettings}>
            {isSettingsCollapsed ? <SettingsIcon /> : <CollapseIcon />}
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
