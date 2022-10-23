#include "U8glib.h"
#include <TimeLib.h>


#define LEDPIN 11
#define rxPin 7 // Teensy pin 7 <--> HC-05 Tx
#define txPin 8 // Teensy pin 8 <--> HC-05 Rx
int mark;
int strIndex = 0;
const int offset = 10;
String curTime = "00:00:00";
String date = "2022-09-28";
String temperature = "25.77";
String soil = "Moist";
String info = "Sunny";
String comdata[4] = {"1664369110", "25.77", "Moist", "Sunny"};

U8GLIB_SSD1306_ADAFRUIT_128X64 u8g(10, 9, 4, 5, 6);

void syncTime(String T_time) {
  unsigned long curTime;
  const unsigned long DEFAULT_TIME = 1664369110;
  curTime = T_time.toInt();
  if ( curTime >= DEFAULT_TIME) {
    setTime(curTime);
    adjustTime(offset * SECS_PER_HOUR);
  }
}
String processDate()
{
  return (processDigit(year()) + "-" + processDigit(month()) + "-" + processDigit(day()));
}
String processTime()
{
  return (processDigit(hour()) + ":" + processDigit(minute()) + ":" + processDigit(second()));
}
String processDigit(int digit) {
  String value ;
  if (digit < 10)
    value = String("0") + String(digit);
  else value = String(digit);
  return value;
}
void setup() {
  Serial.begin(9600);
  Serial1.begin(9600);
  pinMode(LEDPIN, OUTPUT);

  u8g.setColorIndex(1);
}

void loop() {
  curTime = processTime();
  delay(100);
  date = processDate();
  while (Serial1.available() > 0)//||Serial.available() > 0
  {
    String value = Serial1.readStringUntil(',');
    Serial.println(value);
    if (value != "Null")
      comdata[strIndex] = value;
    else
      comdata[strIndex] = comdata[strIndex];
    strIndex = strIndex + 1;
    mark = 1;
  }
  delay(1000);
  if (mark == 1)
  {
    syncTime(comdata[0]);

    mark = 0;
    strIndex = 0;
    delay(1000);
  }
  u8g.firstPage();
  do {
    displayLcd();
  } while ( u8g.nextPage() );

}
void draw(String str, int x, int y) {
  u8g.setPrintPos(x, y);
  u8g.print(str);
}

void displayLcd(void) {
  u8g.setFont(u8g_font_courB18);
  draw(curTime, 4, 38);
  u8g.setFont(u8g_font_7x13);
  draw(date, 4, 10);
  draw(comdata[3], 90, 10);
  draw(comdata[2], 4, 58);
  draw(comdata[1], 72, 58);
  u8g.drawCircle(110, 50, 2);
  draw("C", 115, 58);
}
