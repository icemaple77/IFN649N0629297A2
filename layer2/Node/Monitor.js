const mqtt = require("mqtt");
const { SerialPort } = require("serialport");
const options = {
  // Clean session
  clean: true,
  //connectTimeout: 4000,
  // Auth
  clientId: "Monitor",
  username: "michael",
  password: "p19820301",
};
const client = mqtt.connect("mqtt://mqtt.chenyun.org", options);
//const { ReadlineParser } = require("@serialport/parser-readline");
const comm = "/dev/rfcomm2";
const config = { path: comm, baudRate: 9600 };
const mainTopic = "Sensor";
const port = new SerialPort(config, function (err) {
  if (err) {
    return console.log("Error: ", err.message);
  }
});
var current_time = Math.floor(Date.now() / 1000);
timeStamp = current_time;
temperature = 25.67;
soil = "Droughty";
info = "Sunny";
var Moisture = 0;
var isRaining;
var tmp;
//console.log(timeStamp);
var comData =
  current_time.toString() + "," + temperature + "," + soil + "," + info;
console.log(comData);
//update(comData); //const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));
client.on("connect", function () {
  console.log("MQTT connected successful");
  // connected = client.connected
  client.subscribe(`${mainTopic}/#`, { qos: 1 });
});
client.on("message", function (top, message) {
  //console.log("Topic:", top);
  //console.log("Value:", message.toString());
  order = message.toString();
  const data = JSON.parse(order);
  //console.log(data);
  tmp = processData(data);

  if (tmp != comData) {
    comData = tmp;
    updata =
      current_time.toString() + "," + temperature + "," + soil + "," + info;
    console.log("Success update");
    update(updata);
  }
});
// Publish(order);

function processData(data) {
  switch (data.Topic) {
    case "Temperature":
      if (data.Value != temperature) {
        temperature = data.Value;
      }
      break;
    case "Moisture":
      if (data.Value < 20) Moisture = "Droughty";
      if (data.Value > 20 && data.Value < 44) Moisture = "Moist";
      if (data.Value > 60) Moisture = "Flooding";
      if (Moisture != soil) {
        soil = Moisture;
      }
      break;
    case "isRaining":
      if (data.Value == "0") {
        isRaining = "Sunny";
      } else {
        isRaining = "Rainy";
      }
      if (isRaining != info) {
        info = isRaining;
      }
      break;
    default:
      current_time = Math.floor(Date.now() / 1000);
      if (current_time - timeStamp > 86400) {
        timeStamp = current_time;
      }
      break;
  }
  return "Null" + "," + temperature + "," + soil + "," + info;
}
function Publish(order) {
  update(order);
  parser.on("data", function (data) {
    if (data.Value != undefined) {
      client.publish(mainTopic + "/Log", data.Value.toString(), {
        qos: 0,
        retain: true,
      });
      console.log("Public:", data);
    }
  });
}

function update(value) {
  port.write(value, function (err) {
    if (err) {
      return console.log("Error on write: ", err.message);
    }
    console.log("Success ", value);
  });
}
