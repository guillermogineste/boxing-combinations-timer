import React, { useState, useEffect } from "react";

import { ReactComponent as ExitFullScreenIcon } from "../../icons/fullscreen_exit.svg";
import { ReactComponent as FullScreenIcon } from "../../icons/fullscreen.svg";
import { ReactComponent as CollapseIcon } from "../../icons/collapse.svg";
import { ReactComponent as SettingsIcon } from "../../icons/settings.svg";

import { Heading, Tooltip, HStack, Grid, FormControl, FormLabel, InputGroup, Input, InputRightAddon, Select, VStack,Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";

// Define the props for the SettingsPanel component
interface SettingsPanelProps {
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
  toggleTimer: () => void;
  isResting: boolean;
  isTimerRunning: boolean;
  restTime: number; // Add restTime prop
  setRestTime: React.Dispatch<React.SetStateAction<number>>; // Add setRestTime prop
}

// Options for speed, mode, and stance
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

const restOptions = [
  { value: 30, label: "30 Seconds" },
  { value: 60, label: "60 Seconds" },
];

// SettingsPanel component to manage workout settings
const SettingsPanel: React.FC<SettingsPanelProps> = ({
  // isActionBeepEnabled,
  // setIsActionBeepEnabled,
  isAdditiveModeEnabled,
  setIsAdditiveModeEnabled,
  setSelectedSpeed,
  numberOfRounds,
  setNumberOfRounds,
  totalWorkoutDuration,
  selectedStance,
  setSelectedStance,
  isResting,
  toggleTimer,
  isTimerRunning,
  restTime,
  setRestTime,
}) => {

  // Background color for tooltips based on resting state
  const tooltipBg = isResting ? "#182d6c" : "#650d08";

  // State to manage full screen and settings collapse
  const [isFullScreen, setIsFullScreen] = useState(!!document.fullscreenElement);
  const [isSettingsCollapsed, setIsSettingsCollapsed] = useState(false);
  const [lastToggle, setLastToggle] = useState(Date.now());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Effect to handle full screen changes
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  // Toggle full screen mode 
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Open and close modal
  const openModal = () => {
    if (isTimerRunning) {
      toggleTimer();
    }
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);


  return (
    <>
      <HStack
        data-testid="settings-container"
        width={"100%"}
        justifyContent={"space-between"}
      >
        {/* Button to open settings modal */}
        <Tooltip label="Open settings" bg={tooltipBg} px="3" py="2" placement='top'>
          <button className="button button--expand" onClick={openModal}>
            <SettingsIcon />
          </button>
        </Tooltip>
        {/* Button to toggle full screen mode */}
        <Tooltip label={isFullScreen ? "Exit full screen" : "Full screen"} bg={tooltipBg} px="3" py="2" placement='top'>
          <button className="button button--full-screen" onClick={toggleFullScreen}>
            {isFullScreen ? <ExitFullScreenIcon /> : <FullScreenIcon />}
          </button>
        </Tooltip>
      </HStack>

      {/* Settings Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        motionPreset='slideInBottom'
        isCentered
        scrollBehavior='inside'
        size={{ base: 'full', md: 'md'}}
        >
        <ModalOverlay backdropFilter='blur(16px)'/>
        <ModalContent>
          <ModalHeader>
            <HStack width={"100%"} justifyContent={"space-between"}>
              <Heading>Settings</Heading>
              <ModalCloseButton position={"static"}/>
            </HStack>
          </ModalHeader>
          <ModalBody>
            <VStack
              data-testid="settings"
              gap={"2vw"}
            >
              <HStack width={"100%"} gap={"2vw"}>
                {/* Form control for number of rounds */}
                <FormControl minWidth={"128px"} flex="1">
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
                {/* Form control for rest duration selection */}
                <FormControl minWidth={"128px"} flex="1.5">
                  <FormLabel htmlFor="rest-select">Rest duration</FormLabel>
                  <Select
                    id="rest-select"
                    value={restTime}
                    onChange={(e) => {
                      setRestTime(Number(e.target.value));
                    }}
                    size='lg'
                    border={"2px solid white"}
                  >
                    {restOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </HStack>
              
              
              {/* Form control for stance selection */}
              <FormControl minWidth={"128px"}>
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
              {/* Form control for mode selection */}
              <FormControl minWidth={"128px"}>
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
              {/* Form control for speed selection */}
              <FormControl minWidth={"128px"}>
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
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingsPanel;
