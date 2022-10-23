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
// setInterval(function () {
//   const value = "Start?";
//   client.publish("order", value.toString(), { qos: 0, retain: true });
// }, 3000);
const TopicForSensor = "Order/Sensor";
const TopicForPump = "Order/Pump";

const orderforSensor = "Start?";
const orderforPump = JSON.stringify({ auto: false, order: "Start?1" });
const Topic = TopicForSensor;
const value = orderforSensor;
//client.publish("Order/Pump", value.toString());

client.on("connect", function () {
  console.log("connected to broker");
  client.subscribe(Topic);
  client.publish(Topic, value, {
    qos: 0,
    retain: true,
  });
});
client.on("close", function () {
  console.log("connection closed");
});
client.on("message", function (topic, message) {
  // message is Buffer
  //console.log(message);
  console.log("message arrived");

  client.end();
  //client = mqtt.connect("mqtt://mqtt.chenyun.org");
});
