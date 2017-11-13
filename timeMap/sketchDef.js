
//Clock, 4th assignment
//A clock for everydalife
//Characteristic style, visual immediacy, user-centered

var myClock;
var fast = 1;
var s,m,h;
var timeInd;
var light;

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

  //a.m or p.m.
  light = (h<20&&h>8? true : false);

  background(255);
  // console.log("> got time ");
  //draw clock
  myClock.update(windowWidth, windowHeight);
  // console.log("> clock updated");
  myClock.show();
  // console.log("> clock showed");

  //exploration
  noCursor();
  infoHover(mouseX, mouseY);

  //a.m./p.m. indication
  var day = light? "a.m." : "p.m.";
  textSize(16);
  textStyle(BOLD);
  text(day, width*0.94, height*0.05);
  //noLoop();
}


function infoHover(mx, my) {
  var posx = (int(map(mx, 0, width, 0, 60)));
  var posy = (int(map(my, 0, height, 0, 12)));

  fill(0);
  var explore = posy + " : " + posx;
  text(explore, mx-10, my-5);

  console.log();
}


function Clock() {
  this.curSize = {w:windowWidth, h:windowHeight};
  this.lins = new Array();

  this.update = function(_wi,_he) {
    this.curSize.w = _wi
    this.curSize.h = _he;
    this.px = 0;
    this.py = 0;

  }

  this.show = function() {
    for (var chour = 0; chour < 12; chour++) {
      var linn = new Lin(chour, this.curSize.w, this.curSize.h, light);
      this.lins.push(linn);
      this.lins[chour].show();
    }
  }
}

function Lin(chour, curSizew, curSizeh) {
  this.nline = chour;
  this.hdx = curSizew;
  this.hdy = curSizeh / 12;
  this.units = new Array();

  this.show = function() {
    for (var cmin = 0; cmin < 60; cmin++) {
      var unit = new Unit(cmin, this.nline, this.hdx, this.hdy);
      this.units.push(unit);
      this.units[cmin].show();
    }
  }
}


function Unit(cmin, nline, hdx, hdy) {
  this.ncol = cmin;
  this.mdx = hdx/60;
  this.mdy = hdy;
  this.nline = nline;
  this.curInd;

  this.show = function() {

    timeInd = m + (h-12) * 60;
    this.curInd = cmin + nline * 60;

    var alpha = 150;
    var lightfct = light? 255 : 0;

    if(this.curInd===timeInd) {
      // color for current time
      fill(255*(cmin/60), abs(255-lightfct), 255*(nline/12));
      // ellipse(this.mdx*cmin+this.mdy/4, (this.mdy*nline)+this.mdy/2, this.mdy*1.2);
      rect(this.mdx*cmin, (this.mdy*nline), this.mdx, this.mdy, this.mdy/5);

    } else {
      fill(200*(cmin/60)+50, lightfct, 200*(nline/12)+50, alpha);
      rect(this.mdx*cmin, (this.mdy*nline), this.mdx, this.mdy, this.mdy/5);
    }
    // rect(this.mdx*cmin + 3 + 6*cmin, (this.mdy*nline + 6*nline), this.mdx, this.mdy);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log("size changed");
  myClock.update(windowWidth, windowHeight);
  myClock.show();
}
