import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import Temp from "./Temp";
import { useState } from "react";
import rainy from "../img/rainy.png";
import sunny from "../img/sunny.png";
import { MdWbSunny } from "react-icons/md";
import { GiRaining } from "react-icons/gi";
const Chart = require("react-chartjs-2").Chart;

async function getData() {
  return await fetch(`/sensor/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err, "Server connection error");
    });
}
function MyChart() {
  const [temp, setTemp] = useState(0);
  const [rain, setRain] = useState(0);
  //console.log(getData());

  const chartColors = {
    red: "rgb(255, 99, 132)",
    orange: "rgb(255, 159, 64)",
    yellow: "rgb(255, 205, 86)",
    green: "rgb(75, 192, 192)",
    blue: "rgb(54, 162, 235)",
    purple: "rgb(153, 102, 255)",
    grey: "rgb(201, 203, 207)",
  };

  const color = Chart.helpers.color;
  const data = {
    datasets: [
      {
        label: "Percentage of soil moisture",
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false,
        lineTension: 0.5,
        borderDash: [8, 4],
        data: [],
      },
      {
        label: "Percentage of Humidity",
        backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
        borderColor: chartColors.orange,
        fill: false,
        lineTension: 0.5,
        borderDash: [8, 4],
        data1: [],
      },
    ],
  };

  const options = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      xAxes: [
        {
          type: "realtime",
          distribution: "linear",
          realtime: {
            duration: 50000,
            refresh: 5000,
            delay: 10000,
            onRefresh: async function (chart) {
              const value = await getData();
              console.log(value[0].Time);
              setTemp(parseInt(value[0].Value));
              setRain(value[3].Value);
              chart.data.datasets[0].data.push({
                x: value[1].Time,
                y: Number(value[1].Value),
              });
              chart.data.datasets[1].data.push({
                x: value[2].Time,
                y: Number(value[2].Value),
              });
            },

            time: {
              displayFormat: "h:mm",
            },
          },
          ticks: {
            displayFormats: 1,
            maxRotation: 0,
            minRotation: 0,
            stepSize: 1,
            maxTicksLimit: 30,
            minUnit: "second",
            source: "auto",
            autoSkip: true,
            // callback: function (value) {
            //   return moment(value, "HH:mm:ss").format("mm:ss");
            // },
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            //beginAtZero: true,
            max: 100.0,
          },
        },
      ],
    },
  };

  return (
    <div>
      <div className="weather">
        {rain == 1 ? <GiRaining /> : <MdWbSunny />}

        <Temp id="dial7" value={temp} title="Lowest Temp" />
      </div>

      <Line data={data} options={options} />
    </div>
  );
}

export default MyChart;
