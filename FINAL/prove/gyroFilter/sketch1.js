
var r, g, b;
var unit;
var dim, dimMax, dimMin;

var zoom = 10;
var acc;

var totAcc, avgAcc, pavg;

var firstGerm, secondGerm;
var germs = new Array();

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

  noStroke();
  textSize(32);
}

function draw() {
  background(r, g, b);
  translate(width/2,height/2);

  totAcc += acc;
  if(frameCount%10==0) {
    avgAcc = round(totAcc/15);
    totAcc = 0;
  }
  getAccelerationY(avgAcc);

  console.log(" "+" "+acc+" "+totAcc+" "+avgAcc);

  //Pass acceleration value to Germ fro scaling
//  firstGerm.move();
  //Move the Germ
  noFill();
  strokeWeight(5);
  stroke('limeGreen');
  firstGerm.show(acc);
  stroke('greenYellow')
  secondGerm.show(avgAcc);
  //Display the Germ

  fill(0);
  text(avgAcc, 0,-30);
  text(acc, 0,30);

  // text(firstGerm.dim, firstGerm.px-dim/8, firstGerm.py+dim/12);
}

function deviceMoved() {
    r = map(accelerationX, -90, 90, 50, 255);
    g = map(accelerationY, -90, 90, 120, 255);
    b = map(accelerationZ, -90, 90, 80, 255);
    // getAccelerationY();
}

function getAccelerationY(avg) {
//    acc = floor(accelerationY*10);
    acc = round(accelerationY*100);
    if ((acc < 1 && acc > 0)||(acc < 0 && acc > -1)) acc = 0;
    // first germ, linear
    if(acc > 0 && firstGerm.dim < dimMax) {
        firstGerm.dim += abs(acc);
    }
    if(acc < 0 && firstGerm.dim > dimMin) {
        firstGerm.dim -= abs(acc);
    }
    // second germ with average
/*    if(avg > 0 && secondGerm.dim < dimMax) {
        secondGerm.dim += abs(avg);
    }
    if(avg < 0 && secondGerm.dim > dimMin) {
        secondGerm.dim -= abs(avg);
    }
    */
    if(avg > pavg && secondGerm.dim < dimMax) {
        secondGerm.dim += abs(avg);
        text("growing", 0,-100);
    }
    if(avg < pavg && secondGerm.dim > dimMin) {
        secondGerm.dim -= abs(avg);
        text("shrinking", 0,-100);
    }

    pavg = avg;

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
