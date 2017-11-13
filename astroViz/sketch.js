var myData, iss;
var people = [];
var mw, mh;

function preload() {
  myData = loadJSON('assets/peopleinspace.json');
}

function setup() {
  createCanvas(500, 500);

  //print(myData);
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
}

function station(people) {
  this.incrementX = 1;
  this.pox = height/2;

  this.display = function() {
    push();
      if(this.incrementX > width-mw || this.incrementX < mw) {
        this.incrementX = 1 - this.incrementX;
      } else {
        print(iss.pox)
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

    // transform the launch date from String
    // to a date Object calculated in milliseconds
    this.launchDate = Date.parse(launchDate);
    // calculate the time spent in space
    this.timeInSpace = Date.now() - this.launchDate;

    this.display = function(i) {
        var xpos = i*20;
        print(xpos);
        if(this.title == 'commander') {
          fill(50,50,250);
        } else {
          fill(200,250,200);
        }

        ellipse( xpos, 0, 20);

        push();
          fill(0);
          rotate(HALF_PI);
          textAlign(CENTER);
          text(this.name, xpos, 0);
        pop();
    }
}
