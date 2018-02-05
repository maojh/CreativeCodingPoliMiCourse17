
var r, g, b;
var unit;
var dim, dimMax, dimMin;
var videoInput;

var zoom = 0;
var acc;

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

  for(var i=0; i<ngerms; i++) {
    var germ = new Germ();
    germ.show();
    germs.push(germ);
  }

  // setup camera capture
  videoInput = createCapture(VIDEO);
  videoInput.size(width, height/2);
  //hide video feed
  videoInput.hide();

  noStroke();
  textSize(32);
}

function draw() {
  background(180,250,180);

  imageMode(CENTER);
  image(videoInput, 0, 0, width, height);

  translate(width/2,height/2);

  for(var i=0; i<ngerms; i++) {
    //Pass acceleration value to Germ fro scaling
    germs[i].move();
    //Move the Germ
    germs[i].show(zoom);
  }

  zoom = map(touchY, height, 0, 0, 2);

  fill(0);
  text(touchY, 0,30);

  // text(firstGerm.dim, firstGerm.px-dim/8, firstGerm.py+dim/12);
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
