import React from "react";
import Thermometer from "react-thermometer-component";
import "../App.css";
const styles = {
  dial: {
    display: "inline-block",
    width: `350px`,
    height: `auto`,
    color: "#000",
    border: "0.5px solid #fff",
    padding: "2px",
    marginTop: "50px",
  },
  title: {
    fontSize: "1em",
    color: "#000",
    marginTop: "15px",
  },
};

const Temp = ({ id, value, title }) => {
  return (
    <div style={styles.dial}>
      <Thermometer
        theme="light"
        value={value}
        max="60"
        steps="2"
        format="°C"
        size="normal"
        height="180"
      />
    </div>
  );
};

export default Temp;
