#!/usr/bin/python3.9
import serial
import time, sys 
import json
import paho.mqtt.publish as publish
import paho.mqtt.client as mqtt
from threading import Thread
from abc import ABCMeta, abstractmethod
import serial

_IPADDR = "mqtt.chenyun.org"
_COMM = '/dev/rfcomm1'

monitor = serial.Serial(_COMM, 9600)
UTC = int(time.time())
temperature="29"
soil="Moist"
info="Rainy"

comData=str(UTC)+","+temperature+","+soil+","+info
print(comData)
monitor.write(comData.encode())
