import * as React from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
//import { useState } from "react";
function MySlider(props) {
  //const [value, setValue] = useState(70);
  const iOSBoxShadow =
    "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";
  const handleChange = (event) => {
    props.setVoltage(event.target.value);
    //setValue(event.target.value);
    //console.log(event.target.value);
  };
  const marks = [
    {
      value: 0,
      label: "start",
    },
    {
      value: 100,
      label: "stop",
    },
    // {
    //   value: 50,
    //   label: "Medium",
    // },
    // {
    //   value: 100,
    //   label: "Full",
    // },
  ];

  const IOSSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.mode === "dark" ? "#3880ff" : "#3880ff",
    height: 2,
    padding: "15px 0",
    "& .MuiSlider-thumb": {
      height: 28,
      width: 28,
      backgroundColor: "#fff",
      boxShadow: iOSBoxShadow,
      "&:focus, &:hover, &.Mui-active": {
        boxShadow:
          "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          boxShadow: iOSBoxShadow,
        },
      },
    },
    "& .MuiSlider-valueLabel": {
      fontSize: 12,
      fontWeight: "normal",
      top: -6,
      backgroundColor: "unset",
      color: theme.palette.text.primary,
      "&:before": {
        display: "none",
      },
      "& *": {
        background: "transparent",
        color: theme.palette.mode === "dark" ? "#fff" : "#000",
      },
    },
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-rail": {
      opacity: 0.5,
      backgroundColor: "#bfbfbf",
    },
    "& .MuiSlider-mark": {
      backgroundColor: "#bfbfbf",
      height: 8,
      width: 1,
      "&.MuiSlider-markActive": {
        opacity: 1,
        backgroundColor: "currentColor",
      },
    },
  }));
  function valuetext(value) {
    //this.props.setVoltage(value);
    //setValue(value);
    //console.log(value);
    return `${value}°C`;
  }

  return (
    <Box sx={{ width: 320 }}>
      <IOSSlider
        aria-label="ios slider"
        defaultValue={100}
        getAriaValueText={valuetext}
        marks={marks}
        value={props.voltage}
        onChange={handleChange}
        //onChangeCommitted={handleChange}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
export default MySlider;
