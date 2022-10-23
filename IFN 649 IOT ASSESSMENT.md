# IFN 649 IOT ASSESSMENT

## Introduction

This project mainly realized a fully automatic, unattended, green energy irrigation system. Firstly, the system is mainly divided into three layers and four modules, which are sensor layer, edge computing layer and cloud layer. The modules are data processing module, instruction management module, power management module and visualization module.

The system is powered by solar panels, and electric energy is stored into an 18650 storage battery through a 12-volt to 5-volt three-terminal voltage regulator. The sensor and MCU are powered by the battery. If the unsunny or less sunny area provides a 5V charging interface, a mobile phone charger can be used to power the entire system. The data detected by the sensor will be sent to the Raspberry PI in the middle layer, which will simply process the received data and publish the data to the AWS MQTT server for use by other clients. At the same time, a nano pi will subscribe to the data from the cloud, detect whether the data has changed, and send the latest value to the monitor for display. The watering controller controls the pump to complete the automatic irrigation according to the change of the value. This action can also be controlled by the user via an APP.

At the same time, a Web Server is set up on AWS to provide users with visual data access.

#####  Keywords: MQTT, IoT, Network, Solar, Raspberry Pi, Water Pump,irrigation, Python, Arduino, Nodejs, AWS,Mosquito, Express, react， C， C++，Teensy，

## Example: https://www.chenyun.org

## Directory

![image-20221023201100582](C:\Users\icema\AppData\Roaming\Typora\typora-user-images\image-20221023201100582.png)

There are three project directories, one for each level of Code.

layer 1: Arduino Code.

layer 2: Js and python code (Python code to be perfected)

layer 3: Express Sever and React Client

![image-20221023202110992](C:\Users\icema\AppData\Roaming\Typora\typora-user-images\image-20221023202110992.png)

The key used system directory corresponds to

Sensor

Pump

Monitor

Each directory contains the system firmware for an Arduino, and the applicable version is Teensy 2.0

The Arduino kit can be used to brush the hardware, and the link diagram is introduced later.

![image-20221023202721286](C:\Users\icema\AppData\Roaming\Typora\typora-user-images\image-20221023202721286.png)

The Node file used in this example lives in the Node directory and is running under Node16.0. Simply execute node + file.js on a machine with a network connection.

`node Sensor.js`

`node Pump.js`

`node Monitor.js`

Make sure the teensy device has a Bluetooth connection to the device you're running the app on before executing the command.



![image-20221023203154136](C:\Users\icema\AppData\Roaming\Typora\typora-user-images\image-20221023203154136.png)



The Server should be deployed on a Linux server with Node js 16.0 installed.

The command is

`cd Server`

`Npm install`

`npm start`

## Architecture

![image-20221023203830594](C:\Users\icema\AppData\Roaming\Typora\typora-user-images\image-20221023203830594.png)

![image-20221023203847543](C:\Users\icema\AppData\Roaming\Typora\typora-user-images\image-20221023203847543.png)

![image-20221023203912968](C:\Users\icema\AppData\Roaming\Typora\typora-user-images\image-20221023203912968.png)

![image-20221023203922217](C:\Users\icema\AppData\Roaming\Typora\typora-user-images\image-20221023203922217.png)

## Design circuit diagram

### Sensor

![image-20221023211600037](C:\Users\icema\AppData\Roaming\Typora\typora-user-images\image-20221023211600037.png)

### Pump

![image-20221023205413640](C:\Users\icema\AppData\Roaming\Typora\typora-user-images\image-20221023205413640.png)

Monitor

![image-20221023205538060](C:\Users\icema\AppData\Roaming\Typora\typora-user-images\image-20221023205538060.png)

### Technical parameters

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

![image-20221023214924617](C:\Users\icema\AppData\Roaming\Typora\typora-user-images\image-20221023214924617.png)

Web

![image-20221023215016508](C:\Users\icema\AppData\Roaming\Typora\typora-user-images\image-20221023215016508.png)

![image-20221023215052994](C:\Users\icema\AppData\Roaming\Typora\typora-user-images\image-20221023215052994.png)

<!--TLS is used to encrypt the session transmission to ensure data security.-->

![image-20221023215209164](C:\Users\icema\AppData\Roaming\Typora\typora-user-images\image-20221023215209164.png)

![image-20221023215243527](C:\Users\icema\AppData\Roaming\Typora\typora-user-images\image-20221023215243527.png)

Be sure to replace your own CA certificate

Link:

MQTT: 

mqtt://mqtt.chenyun.org

port: 1883

Username password authentication has been enabled

​	![image-20221023215449502](C:\Users\icema\AppData\Roaming\Typora\typora-user-images\image-20221023215449502.png)

## The power supply parameters

![image-20221023215546322](C:\Users\icema\AppData\Roaming\Typora\typora-user-images\image-20221023215546322.png)