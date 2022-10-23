var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const mqtt = require("mqtt");
const TopicForSensor = "Order/Sensor";
const TopicForPump = "Order/Pump";
var topic, value;
const orderforSensor = "Start?";
const orderforPump = JSON.stringify({ auto: false, order: "Start?200" });
const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Auth
  clientId: "server",
  username: "michael",
  password: "p19820301",
};
router.post("/", function (req, res, next) {
  const data = req.body;
  function pub(topic, value) {
    const client = mqtt.connect("mqtt://mqtt.chenyun.org", options);
    client.on("connect", function () {
      console.log("connected to broker");
      client.subscribe(topic);
      console.log("Publish:", topic, value);
      client.publish(topic, value);
    });
    client.on("close", function () {
      console.log("connection closed");
    });
    client.on("message", function (topic, message) {
      console.log(topic.toString());
      console.log(message.toString());
      console.log("message arrived");

      client.end();
    });
  }
  if (data.Topic == "Sensor") {
    topic = TopicForSensor;
    value = data.Value;
  }
  if (data.Topic == "Pump") {
    topic = TopicForPump;
    value = JSON.stringify(data.Value);
  }
  pub(topic, value);

  res.status(200).json("Success" + JSON.stringify(data));
});
module.exports = router;
