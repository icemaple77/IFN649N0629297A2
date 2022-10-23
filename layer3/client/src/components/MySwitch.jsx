import { useState } from "react";
import Switch from "react-switch";
const MySwitch = () => {
  const [checked, setChecked] = useState(true);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  return (
    <div className="example">
      <h2>Intelligent System</h2>
      <label>
        <span>Auto Mode</span>
        <Switch
          onChange={handleChange}
          checked={checked}
          className="react-switch"
        />
      </label>
      <p>
        The switch is <span>{checked ? "on" : "off"}</span>.
      </p>
    </div>
  );
};
export default MySwitch;
