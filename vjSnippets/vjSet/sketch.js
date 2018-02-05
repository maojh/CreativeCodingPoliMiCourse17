
//VJing tool

var videoInput;
var mic;
var song, amplitude;
var a=0;

var sizeAdj = 1;
var tresh = 0.01;
var light = 220;
var totMax = 10;

function preload() {
  //song = loadSound('assets/dentro.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // setup camera capture
  // videoInput = createCapture(VIDEO);
  // videoInput.size(400, 400);

  //hide video feed
  // videoInput.hide();

  one = createGraphics(width, height);

  //Song
  // song.loop();
  // amplitude = new p5.Amplitude();
  // song.amp(1);
  // fft = new p5.FFT();

  //Mic on
  mic = new p5.AudioIn();
  mic.start();

  // Create Layout GUI
  gui = createGui('Parameters');
  sliderRange(0, 2, 0.01);
  gui.addGlobals('sizeAdj');
  sliderRange(0, 255, 1);
  gui.addGlobals('light');
  sliderRange(0, 100, 1);
  gui.addGlobals('totMax');
  sliderRange(0, 1, 0.01);
  gui.addGlobals('tresh');

  gui.hide();

  frameRate(5);
  background(0);
  one.noStroke();
}

function draw() {
  fill(0, 30);
  rect(0,0,width,height);
  //position
  translate(width/2, height/2);
  rotate(a);

  push();

  //Stylization

  //Level
//  var level = amplitude.getLevel()*4;
  var level = 0.1;
  // smooth(1);
  var unit = width * level;
  one.fill(light*level*10);

  var tot = map(level, 0, 1, 0, totMax);

  for(var i = 0; i < tot;  i++) {
     var rand = random(1);
     for(var j = 0; j < tot;  i++) {
      if (level>tresh/100) {
        one.rect(map(rand*i, 0, width, -width/2, width/2), map(rand*height, 0, height, -height/2, height/2), unit*sizeAdj, unit*sizeAdj);
//          image(map(rand*width, 0, width, -width/2, width/2), map(rand*height, 0, height, -height/2, height/2));
}
}
  }
  pop();

  image(one, 20, 20,width*1.5, height*1.5);

  var step = 10;
  var stepx = width/step;
  var stepy = height/step;

  image(one, 20, 20, 50, 50);

  a+=3*level;
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log("size changed");
}
