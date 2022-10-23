#include "DHT.h"
//#include <SoftwareSerial.h>

#define DHTPIN 12      // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11   // DHT 11
#define RAINPIN 16 
#define LEDPIN 11
#define SOILPIN 21
DHT dht(DHTPIN, DHTTYPE);

class Sensor{
  private:
  int _pin;
  public:
  Sensor(int pin){
    _pin = pin;
  }
  int readValue(){
    return analogRead(_pin);
  }
};
float soilData() {
  float moisture_percentage;
  int sensor_analog;
  sensor_analog = analogRead(SOILPIN);
  moisture_percentage = ( 100 - ( (sensor_analog/1023.00) * 100 ) );
  return moisture_percentage;
  };
Sensor rain(RAINPIN);
Sensor soil(SOILPIN);
// Teensy 5V <--> HC-05 Vcc
// Teensy Ground <--> HC-05 GND
#define rxPin 7 // Teensy pin 7 <--> HC-05 Tx
#define txPin 8 // Teensy pin 8 <--> HC-05 Rx

int Mark=0; 
void setup() {
  // Setup serial for monitor
  Serial.begin(9600); 

  // Setup DHT Sensor
  pinMode(DHTPIN, INPUT);
  pinMode(LEDPIN, OUTPUT);
  pinMode(SOILPIN, INPUT);
  pinMode(RAINPIN, INPUT);
  dht.begin();
  digitalWrite(LEDPIN, HIGH);
  // Setup Serial1 for BlueTooth
  Serial1.begin(9600); // Default communication rate of the Bluetooth module
}

void loop() {
  if(Serial1.available() >0 || Serial.available() >0){ 
    String passwd=Serial1.readStringUntil('?');
    Serial.println(passwd);
    if(passwd=="Start"){
      Serial.println("Success Login");
      Serial1.println("Success Login");
      Mark=1;
      }
      else{
        Mark=0;
        Serial.println("Passwd is wrong");
        Serial1.println("Passwd is wrong");
        }
    }// Checks whether data is comming from the serial port  
  if (Mark==1){
    digitalWrite(LEDPIN, HIGH);    
    float h = dht.readHumidity();
    float t = dht.readTemperature();
    float s = soilData();
    int r = rain.readValue();
    Serial.print(F("Weather:"));
    Serial.print(r);
    Serial.print(F(","));
    Serial.print(F("Humidity:"));
    Serial.print(h);
    Serial.print(F(","));
    Serial.print(F("Temperature:"));
    Serial.print(t);
    Serial.print(F(","));
    Serial.print(F("Moisture:"));
    Serial.println(s);

    Serial1.print(F("Weather:"));
    Serial1.print(r);
    Serial1.print(F(","));
    Serial1.print(F("Humidity:"));
    Serial1.print(h);
    Serial1.print(F(","));
    Serial1.print(F("Temperature:"));
    Serial1.print(t);
    Serial1.print(F(","));
    Serial1.print(F("Moisture:"));
    Serial1.println(s);

    
    digitalWrite(LEDPIN, LOW);
    delay(5000);
    }  

 
}
