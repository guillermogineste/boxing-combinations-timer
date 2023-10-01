import React from "react";

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
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  setSelectedLevel,
  isActionBeepEnabled,
  setIsActionBeepEnabled,
  isAdditiveModeEnabled,
  setIsAdditiveModeEnabled,
  setSelectedSpeed,
}) => {
  const handleModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsAdditiveModeEnabled(event.target.value === "Additive");
  };
  return (
    <div className="settings">
      <div className="selector selector--level">
        <label htmlFor="level-select">Difficulty</label>
        <select
          id="level-select"
          className="dropdown"
          disabled={isAdditiveModeEnabled}
          onChange={(e) =>
            setSelectedLevel(e.target.value as "simple" | "advanced" | "both")
          }
        >
          <option value="simple">Simple</option>
          <option value="advanced">Advanced</option>
          <option value="both">Both</option>
        </select>
      </div>
      <div className="selector selector--mode">
        <label htmlFor="mode-select">Combination mode</label>
        <select
          id="mode-select"
          className="dropdown"
          value={isAdditiveModeEnabled ? "Additive" : "Random"}
          onChange={handleModeChange}
        >
          <option value="Random">Random</option>
          <option value="Additive">Additive</option>
        </select>
      </div>
      <div className="selector selector--speed">
        <label htmlFor="speed-select">Action beep</label>
        <select
          id="speed-select"
          className="dropdown"
          onChange={(e) =>
            setSelectedSpeed(
              e.target.value as "off" | "fast" | "medium" | "slow",
            )
          }
        >
          <option value="off">Off</option>
          <option value="fast">Fast</option>
          <option value="medium">Medium</option>
          <option value="slow">Slow</option>
        </select>
      </div>

      {/* <div className="toggle-container">
        <input
          type="checkbox"
          id="actionBeep"
          className="toggle"
          checked={isActionBeepEnabled}
          onChange={(e) => setIsActionBeepEnabled(e.target.checked)}
        />
        <label className="toggle-label" htmlFor="actionBeep">
          Reaction timer{" "}
        </label>
      </div> */}
    </div>
  );
};

export default SettingsPanel;
