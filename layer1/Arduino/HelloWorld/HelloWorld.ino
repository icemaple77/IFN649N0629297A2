#include "U8glib.h"
#define LEDPIN 11
#define rxPin 7 // Teensy pin 7 <--> HC-05 Tx
#define txPin 8 // Teensy pin 8 <--> HC-05 Rx
int mark;
int p;
int strIndex = 0;
int x=4;
int y=18;
int sub_x=4;
int sub_y=38;
String *fString[4];
String date="2022-09-28";
String temperature="Centigrade: 25";
String soil="Moist";
String info="Sunny day";
String comdata;
void pageTimeDay();     // Page-1
void pageTemperature(); // Page-2
void pageHumidity();    // Page-3
void pageInfo();        // Page-4

void (*pages[])() = { pageTimeDay, pageTemperature, pageHumidity, pageInfo } ;
U8GLIB_SSD1306_ADAFRUIT_128X64 u8g(10, 9, 4, 5, 6);
//U8GLIB_SSD1306_128X64 u8g(10, 9, 13, 12, 14);  // SW SPI Com: SCK = 13, MOSI = 11, CS = 10, A0 = 9
void draw(void) {
  // graphic commands to redraw the complete screen should be placed here  
  u8g.setFont(u8g_font_unifont);
  //u8g.setFont(u8g_font_osb21);
  u8g.drawStr( 1, 22, "Hello Stone!");
}

void setup(void) {
  // flip screen, if required
  // u8g.setRot180();
  
  // set SPI backup if required
  //u8g.setHardwareBackup(u8g_backup_avr_spi);

  // assign default color value
  if ( u8g.getMode() == U8G_MODE_R3G3B2 ) {
    u8g.setColorIndex(255);     // white
  }
  else if ( u8g.getMode() == U8G_MODE_GRAY2BIT ) {
    u8g.setColorIndex(3);         // max intensity
  }
  else if ( u8g.getMode() == U8G_MODE_BW ) {
    u8g.setColorIndex(1);         // pixel on
  }
  else if ( u8g.getMode() == U8G_MODE_HICOLOR ) {
    u8g.setHiColorByRGB(255,255,255);
  }
  Serial.begin(9600);
  Serial1.begin(9600);
  digitalWrite(LEDPIN, HIGH);
  u8g.setFont(u8g_font_unifont);
  //u8g.setFont(u8g_font_8x13B);
  //u8g.setColorIndex(1);
  p = 0;
  fString[0] = &date;
  fString[1] = &temperature;
  fString[2] = &soil;
  fString[3] = &info;
  pinMode(11, OUTPUT);
}

void loop(void) {
  while (Serial1.available() > 0)//||Serial.available() > 0
    {
      comdata += char(Serial1.read());
      //comdata += char(Serial.read());
      mark=1;
    }
    delay(1000);
    if (mark==1)
    {
      Serial.println("=======================");
      date="";
      temperature="";
      soil="";
      info="";
      byte i;
      for (i=0; i<4; i++)
        *fString[i] = splitStr(comdata);
      Serial.println(comdata);
      for (i=0; i<4; i++)
        Serial.println(*fString[i]);
      mark=0;
      comdata="";
      strIndex = 0;
      delay(1000);
    }
  u8g.firstPage();
  do {  
    (*pages[p])();
  } while( u8g.nextPage() );
  delay(1000); 
  p = p+1;
  if (p == 4)
    p=0;
  

}
String splitStr(String str)
{
  if (strIndex == -1)
    return "";
  byte i = str.indexOf('^',strIndex)+1;
  strIndex = str.indexOf('^',i);
  if (strIndex == -1)
    return "";
  else
    return comdata.substring(i,strIndex);
}
void pageTimeDay() {
  u8g.drawStr( x, y, "Date of today:");
  u8g.setPrintPos(sub_x, sub_y);
  u8g.print(date);
  u8g.drawStr( x, 58, "Have a nice day");  
}
void pageTemperature(){
  u8g.drawStr( x, y, "Temperature:");
  u8g.setPrintPos(sub_x, sub_y);
  u8g.print(temperature);
}
void pageHumidity() {
  u8g.drawStr( x, y, "Soil Moisture:");
  u8g.setPrintPos(sub_x, sub_y);
  u8g.print(soil);
}
void pageInfo(){
  u8g.drawStr( x, y, "Weather:");
  u8g.setPrintPos(sub_x, sub_y);
  u8g.print(info);
}
