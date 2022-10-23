#define LEDPIN 11
#define PUMPPIN 15
#define rxPin 7 // Teensy pin 7 <--> HC-05 Tx
#define txPin 8 // Teensy pin 8 <--> HC-05 Rx

int voltage=0;
int Mark=0; 

void setup() {
  Serial.begin(9600);
  Serial1.begin(9600);
  pinMode(LEDPIN, OUTPUT);
  digitalWrite(LEDPIN, HIGH);
  pinMode(PUMPPIN, OUTPUT);
  analogWrite(PUMPPIN,255);
  
}

void loop() {
  if(Serial1.available() > 0){
    String passwd=Serial1.readStringUntil('?');
    Serial.println(passwd);
    if(passwd=="Start"){
      voltage = Serial1.parseInt();
      Serial.println("Success Login");
      Serial1.println("Success Login");
      Mark=1;
               
      }
      else{
        Mark=0;
        Serial1.println(0);
        Serial.println("Passwd is wrong");
        Serial1.println("Passwd is wrong");
      }
    }
   if (Mark==1){
    
    if(voltage>130){
      analogWrite(PUMPPIN,255);
//      delay(100);
//      Serial.println(voltage); 
//      if(voltage>219){
//        voltage=255;
//        analogWrite(PUMPPIN,voltage);
//        }
    Serial.println(voltage);
    Serial1.println(voltage); 
    Serial1.println("The water pump has been started");
    analogWrite(PUMPPIN,255);
    Mark=0; 
    }
    else{
      voltage=0;
      analogWrite(PUMPPIN,voltage);
      Serial.println(voltage);
      Serial1.println(voltage);
      Serial1.println("The water pump has been Stoped");
      Mark=0;
      }}

       

}
