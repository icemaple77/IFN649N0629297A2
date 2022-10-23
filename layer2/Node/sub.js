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
// const mqtt = require('./node_modules/mqtt/dist/mqtt.min.js')
const client = mqtt.connect("mqtt://mqtt.chenyun.org", options); //指定服务端地址和端口
const mainTopic = "Pump";
client.on("connect", function () {
  console.log("服务器连接成功");
  // connected = client.connected
  client.subscribe(`Order/${mainTopic}`, { qos: 1 }); //订阅主题为test的消息
  client.subscribe(`Sensor/#`, { qos: 1 }); //订阅主题为test的消息
});
client.on("message", function (top, message) {
  console.log("Topic:", top);
  console.log("Value:", message.toString());
});
