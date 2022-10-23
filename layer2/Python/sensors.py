#!/usr/bin/python3.9
import serial
import time
import random
from paho.mqtt import client as mqtt_client
import paho.mqtt.publish as publish
# reading and writing data from and to arduino serially.
# rfcomm0 -> this could be different
_IPADDR = "mqtt.chenyun.org"
_COMM = '/dev/rfcomm0'
_PORT = 1883
client_id = f'python-mqtt-{random.randint(0, 1000)}'
monitor = serial.Serial(_COMM, 9600)

def getSerialData(serNo):
        if monitor.in_waiting > 0:
                serNo.write(str.encode('Start\r\n'))
                comData = serNo.readline()
                Data = comData.decode('utf-8').strip('\r\n')
                print(Data)
                return Data
def thdPublish(client,name, start):
        while start():
                getSerialData(client)
                #publishTopics()
        client.close()
        print('Thread function done!!')

def __main__():
        start_thread = True
        thdf = Thread(target=thdPublish, args=(monitor,'thrPublish', lambda: start_thread))
        thdf.start()

        try:
                while True:
                        cmd = input()
                        if(cmd =='q'):
                                print('stopping.....')
                                start_thread = False
                                break;
                        print('Main Thread')

        except KeyboardInterrupt:
                start_thread = False
        finally:
                thdf.join()