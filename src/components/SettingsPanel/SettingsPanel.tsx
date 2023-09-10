interface SettingsPanelProps {
  setSelectedLevel: React.Dispatch<
    React.SetStateAction<"simple" | "advanced" | "both">
  >;
  isActionBeepEnabled: boolean;
  setIsActionBeepEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  setSelectedLevel,
  isActionBeepEnabled,
  setIsActionBeepEnabled
}) => {
  return (
    <div className="settings">
      <select
        className="level-dropdown"
        onChange={(e) =>
          setSelectedLevel(e.target.value as "simple" | "advanced" | "both")
        }
      >
        <option value="simple">Simple</option>
        <option value="advanced">Advanced</option>
        <option value="both">Both</option>
      </select>

      <div className="toggle-container">
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
      </div>
    </div>
  );
};

export default SettingsPanel;
