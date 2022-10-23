# IFN 649 IOT ASSESSMENT

## **Introduction**

This project mainly realized a fully automatic, unattended, green energy irrigation system. Firstly, the system is mainly divided into three layers and four modules, which are sensor layer, edge computing layer and cloud layer. The modules are data processing module, instruction management module, power management module and visualization module.

The system is powered by solar panels, and electric energy is stored into an 18650 storage battery through a 12-volt to 5-volt three-terminal voltage regulator. The sensor and MCU are powered by the battery. If the unsunny or less sunny area provides a 5V charging interface, a mobile phone charger can be used to power the entire system. The data detected by the sensor will be sent to the Raspberry PI in the middle layer, which will simply process the received data and publish the data to the AWS MQTT server for use by other clients. At the same time, a nano pi will subscribe to the data from the cloud, detect whether the data has changed, and send the latest value to the monitor for display. The watering controller controls the pump to complete the automatic irrigation according to the change of the value. This action can also be controlled by the user via an APP.

At the same time, a Web Server is set up on AWS to provide users with visual data access.

### **Keywords: MQTT, IoT, Network, Solar, Raspberry Pi, Water Pump,irrigation, Python, Arduino, Nodejs, AWS,Mosquito, Express, react， C， C++，Teensy，**

## **Example: [https://www.chenyun.org](https://www.chenyun.org/)**

## **Directory**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/85a64ded-2e52-4fb0-8efb-573a3355f6d7/Untitled.png)

There are three project directories, one for each level of Code.

layer 1: Arduino Code.

layer 2: Js and python code (Python code to be perfected)

layer 3: Express Sever and React Client

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4a0c61b1-f371-4b64-b9ec-25b92b4c32a1/Untitled.png)

The key used system directory corresponds to

Sensor

Pump

Monitor

Each directory contains the system firmware for an Arduino, and the applicable version is Teensy 2.0

The Arduino kit can be used to brush the hardware, and the link diagram is introduced later.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8a950a63-8de6-402d-b94a-326cfd660a70/Untitled.png)

The Node file used in this example lives in the Node directory and is running under Node16.0. Simply execute node + file.js on a machine with a network connection.

`node Sensor.js`

`node Pump.js`

`node Monitor.js`

Make sure the teensy device has a Bluetooth connection to the device you're running the app on before executing the command.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3bb01f62-614e-497d-b291-611eb594498e/Untitled.png)

The Server should be deployed on a Linux server with Node js 16.0 installed.

The command is

`cd Server`

`Npm install`

`npm start`

## **Architecture**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/90d89e2c-d5e1-4027-81bd-cb28b770130e/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ca85efac-39ad-4f4d-ba80-b870303a9ead/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/edf04f6d-5110-44b0-aa19-4f7143237106/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1a6dbd25-0130-4ac3-b1f7-530924bba077/Untitled.png)

## **Design circuit diagram**

[]()

### **Sensor**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bcf330f9-92c1-424e-a46a-83eb554b3f6e/Untitled.png)

### **Pump**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/451072a5-3cbd-4ffb-9756-0b850d24a200/Untitled.png)

Monitor

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b2f3b4d7-db73-41d0-9396-006d53d78df9/Untitled.png)

### **Technical parameters**

Sensor:

1. Rain Sensor
2. Temperature and Humidity Sensor
3. Soil moisture Sensor
4. Teensy 2.0 board
5. 18650 battery
6. switch x 2
7. Led
8. 3 Pin Socket x 2
9. Charge Board
10. 12v to 5v Regulator
11. sink
12. Bluetooth HC-05

Pump:

1. Teensy 2.0 board
2. Bluetooth HC-05
3. PNP 140 Transistor
4. Water Pump

Monitor

1. Teensy 2.0 Board
2. 0.96 LCD
3. Bluetooth HC-05

Flow Diagram

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c7b1c053-728e-4fdb-8569-5e2ba2b74b5d/Untitled.png)

Web

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fb929ba4-4292-4583-84f6-827396218c42/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d881f324-865c-42a7-8bcc-a6a3d6e627d1/Untitled.png)

<!--TLS is used to encrypt the session transmission to ensure data security.-->

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3283382c-1807-42b2-90a0-837ac306cc7d/Untitled.png)

Be sure to replace your own CA certificate

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e5fa8132-e1e0-45e4-a6e2-f01062daa4e2/Untitled.png)

Link:

MQTT:

mqtt://mqtt.chenyun.org

port: 1883

Username password authentication has been enabled

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a6f0b3c4-6948-4f4e-b0a8-c196b1d0eb9a/Untitled.png)

## **The power supply parameters**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fb47659e-689d-455f-bf1b-2721560fccd1/Untitled.png)
