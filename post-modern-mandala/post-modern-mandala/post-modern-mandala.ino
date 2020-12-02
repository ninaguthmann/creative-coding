/*
  Arduino LSM9DS1 - Simple Gyroscope

  This example reads the gyroscope values from the LSM9DS1
  sensor and continuously prints them to the Serial Monitor
  or Serial Plotter.

  The circuit:
  - Arduino Nano 33 BLE Sense

  created 10 Jul 2019
  by Riccardo Rizzo

  edited by Marina and cat (^._.^)ﾉ
*/

#include <Arduino_LSM9DS1.h>

const int buttonPin = 2;
const int sensorPin1 = A0;

int buttonState = 0;
int sensorValue1 = 0;

void setup() {
  pinMode(buttonPin, INPUT);
  
  Serial.begin(9600);
  while (!Serial);
  Serial.println("Started");

  if (!IMU.begin()) {
    Serial.println("Failed to initialize IMU!");
    while (1);
  }
  Serial.print("Gyroscope sample rate = ");
  Serial.print(IMU.gyroscopeSampleRate());
  Serial.println(" Hz");
  Serial.println();
  Serial.println("Gyroscope in degrees/second");
  Serial.println("X\tY\tZ");
}

void loop() {
  buttonState = digitalRead(buttonPin);
  sensorValue1 = analogRead(sensorPin1);
  
  float x, y, z;

  if (IMU.gyroscopeAvailable()) {
    IMU.readGyroscope(x, y, z);

    Serial.print(x);
    Serial.print(" / ");
    Serial.print(y);
    Serial.print(" / ");
    Serial.print(buttonState);
    Serial.print(" / ");
    Serial.println(sensorValue1); 
  }
}
