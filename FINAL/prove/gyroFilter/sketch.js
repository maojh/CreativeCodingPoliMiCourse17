
var r, g, b;
var unit;
var dim, dimMax, dimMin;

var zoom = 10;
var acc;

var totAcc, avgAcc, pavg;

var firstGerm, secondGerm;
var germs = new Array();

var KalmanFilter, kf;

function setup() {
  createCanvas(windowWidth, windowHeight);
  r = random(50, 185);
  g = random(150, 250);
  b = random(50, 185);

  unit = width/8;
  dim = unit*2;
  dimMax = unit*3;
  dimMin = unit/2;
  firstGerm = new Germ(dim, -300);
  secondGerm = new Germ(dim*0.8, 300);
  getAccelerationY();
  totAcc = 0;
  avgAcc = 1;
  pavg = 0;

  KalmanFilter = require('kalmanjs').default;
  kf = new KalmanFilter();
  kf.filter(2);

  frameRate(10);

  noStroke();
  textStyle(BOLD);
  textSize(32);
}

function draw() {
  background(r, g, b);
  translate(width/2,height/2);

  console.log(" "+" "+acc+" "+totAcc+" "+avgAcc);

  //Move the Germ
// firstGerm.move();
// secondGerm.move();
  //Display the Germ
  noFill();
  strokeWeight(5);
  stroke('limeGreen');
  firstGerm.show(acc);
  stroke('greenYellow');
  secondGerm.show(acc);

  fill(100);
  text(avgAcc, 0,-30);
  fill(0);
  text(acc, 0,30);

  // text(firstGerm.dim, firstGerm.px-dim/8, firstGerm.py+dim/12);
}

function deviceMoved() {
    r = map(accelerationX, -90, 90, 50, 240);
    g = map(accelerationY, -90, 90, 120, 250);
    b = map(accelerationZ, -90, 90, 80, 240);
    getAccelerationY();
}

function getAccelerationY() {
  acc = round(accelerationY);


  avgAcc = acc;


  constrain(firstGerm.dim, dimMin, dimMax);
  constrain(secondGerm.dim, dimMin, dimMax);
}

function Germ(_dim, ix) {
  this.dim = _dim;
  this.px = ix + random(-20, 20);
  this.py = 0 + random(-20, 20);
  this.speed = 3;

  this.move = function(){
      this.px += random(-this.speed, this.speed);
      this.py += random(-this.speed, this.speed);
  }

  this.show = function() {
    noFill();
    ellipse(this.px, this.py, this.dim, this.dim);
    noStroke();
    fill(255);
    text(this.dim, this.px, this.py);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log("size changed");
  unit = width/8;
  dim = unit*2;
}
