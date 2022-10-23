const mqtt = require("mqtt");
const options = {
  // Clean session
  clean: true,
  //connectTimeout: 4000,
  // Auth
  clientId: "pump",
  username: "michael",
  password: "p19820301",
};
const client = mqtt.connect("mqtt://mqtt.chenyun.org", options);
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
var moment = require("moment");

const mainTopic = "Pump";
const comm = "/dev/rfcomm1";
const config = { path: comm, baudRate: 9600 };
var order = "";
var voltage = "201";
var m_c = true,
  t_c = true,
  r_c = true,
  auto = true;

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
  client.subscribe(`Sensor/#`, { qos: 1 }); //订阅主题为test的消息
});
client.on("message", function (top, message) {
  //console.log("Topic:", top);
  //console.log("Value:", message.toString());
  let Msg = JSON.parse(message);
  if (top == "Order/Pump") {
    console.log(message.toString());
    order = Msg.order;
    auto = Boolean(Msg.auto);
  }
  if (auto == true) {
    //let tmp = JSON.parse(message);
    if (Msg.Topic == "Moisture") {
      if (Msg.Value < 20) m_c = true;
      if (Msg.Value > 40) m_c = false;
    }
    if (Msg.Topic == "Temperature") {
      if (Msg.Value > 4 || Msg.Value < 30) t_c = true;
      else t_c = true;
    }
    if (Msg.Topic == "isRaining") {
      if (Msg.Value == "0") r_c = true;
      else r_c = false;
    }
    if (m_c && t_c && r_c) order = "Start?" + voltage;
    else order = "Start?0";
    console.log(m_c, t_c, r_c);
  }
  const data = order.split("?");
  //console.log(data);
  if (data == "Start") Publish(order);
  else update(order);
});
function Publish(order) {
  update(order);
  parser.on("data", function (data) {
    console.log(data);
    if (data.Value != undefined) {
      client.publish(mainTopic, data.Value.toString(), {
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
    //console.log("Success ", value);
  });
}
