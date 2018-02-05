
var r, g, b;
var unit;
var dim, dimMax, dimMin;
var capture;

var zoom;
var acc;
var start;

var totAcc, avgAcc, pavg;

var ngerms = 100;
var germs = new Array();

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('limeGreen');

  unit = width/12;
  dim = unit;
  dimMax = unit;
  dimMin = unit/24;
  zoom = 0;
  start = false;

  for(var i=0; i<ngerms; i++) {
    var germ = new Germ();
    germ.show();
    germs.push(germ);
  }

  // setup camera capture
    // capture = createCapture(VIDEO);
    // capture.size(width, height/2);
  //hide video feed
    // capture.hide();

  noStroke();
  textSize(32);
}

function draw() {
  background(180,250,180);

  //image(capture, 0, 0, width, height);

  translate(width/2,height/2);

  for(var i=0; i<ngerms; i++) {
    //Pass acceleration value to Germ fro scaling
    germs[i].move();
    //Move the Germ
    if(start) {
      germs[i].show(zoom);
    }
  }

  zoom = map(touchY, height, 0, 0, 5);
  console.log(zoom);

  push();
    fill(0);
    //+
    rect(width/2-40, -height/2+25, 20, 10);
    rect(width/2-35, -height/2+20, 10, 20);
    //-
    rect(width/2-40, +height/2-30, 20, 10);

    stroke(0);
    strokeWeight(2);
    line(width/2-30, -height/2+30, width/2-30, +height/2-30);
    var czoom = map(touchY, 0 , height, -height/2+50, +height/2-30);
    if(czoom <= -height/2+50) {
      czoom = -height/2+50;
    } else if(czoom >= +height/2-35) {
      czoom = +height/2-35;
    }

    var dotdim = map(touchY, 0 , height, 25, 10)
    ellipse(width/2-30, czoom, dotdim, dotdim);
  pop();

  fill(0);
  text(touchY, 0,30);

  // text(firstGerm.dim, firstGerm.px-dim/8, firstGerm.py+dim/12);
}

function touchStarted() {
   start = true;
}

function Germ() {
  this.dim = random(dim/2,dim);
  this.px = random(-width/2+dim/2, width/2-dim/2);
  this.py = random(-height/2+dim/2, height/2-dim/2);
  this.green = random(150, 255);
  this.speed = random(1,3);

  this.move = function(){
      this.px += random(-this.speed, this.speed);
      this.py += random(-this.speed, this.speed);
  }

  this.show = function(zoom) {
    fill(100, this.green, 100);

    var cdim = this.dim*zoom+0;
    ellipse(this.px, this.py, cdim, cdim);

    fill(255);
    textSize(10);
//  text(this.dim, this.px, this.py);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log("size changed");
  unit = width/8;
  dim = unit*2;
}
