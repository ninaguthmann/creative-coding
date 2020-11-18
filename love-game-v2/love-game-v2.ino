/* Sweep
 by BARRAGAN <http://barraganstudio.com>
 This example code is in the public domain.

 modified 8 Nov 2013
 by Scott Fitzgerald
 http://www.arduino.cc/en/Tutorial/Sweep

 modified 17 Nov 2020
 by Marina :P
*/

#include <Servo.h>

Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards

//int pos = 0;    // variable to store the servo position
int pos[8]; // create array for 8 different positions
int sensorValue = 0; // variable to store the value coming from the LDR
int sensorPin = A0; // select the input pin for the ldr
int servoPin = 2; // select the input pin for the servo
int angle;
int lastRead; // need to store the last read sensorValue
int value = 60;

void setup() {
  
  myservo.attach(servoPin);  // attaches the servo on pin 2 to the servo object
  analogRead(sensorPin); // attaches the ldr on pin A0

  myservo.write(90);

  //add positions to the array, I wanted the servo motor to rotate in specific intervals
  for(int i = 0; i < 8; i ++){
    pos[i] = (i * 22.5) + 11.25;
  }
}

void loop() {

  sensorValue = analogRead(sensorPin);

  if(sensorValue < value && lastRead > value){ //this way, if I keep the amount of lightness the same the servo motor doesn't move
    myservo.write(pos[random(0,7)]); // choose position in the array randonly
  }
  delay(1000);

  lastRead = sensorValue;

  Serial.print(sensorValue);
  Serial.print(" || ");
  angle = myservo.read();
  Serial.println(angle);
}
