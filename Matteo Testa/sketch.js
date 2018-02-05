var myBg, mic, volume;

function preload() {
  myBg = loadImage('assets/base.png');
  body = loadImage('assets/jack/corpo.png');
  leg = loadImage('assets/jack/gamba2.png');
  head = loadImage('assets/jack/testa.png');
  mouth = loadImage('assets/jack/mandibola.png');
  arm = loadImage('assets/jack/braccio.png');

}

var snowflakes = []

function setup() {
  createCanvas(windowWidth, windowHeight);

  //With microphone
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  volume = mic.getLevel();
  volume = map(volume,0,1,0,2)
  push();

  //translate(0,0);
  background('#060606');
  text(volume,5,height-5);


  //move the center respect to the head
  push();

      translate(width/2,height/2-100);
      imageMode(CENTER);
      image(myBg, 0,height*0.2, height*1.7, height);
      //original dimensions: 800*450px
      push();
        translate(-35, -10);
        scale(0.15);
        image(body, 0, 0);
      pop();
      push();
        translate(-40, -90);
        scale(0.2);
        image(head, 0, 0);
        translate(-30, 20);
        rotate(map(volume, 0, 2, 0, -PI/3));
        image(mouth, 0, 0);
        fill('black');
  //      ellipse(-20,-13,35,35);
      pop();

    //LEG
    // transformations just for the nose
//    push();
      var legRotation = map(volume,0,1,PI/2.5,PI/5);
      rotate(legRotation);

      var legWidth = 20;
      var legLength = 35;
      var legX = 0;
      var legY = -40;

      push();
      var legRotation = map(volume,0,1,-2.5*PI,-2.3*PI);
      // translate(-65,47);
      fill(255, 0, 0);

      translate(-75,40);
      rotate(legRotation);
      // push();
        translate(-7,20);
        scale(0.2);
        image(arm);
      // pop();
      pop();

      push();

        translate(-50,20);
        fill(255);
        // rotate(-PI/2);
        rotate(legRotation);

        push();
          translate(17,35);
          scale(0.16);
          image(leg);
        pop();
      pop();
     pop();
  pop();


  //SNOWFLAKES
  if(true){
    var amount= map(volume,0,1,0,5);
    for(i=1; i <= amount; i++) {
      var obj = {
        x: random(0,1),
        y: random(0,-height/10),
        size: random(1, amount+5)
      }
      //add snowflake to the array of snowflakes
      snowflakes.push(obj);
    }
  }


  for(var i=0; i< snowflakes.length; i++) {
    var fallingSpeed = 1;

    // Increase the single snowflake vertical position
    snowflakes[i].y += fallingSpeed + snowflakes[i].y*0.006; // the last piece needs to simulate gravity

    // Create a new ellipse using the x and y properties of the snowflake object
    fill(235,235,188)
    noStroke();
    fill(255, 200);
    push();
    translate(width/4, 0);
    rotate(PI*snowflakes[i].size);
    rect(snowflakes[i].x*width, snowflakes[i].y, snowflakes[i].size, snowflakes[i].size);
    pop();
  }

  // Ideally at the end of the sketch:
  // remove elements from array when they go out of the window
  // (not a minimum requirement, just useful for better performances)
  for (var i=snowflakes.length-1; i>= 0; i--){
    if (snowflakes[i].y > height){
      snowflakes.splice(i,1);
    }
  }

  fill(0,255, 0);
  text("$ Hackin' all the way! 0x0h0h0h", 20, 20)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
