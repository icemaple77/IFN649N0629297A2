#!/usr/bin/python3.9
from threading import Thread 
import paho.mqtt.publish as publish
import serial
import time
import string

_IPADDR = 'mqtt.chenyun.org'
_COMM = '/dev/rfcomm0'
 
def parseTopic(sensordata):
	topic = sensordata.strip().split(':')
	if len(topic) != 2:
		return '',''
	return topic[0], topic[1]

def publishTopics(line):
	topics = line.strip().split(',')
	for topic in topics:
		topic, value = parseTopic(topic)
		if topic != '':
			publish.single(topic, value, hostname=_IPADDR)
			print(topic + ' : ' + value)

def thdPublish(name, stop):
	ser = serial.Serial(_COMM, 9600)
	ser.write(str.encode('Start\r\n'))
	
	while not stop():
		if ser.in_waiting > 0:
			raw = ser.readline()
			line = raw.decode('utf-8').strip('\r\n')
			print(line)
			publishTopics(line)

	ser.close()
	print('Thread function done!!')


def main():
	stop_thread = False
	thdf = Thread(target=thdPublish, args=('thrPublish', lambda: stop_thread))
	thdf.start()

	try:
		while True:
			cmd = input()
			if(cmd =='q'):
				print('stopping.....')
				stop_thread = True
				break;
			print('Main Thread')

	except KeyboardInterrupt:
		stop_thread = True
	finally:
		thdf.join()

if __name__ == "__main__":
	main()
