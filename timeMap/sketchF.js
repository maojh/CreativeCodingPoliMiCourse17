
var myClock;
var fast = 1;
var s,m,h;
var timeInd;

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(windowWidth + " " + windowHeight);
  myClock = new Clock();
  console.log("> clock instantiated");
  noStroke();
}

function draw() {
  //Get time, with Fast var for testing
  s = second()*fast;
  m = minute()*fast;
  h = hour()*fast;
  //set dynamic background
  // var back = map(s, 0, 60, 100, 250);
  // background(back);
  background(255);
  // console.log("> got time ");
  //draw clock
  myClock.update(windowWidth, windowHeight);
  // console.log("> clock updated");
  myClock.show();
  // console.log("> clock showed");

  //show time for test
  fill(0);
  textSize(30);
  // formatting strings with 0s
  h = h<10? "0"+h : h; m = m<10? "0"+m : m; s = s<10? "0"+s : s;
  text(h + ":" + m + ":" + s, width/2.37, height/1.98);

  console.log(12*60);
  //noLoop();
}

function Clock() {
  this.curSize = {w:windowWidth, h:windowHeight};
  this.lins = new Array();
  this.light;

  this.update = function(_wi,_he) {
    this.curSize.w = _wi
    this.curSize.h = _he;
    this.px = 0;
    this.py = 0;
    this.light = (this.h<12? true : false);
  }

  this.show = function() {
    for (var chour = 0; chour < 12; chour++) {
      var linn = new Lin(chour, this.curSize.w, this.curSize.h, this.light);
      this.lins.push(linn);
      this.lins[chour].show();
    }
  }
}

function Lin(chour, curSizew, curSizeh, light) {
  this.nline = chour;
  this.light = light;
  this.hdx = curSizew;
  this.hdy = curSizeh / 12;
  this.units = new Array();

  this.show = function() {
    for (var cmin = 0; cmin < 60; cmin++) {
      var unit = new Unit(cmin, this.nline, this.hdx, this.hdy, this.light);
      this.units.push(unit);
      this.units[cmin].show();
    }
  }
}


function Unit(cmin, nline, hdx, hdy, light) {
  this.ncol = cmin;
  this.light = light;
  this.mdx = hdx/60 - 6;
  this.mdy = hdy - 5;
  this.nline = nline;

  this.show = function() {

    timeInd = m + (h-12) * 60;
    var curInd = cmin + nline * 60;

    var alpha = 150;
    var lightfct = light? 255 : 0;

    if(curInd===timeInd) {
      fill(255*(cmin/60), abs(255-lightfct), 255*(nline/12));
      rect(this.mdx*cmin + 3 + 6*cmin, (this.mdy*nline + 6*nline), this.mdx, this.mdy);
    } else {
      fill(200*(cmin/60)+50, lightfct, 200*(nline/12)+50, alpha);
      rect(this.mdx*cmin + 3 + 6*cmin, (this.mdy*nline + 6*nline), this.mdx, this.mdy);

    }

  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log("size changed");
  myClock.update(windowWidth, windowHeight);
  myClock.show();
}
