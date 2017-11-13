
//Clock, 4th assignment
//A clock for everydalife
//Characteristic style, visual immediacy, user-centered

var myClock;
var fast = 1;
var s,m,h;
var timeInd;
var light;
var posx, posy;
var ampm;

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

  // Get mouse discrete position
  posx = (int(map(mouseX, 0, width, 0, 60)));
  posy = (int(map(mouseY, 0, height, 0, 12)));

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
  myClock.hover();
  ampm = h>12 && (h<23&&m<59)? "p.m." : "a.m.";
  infoHover(ampm, posx, posy);

  //a.m./p.m. indication
  textSize(16);
  textStyle(BOLD);
  text(ampm, width*0.90, height*0.05);
  //noLoop();
  console.log(h + " " + m);

}


function infoHover(ampm, px, py) {
  fill(0);
  if(ampm=="a.m.") { 
    if(py < 10) {
        py = "0" + py;
    }
  } else {
    py+12;
  }
  px = px<10? "0" + px : px;
  var explore = py + " : " + px;
  text(explore, mouseX-10, mouseY-5);
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

  this.hover = function() {
    for (var chour = 0; chour < 12; chour++) {
      this.lins[chour].hover();
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

  this.hover = function() {
      for (var cmin = 0; cmin < 60; cmin++) {
        this.units[cmin].hover();
      }
  }
}


function Unit(cmin, nline, hdx, hdy) {
  this.ncol = cmin;
  this.mdx = hdx/60;
  this.mdy = hdy;
  this.nline = nline;
  this.curInd;
  this.alpha = 150;

  this.show = function() {
    if(ampm == "p.m") {
      timeInd = m + (h-12) * 60;
    } else {
      timeInd = m + (h) * 60;
    }
    this.curInd = cmin + nline * 60;

    var lightfct = light? 255 : 0;

    if(this.curInd===timeInd) {
      // color for current time
      fill(255*(cmin/60), abs(255-lightfct), 255*(nline/12), this.alpha-30);
      // ellipse(this.mdx*cmin+this.mdy/4, (this.mdy*nline)+this.mdy/2, this.mdy*1.2);
      rect(this.mdx*cmin, (this.mdy*nline), this.mdx, this.mdy, this.mdy/5);

    } else {
      fill(200*(cmin/60)+50, lightfct, 200*(nline/12)+50, this.alpha);
      rect(this.mdx*cmin, (this.mdy*nline), this.mdx, this.mdy, this.mdy/5);
    }
    // rect(this.mdx*cmin + 3 + 6*cmin, (this.mdy*nline + 6*nline), this.mdx, this.mdy);
  }

  this.hover = function() {
    if (posx == int(this.ncol) && posy == int(this.nline)) {
      this.alpha = 245;
    } else {
      this.alpha = 150;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log("size changed");
  myClock.update(windowWidth, windowHeight);
  myClock.show();
}
