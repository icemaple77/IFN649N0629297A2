# Secure Cloud Infrastructure for Enterprise

## **Introduction**

This project mainly realized a fully automatic, unattended, green energy irrigation system. Firstly, the system is mainly divided into three layers and four modules, which are sensor layer, edge computing layer and cloud layer. The modules are data processing module, instruction management module, power management module and visualization module.

The system is powered by solar panels, and electric energy is stored into an 18650 storage battery through a 12-volt to 5-volt three-terminal voltage regulator. The sensor and MCU are powered by the battery. If the unsunny or less sunny area provides a 5V charging interface, a mobile phone charger can be used to power the entire system. The data detected by the sensor will be sent to the Raspberry PI in the middle layer, which will simply process the received data and publish the data to the AWS MQTT server for use by other clients. At the same time, a nano pi will subscribe to the data from the cloud, detect whether the data has changed, and send the latest value to the monitor for display. The watering controller controls the pump to complete the automatic irrigation according to the change of the value. This action can also be controlled by the user via an APP.

At the same time, a Web Server is set up on AWS to provide users with visual data access.

### **Keywords: MQTT, IoT, Network, Solar, Raspberry Pi, Water Pump,irrigation, Python, Arduino, Nodejs, AWS,Mosquito, Express, react， C， C++，Teensy，**

## **Example: [https://www.chenyun.org](https://www.chenyun.org/)**

## **Directory**

![image](https://user-images.githubusercontent.com/101891432/197392015-669e4cb2-b070-4dc0-8f2f-9fd4f6808627.png)

There are three project directories, one for each level of Code.

layer 1: Arduino Code.

layer 2: Js and python code (Python code to be perfected)

layer 3: Express Sever and React Client

![image](https://user-images.githubusercontent.com/101891432/197392019-2880050d-c96e-4973-8acb-372671843e2f.png)

The key used system directory corresponds to

Sensor

Pump

Monitor

Each directory contains the system firmware for an Arduino, and the applicable version is Teensy 2.0

The Arduino kit can be used to brush the hardware, and the link diagram is introduced later.

![image](https://user-images.githubusercontent.com/101891432/197392037-c0badeaf-ba6b-4c97-86a1-0e6dfa4c9a00.png)

The Node file used in this example lives in the Node directory and is running under Node16.0. Simply execute node + file.js on a machine with a network connection.

`node Sensor.js`

`node Pump.js`

`node Monitor.js`

Make sure the teensy device has a Bluetooth connection to the device you're running the app on before executing the command.

![image](https://user-images.githubusercontent.com/101891432/197392049-7d3dd9df-4270-42c9-9eae-581ce0536a14.png)

The Server should be deployed on a Linux server with Node js 16.0 installed.

The command is

`cd Server`

`Npm install`

`npm start`

## **Architecture**

![image](https://user-images.githubusercontent.com/101891432/197392063-0b718bca-7249-4ea3-80f4-9fd8df41d18c.png)

![image](https://user-images.githubusercontent.com/101891432/197392070-f03f4126-dcc0-43a3-adfe-8203934e54c0.png)

![image](https://user-images.githubusercontent.com/101891432/197392077-4445be4d-2508-474b-9f26-c7d1b241cb65.png)

![image](https://user-images.githubusercontent.com/101891432/197392082-4f428e54-f82f-4867-b1ea-8d3c0f8000f6.png)

## **Design circuit diagram**

[]()

### **Sensor**

![image](https://user-images.githubusercontent.com/101891432/197392088-38cf9882-2457-4e44-b438-39ad1ffa2ad8.png)

### **Pump**

![image](https://user-images.githubusercontent.com/101891432/197392097-a471a623-8d6f-4e9c-a875-17270971bae2.png)

Monitor

![image](https://user-images.githubusercontent.com/101891432/197392101-103d01ac-5857-4af8-bd29-ec0f29120097.png)

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

![image](https://user-images.githubusercontent.com/101891432/197392111-4c5987b0-22d3-4387-be03-a0d99fc616c0.png)

Web

![image](https://user-images.githubusercontent.com/101891432/197392120-dd69a398-625d-4738-94bd-13924ca21b23.png)

![image](https://user-images.githubusercontent.com/101891432/197392124-616ca890-3e97-4111-9353-9ec805f24c10.png)

<!--TLS is used to encrypt the session transmission to ensure data security.-->
![image](https://user-images.githubusercontent.com/101891432/197392131-31a1af2b-58be-4fed-a724-fef9d8d32ccd.png)

Be sure to replace your own CA certificate

![image](https://user-images.githubusercontent.com/101891432/197392165-85b5783d-8514-4a73-a749-1f9366b43d1b.png)

Link:

MQTT:

mqtt://mqtt.chenyun.org

port: 1883

Username password authentication has been enabled

![image](https://user-images.githubusercontent.com/101891432/197392169-9f031e58-b8c8-43c3-a1ba-102e63cf67c4.png)

## **The power supply parameters**

![image](https://user-images.githubusercontent.com/101891432/197392175-0c46655a-d781-4fa6-a636-45304f4acf93.png)
