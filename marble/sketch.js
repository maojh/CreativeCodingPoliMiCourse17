
//mobileMarble

var marbles = new Array();
var orient;
var hit;

function preload() {
    back = loadImage("assets/back1.jpg");
    marb = loadImage("assets/marble_o.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  var first = new marble();
  marbles.push(first);

  colorMode(HSB);
  noStroke();
}

function draw() {
  background(back, 0, 0);

  translate(width/2, height/2);

  fill(255);

  for (var i = 0; i < marbles.length; i++) {
    marbles[i].update(rotationX, rotationY);
    if(i<marbles.length-1){
      hit = marbles[i].collision(marbles[i+1]);
      text(str(hit), 0, 0);
    if(hit){
        background(0);
        marbles[i].posx = random(0, width);
        marbles[i].posy = random(-height, 0);
      }

    }
    marbles[i].show();
  }
}


function mousePressed() {
  save();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log("size changed");
}

function marble(col) {
  this.size = width/5;
  this.posx = random(0, width/2);
  this.posy = random(-height/2, 0);
  this.accx = 0.5;
  this.accy = 0.5;
  var range = 0.05;
  var ease = 0.2;

  this.update = function(ay, ax) {
    this.accx = round(ax, 2)/2;
    this.accy = round(ay, 2)/2;
    var newposx = this.posx+this.accx;
    var newposy = this.posy+this.accy;

    this.posx += ((this.posx+this.accx)-this.posx)*ease;
    this.posx = constrain(this.posx, -width/2, +width/2-this.size*1.3);
    this.posy += ((this.posy+this.accy)-this.posy)*ease;
    this.posy = constrain(this.posy, -height/2, +height/2-this.size*1.3);
  }

  this.collision = function(obj) {
      var hit = collideCircleCircle(this.posx, this.posy, this.sixe/2, obj.posx, obj.posy, obj.sixe/2);
      return hit;
  }

  this.show = function() {
    fill(0, 0, 10, 50);
    var off = 65;
    var dim = 80;
    ellipse(this.posx+off, this.posy+off, dim, dim);
    fill(this.col, 255, 150);
    image(marb, this.posx, this.posy, 100, 100);
  }
}

function addMarble() {
  var newMarble = new marble();
  marbles.push(newMarble);
}
