/*
(^._.^)ﾉ
by Marina and cat
*/

let serial;
let latestData = "waiting for data";

let posX, posY;
let prevPosX, prevPosY;
let brightness;
let button;
let sensor1;
let sensorWeight, sensorAlpha;
let sensor2;
let mandala;

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(0);
  angleMode(DEGREES);

  mandala = new Mandala();

  serial = new p5.SerialPort();

  serial.list();
  serial.open('/dev/tty.usbmodem1411');

  serial.on('connected', serverConnected);

  serial.on('list', gotList);

  serial.on('data', gotData);

  serial.on('error', gotError);

  serial.on('open', gotOpen);

  serial.on('close', gotClose);
}

function serverConnected() {
  print("Connected to Server");
}

function gotList(thelist) {
  print("List of Serial Ports:");

  for (let i = 0; i < thelist.length; i++) {
    print(i + " " + thelist[i]);
  }
}

function gotOpen() {
  print("Serial Port is Open");
}

function gotClose(){
  print("Serial Port is Closed");
  latestData = "Serial Port is Closed";
}

function gotError(theerror) {
  print(theerror);
}

function gotData() {
  let currentString = serial.readLine();
  trim(currentString);
  if (!currentString) return;
  //console.log(currentString);
  latestData = currentString.split('/');
  //console.log(latestData);

  button = latestData[2];
}

function draw() {


  sensor1 = latestData[3];

  sensorWeight = int(map(latestData[3], 0, 900, 10, 1));
  sensorAlpha = int(map(latestData[3], 0, 900, 10, 100));

  stroke(255, sensorAlpha);
  strokeWeight(sensorWeight);

  if (sensor1 >= 50){

    mandala.build();

    // mandala.simmetry = sensor1;
    // console.log(mandala.simmetry);

    mandala.prevPosX = mandala.posX;
    mandala.posX = map(latestData[0],-300, 300, 0, windowWidth); //x

    mandala.prevPosY = mandala.posY;
    mandala.posY = map(latestData[1], -500, 500, 0, windowHeight); //y

  }

  if (button == 1){
    background(0);
  }

}
