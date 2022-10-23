const mqtt = require("mqtt");
const options = {
  // Clean session
  clean: true,
  //connectTimeout: 4000,
  // Auth
  clientId: "sensors",
  username: "michael",
  password: "p19820301",
};
const client = mqtt.connect("mqtt://mqtt.chenyun.org", options);
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
var moment = require("moment");

const mainTopic = "Sensor";
const comm = "/dev/rfcomm0";
const config = { path: comm, baudRate: 9600 };
var order = "";

const port = new SerialPort(config, function (err) {
  if (err) {
    return console.log("Error: ", err.message);
  }
});
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));
client.on("connect", function () {
  console.log("MQTT connected successful");
  // connected = client.connected
  client.subscribe(`Order/${mainTopic}`, { qos: 1 });
});
client.on("message", function (top, message) {
  console.log("Topic:", top);
  console.log("Value:", message.toString());
  order = message.toString();
  if (order == "Start?") Publish(order);
  else update(order);
});

function Publish(order) {
  update(order);
  parser.on("data", function (data) {
    var pubData = processData(data);
    //console.log(pubData);
    pubData.map((data) => {
      if (data.Value != undefined) {
        client.publish(data.Topic, JSON.stringify(data.Value), {
          qos: 0,
          retain: true,
        });
        console.log("Public:", data);
      }
    });
  });
}

function processData(data) {
  var current_time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  const dataSets = data.split(",").map((val) => {
    return val.split(":").map((val) => {
      return val;
    });
  });
  const pubData = dataSets.map((data) => {
    var jsData = { Topic: data[0], Value: data[1], Time: current_time };
    return {
      Topic: mainTopic + "/" + data[0],
      Value: jsData,
    };
  });
  return pubData;
}

function update(value) {
  port.write(value, function (err) {
    if (err) {
      return console.log("Error on write: ", err.message);
    }
    console.log("Success ", value);
  });
}
