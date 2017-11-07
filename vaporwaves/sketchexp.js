
//Vaporwaves
//A e s t h e t i c   song visualizer

//Indici cene
var prima = 0;
var seconda = 60;
var terza = 120;
var fine = 180;

var u;

var nuvola1, nuvola2, nuvola3;
var nois, precnois;

function preload() {
  //nuvole
  // nuvola1 = loadImage("immagini/nuvola1.jpg");
  // nuvola2 = loadImage("immagini/nuvola2.jpg");
  // nuvola3 = loadImage("immagini/nuvola3.jpg");

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  noStroke();

  u = (windowWidth/windowHeight);
}

function draw() {
  background(50);

  translate(width/2, height/2);

  // Griglia
  push();
  griglia();
  pop();

  // Sfondo
  push();
    fill(20, 0, 80);
    rect( -width/2, -height/2, width, height/2 );
  pop();

  // Sole
  push();
    sole( 0, -height/3);
  pop();

  // Cose volanti
  push();
    nuvole();
  pop();


  //Scene
  //selezione scene (frameCount)
  //prima - seconda - terza
    if(frameCount < fine) {
      if (frameCount > prima && frameCount < seconda) {
        scena = 1;
      }
      if (frameCount > seconda && frameCount < terza) {
        scena = 2;
      }
      if (frameCount > terza) {
        scena = 3;
      }
    } else if (frameCount >= fine) {
//      noLoop();
    }
    fill(255);
    text( str(frameCount), -width+20, -height+20);
}

function sole(x, y) {
  var diam = int(60*u);
  var perc = 0;
  // console.log(diam);
  push();
    translate(x, y);
    fill(255, 200, 0);
    ellipse(0, 0, diam, diam);
    for (var i = 0; i > diam; i+=2*u) {
      //diam = (i*100)/diam;
      //rect(0-(diam/2), i, diam, u);
    }
  pop();
}

function nuvole() {
  fill(225, 200, 225, 150);
// image(width/2.4*sin(frameCount/190), -height/6, nuvola1);
// image(width/2.4*sin(frameCount/190), -height/6, nuvola1);
// image(width/2.4*sin(frameCount/190), -height/6, nuvola1);

  ellipse(width/2.4*sin(frameCount/190), -height/6, 150, 40);
  ellipse(width/2.4*sin(frameCount/150), -height/4, 150, 40);
  ellipse(width/2.4*sin(frameCount/180), -height/3, 150, 40);
}

function griglia() {
  stroke(230, 0, 230);
  var precp1 = {x: 0, y: 0};

  for (var i = -width; i < width; i+=u*51) {
//    line(sin(i), -width*0.5, i, height/2);
    for (var j = 0; j < height/2; j+=u*5) {
      // line(-width/2, j/0.8+precnois*100, width/2, j/0.8+noise*100);
      nois = noise(i/300);
      point(i, j*nois*2);
      line(precp1.x, precp1.y, i, j*nois*2);
      precp1.x = i;
      precp1.y = j*nois*2;

    }
  }

  var precp2 = {x: 0, y: 0};

  for (var i = 0; i < height/2; i+=40) {
    // line(-width/2, i/0.8, width/2, i/0.8);
    for (var j = -width/2; j < width; j+=10) {
      // line(-width/2, j/0.8+precnois*100, width/2, j/0.8+noise*100);
      nois = noise(j/350);
      point(j, i*nois*2);
      line(precp2.x, precp2.y, j, i*nois*2);
      precp2.x = j;
      precp2.y = i*nois*2;
    }
  }
}

//Utilità
//
//Screenshot function
function mousePressed() {
    // save();
}

//Responsive Canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log("size changed");
}
