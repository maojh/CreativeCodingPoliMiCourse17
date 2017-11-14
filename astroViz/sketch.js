var myData, iss;
var people = [];
var mw, mh;
var iss, terra;

var play = true;

function preload() {
  myData = loadJSON('assets/peopleinspace.json');
   terra = loadImage("assets/Earth-PNG.png");
     isss = loadImage("assets/iss.png");
   twitter = loadImage("assets/twitter3.png");
   wiki = loadImage("assets/wiki.png");
   a0 = loadImage("assets/randy.jpg");
   a1 = loadImage("assets/sergey.jpg");
   a2 = loadImage("assets/paolo.jpg");
   a3 = loadImage("assets/mark.jpg");
   a4 = loadImage("assets/joseph.jpg");
   a5 = loadImage("assets/alexander.jpg");
}

function setup() {
  createCanvas(windowHeight, windowHeight);

  for(var i = 0; i < myData.people.length; i++) {
    var astroData = myData.people[i];
    var newAstronaut = new Astronaut(i, astroData.launchdate, astroData.biophoto, astroData.name, astroData.title, astroData.country,astroData.careerdays);
    people.push(newAstronaut);
  }


  //margini
  mw = width/5;
  mh = height/15;

  frameRate(10);
}

var c = 0;
var inc = 1;

function draw() {
    c+=inc;
  background(0,10,20);
  translate(width/2, height/2);

  push();
    translate(-width/4, -width/4);
    image(terra, 0, 0, width/2, height/2);
  pop();


  push();
    var tras = -width/40+width/2.5*sin(c/10);
    //translate(tras,0);
    var scal = map(cos(c/10), -1, 1, 0.5, 1);
    scale(scal);

    if(scal>0.7) {
      push();
        // rotate(c/150);
        image(isss, tras, 0, height/8, height/8);
      pop();
      for(var p=0; p<people.length; p++) {
          people[p].display(tras);
      }

    }
  pop();


   //noLoop();
}

function Astronaut(i, launchDate, biophoto, name, title, country, careerdays) {
    this.name = name;
    this.title = title;
    this.radius = width/40;
    this.x = i*this.radius*1;
    this.y = height/2;
    this.biophoto = biophoto;

    // transform the launch date from String
    // to a date Object calculated in milliseconds
    this.launchDate = Date.parse(launchDate);
    // calculate the time spent in space
    this.timeInSpace = Date.now() - this.launchDate;

    this.hover = function(posx) {
      if(mouseX>0&&mouseX<width && mouseY>0&&mouseY<height) {
        var mX = mouseX-posx*2;
        var mY = mouseY;
        // console.log(dist(mouseX, mouseY, this.x, this.y)/30 +" "+ this.radius*0.75);
      if(dist(mouseX, mouseY, this.x, this.y) < this.radius*0.75) {
          //fill(0, 50, 250, 255);
      }
    }
  }


  this.display = function(posx) {
    noStroke();
    var opac = map(careerdays, 0, 175, 100, 255);

    switch(country) {
      case 'usa':
        fill("Crimson");
      break;
      case 'russia':
        fill("Cyan");
      break;
      case 'italy':
        fill("SpringGreen");
      break;
    }
      this.hover(posx);
      var h = i;
      posx += this.radius*h;

      var posy;
      if (i%2==0) {
        posy = this.radius*2;
      } else {
        posy = this.radius*4;
        posx -= this.radius;
      }
      if(this.title=="Commander") {
        rectMode(CENTER);
        rect(posx,posy,this.radius, this.radius);
      } else {
        ellipse(posx,posy,this.radius, this.radius);
      }

    }
}


function mousePressed() {
    inc = abs(1-inc);
  console.log(inc);
  save();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log("size changed");
}
