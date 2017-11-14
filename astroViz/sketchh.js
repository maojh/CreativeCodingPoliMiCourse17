var myData, iss;
var people = [];
var mw, mh;

var play = true;

function preload() {
  myData = loadJSON('assets/peopleinspace.json');
  // terra = loadImage("assets/moonwalk.jpg");
  // iss = loadImage("assets/moonwalk.jpg");
  // a1 = loadImage("assets/moonwalk.jpg");
  // a2 = loadImage("assets/moonwalk.jpg");
  // a3 = loadImage("assets/moonwalk.jpg");
  // a4 = loadImage("assets/moonwalk.jpg");
  // a5 = loadImage("assets/moonwalk.jpg");
  // a6 = loadImage("assets/moonwalk.jpg");
}

function setup() {
  createCanvas(windowHeight, windowHeight);

  for(var i = 0; i < myData.people.length; i++) {
    var astroData = myData.people[i];
    var newAstronaut = new Astronaut(i, astroData.launchdate, astroData.name, astroData.title, astroData.country);
    people.push(newAstronaut);
  }

  iss = new station(people);

  //margini
  mw = width/5;
  mh = height/15;

  frameRate();
}

t = 1;

function draw() {

  background(40);
  push();
    translate(width/2, height/2);
    iss.display();
  pop();

  label();
  // noLoop();
}





function station(people) {
  this.incrementX = 1;
  this.pox = 0;
  this.hstat = people[0].radius;
  this.wstat = 6*this.hstat;
  this.dir = 1;

  this.display = function() {
    push();
      if(this.pox > width/2-mw-this.wstat || this.pox < -width/2 + mw) {
        this.dir = -this.dir;
      }

      // iss img
      push();
        if(play) {
          this.pox += this.incrementX*this.dir;
          translate(this.pox, 0);
        }
        // img();
        fill(0, 100, 255);
        noStroke();
        rect(-this.hstat/2, this.hstat*1.5, this.wstat, this.hstat);
      pop();

      for(var i = 0; i < people.length; i++) {
        people[i].display(this.pox);
      }
    pop();
  }
}

function Astronaut(i, launchDate, name, title, country) {

    this.name = name;
    this.title = title;
    this.radius = 15;
    this.x = i*this.radius*1.5;
    this.y = height/2;


    // transform the launch date from String
    // to a date Object calculated in milliseconds
    this.launchDate = Date.parse(launchDate);
    // calculate the time spent in space
    this.timeInSpace = Date.now() - this.launchDate;

    this.hover = function() {

      var mX = mouseX-width/2;
      var mY  = mouseY-width/2;
      var labelX = width/2-mw;
      var labelY = -height/2+mh;

      if( int(dist(mX, mouseY, this.x, height/2))<this.radius*0.6) {
        play = false;
        console.log(play);
        push();
          fill(200, 100);
          stroke(255);
          rect(labelX-width/8, labelY, width/4, height/3);

          noStroke()
          fill(255);
          // rotate(HALF_PI);
          textAlign(CENTER);
          text(this.name, labelX, labelY+this.radius*2);
        pop();
      }
    }

    this.display = function(posx) {
        this.x = i*this.radius;
        push();

          fill(245);
          ellipse(this.x+posx, 0, this.radius);
        pop();
       //this.hover();

    }
}

function label() {
  var mX = mouseX-width/2;
  var mY  = mouseY-width/2;
  var labelX = width/2-mw;
  var labelY = -height/2+mh;

  for(var p=0; p<people.length; p++) {
    ellipse(people[p].x, 50, 20, 20);
    if( int(dist(mX, mouseY, people[p].x, height/2))<people[p].radius*0.6) {
      play = false;
      console.log(play);
      push();
        fill(200, 100);
        stroke(255);
        rect(labelX-width/8, labelY, width/2, height/3);

        noStroke()
        fill(255);
        // rotate(HALF_PI);
        textAlign(CENTER);
        text(people[p].name, labelX, labelY+people[p].radius*2);
      pop();
  } else {
    play = true;
  }
  }
}
