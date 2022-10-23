const mqtt = require("mqtt");
const options = {
  // Clean session
  clean: true,
  //connectTimeout: 4000,
  // Auth
  clientId: "server",
  username: "michael",
  password: "p19820301",
};
const client = mqtt.connect("mqtt://mqtt.chenyun.org", options);
var express = require("express");
var axios = require("axios");
var redis = require("redis");

var router = express.Router();
var { connectRedis, GetRedis, SetRedis } = require("../components/redis-cache");
var { ListS3, createS3, updateS3, GetS3 } = require("../components/s3-store");
const bucketName = "n10629297-ifn649-store";
const ttl = 10;
const mainTopic = "Pump";
var Msg;
var Temperature;
var isRaining;
var Humidity;
var Moisture;
createS3();
connectRedis();
client.on("connect", function () {
  console.log("connected to broker");
  //client.subscribe(`#`, { qos: 1 });
  client.subscribe(`Sensor/#`, { qos: 1 });
});

client.on("message", async function (top, message) {
  //Msg = message.toString();
  Msg = JSON.parse(message);
  console.log(Msg);
  SetRedis(Msg.Topic, ttl, JSON.stringify(Msg));
  if (Msg.Topic == "Temperature") Temperature = Msg;
  if (Msg.Topic == "Moisture") Moisture = Msg;
  if (Msg.Topic == "Humidity") Humidity = Msg;
  if (Msg.Topic == "isRaining") isRaining = Msg;
  //   updateS3({
  //     Bucket: bucketName,
  //     Key: Msg.Topic,
  //     Body: JSON.stringify(Msg),
  //   });

  console.log(Msg);
});
router.get("/", async (req, res) => {
  res.send([Temperature, Moisture, Humidity, isRaining]);
});

router.get("/Temperature", async (req, res) => {
  res.send(Temperature);
});
router.get("/Moisture", async (req, res) => {
  res.send(Moisture);
});
router.get("/Humidity", async (req, res) => {
  res.send(Humidity);
});
router.get("/isRaining", async (req, res) => {
  res.send(isRaining);
});
module.exports = router;
