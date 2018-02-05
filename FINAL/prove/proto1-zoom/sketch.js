
var videoInput;
var aY, aV;
var u = 0;
var dim = 250;
var pdim;
var ease = 0.01;
var thresh = 0.05;

function setup() {
  createCanvas(windowWidth, windowHeight);

  u = (height/width)*80;

  // setup camera capture
  videoInput = createCapture(VIDEO);
  videoInput.size(width, height/2);
  //hide video feed
  videoInput.hide();

  noStroke();
  textSize(32);
  fill(255);

  aV = 0;

  frameRate(5);
}

function draw() {
  background(0, 255, 0);

  translate(width/2, height/2);

  imageMode(CENTER);
  image(videoInput, 0, 0, width, height);

  if(rotationX>thresh && rotationX>thresh) {
    if (frameCount%1000) {
      //Get vertical device acceleration
      aY = accelerationY;
      aV = aY-pAccelerationY;
    }

    push();
    fill(255);
    if(abs(aY) != 0) {
      var cdim = dim;
      if(aY>0){
        cdim *= aY++;
      } else {
        cdim /= aY ;
      }
    }
    var curdim = pdim+(cdim-pdim)*ease;
    ellipse(0, 0, curdim, curdim);
    pop();

  }

  pdim  = cdim;

  text(pdim,200,150);
}

function mousePressed() {
  //save();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log("size changed");
}
