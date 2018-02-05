var ctracker;

function setup() {

  // setup camera capture
  var videoInput = createCapture(VIDEO);
  videoInput.size(400, 400);
  videoInput.position(0, 0);

  //hide video feed
  videoInput.hide();

  // setup canvas
  var cnv = createCanvas(800, 600);
  cnv.position(0, 0);

  // setup tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(videoInput.elt);

  frameRate(15);

  noStroke();
}

function draw() {

  //background(255,0,255);
  fill(sin(frameCount*25)*210,200,200,29);
  rect(0,0,width,height);
  var fac = width/20;

  translate(-fac/3, -fac/3);
  scale(1.2);

  for(var w=0; w<width; w+=fac/2) {
    for(var h=0; h<height; h+=fac/2) {
      var rand = random(w*h);
      var noz = noise(rand);
      fill(noz*200,30);
      ellipse(w+(rand/10000)*fac/4,h+noz*fac/3, fac*noz*1.2, fac*noz);
    }
  }

  //get array of face marker positions [x, y] format
  var positions = ctracker.getCurrentPosition();

  // important points
  // eyes:27-32; nose:62; mouth:44-47-50-53;

  for (var i=0; i<positions.length; i++) {

    //face
    fill(180, 2);
    var faceW = positions[0][0]-positions[14][0];
    var faceH = positions[33][1]-positions[7][1];
    //ellipse(positions[0][0]-faceW/2, positions[0][1],faceW*1.1, faceH*1.3)

    //Eyes
    fill(205, 8);
    ellipse(positions[32][0], positions[32][1], 20, 10);
    ellipse(positions[27][0], positions[27][1], 20, 10);
    fill(55,5);
    ellipse(positions[32][0], positions[32][1], 7, 10);
    ellipse(positions[27][0], positions[27][1], 7, 10);

    //Nose
    fill(230, 190, 190, 6);
    noseH = positions[33][1]-positions[62][1];
    ellipse(positions[33][0], positions[62][1]-20, 7, noseH*0.8);

    //mouth
    fill(220, 190, 190, 7);
    mouthW = positions[44][0]-positions[50][0];
    mouthH = positions[53][1]-positions[47][1];
    ellipse(positions[47][0], positions[47][1], mouthW/2, mouthH/3);
  }

}


function mousePressed() {
  save("cover.png");
}
