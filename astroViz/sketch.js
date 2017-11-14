var myData, iss;
var people = [];
var mw, mh;

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
  createCanvas(500, 500);

  for(var i = 0; i < myData.people.length; i++) {
    var astroData = myData.people[i];
    var newAstronaut = new Astronaut(astroData.launchdate, astroData.name, astroData.title, astroData.country);
    people.push(newAstronaut);
  }

  iss = new station(people);

  mw = width/20;
  mh = height/20;
}

function draw() {
  background(40);
  translate(width/2, height/2);

  iss.display();

  // noLoop();
}

function station(people) {
  this.incrementX = 1;
  this.pox = width/2;

  this.display = function() {
    push();
      if(this.incrementX > width-mw || this.incrementX < mw) {
        this.incrementX = 1 - this.incrementX;
      } else {
        translate(this.pox, 0);
        this.pox += this.incrementX;
      }

      for(var i = 0; i < people.length; i++) {
        people[i].display(i);
      }
    pop();
  }
}

function Astronaut(launchDate, name, title, poy, pox) {

    this.name = name;
    this.title = title;
    this.x = pox;
    this.y = poy;
    this.radius = 20;

    // transform the launch date from String
    // to a date Object calculated in milliseconds
    this.launchDate = Date.parse(launchDate);
    // calculate the time spent in space
    this.timeInSpace = Date.now() - this.launchDate;

    this.hover = function() {
    }

    this.display = function(i) {
        this.x = i*this.radius;

        var mX = map(mouseX, 0, windowWidth, -width/2, width/2, true);
        // var mouse = width/1.4-mX;
        var mouse = mX;

        if( int(dist(mouse, mouseY, this.x, height/2))<=this.radius/2) {
          push();
            fill(155);
            // rotate(HALF_PI);
            textAlign(CENTER);
            print(this.name);
            text(this.name, mouse, +1.5*this.radius);
          pop();
        }
          ellipse(this.x, 0, 20);
          print(mouse);
    }
}
