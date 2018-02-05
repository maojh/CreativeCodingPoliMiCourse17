
var img
var angle = 0
var textr

function preload() {
  img = loadImage('salmonella.png')
}

function setup() {
  createCanvas(600,500,WEBGL)

  textr = createGraphics(600,600)
  noStroke()
}

function draw() {
  background(0)
  rotateX(2)
  ambientLight(50)
  directionalLight(255,255,255,0,0,1)

  textr.image(img, 0, 0, 1000, 1000)
  textr.tint(255, 255)
  plane(200, 200)

  push()
    rotateX(angle)
    rotateY(angle*1.5)
    rotateZ(angle*2)
    // normalMaterial()

    texture(textr)
    translate(-60,120, 0)
    beginShape(TRIANGLE_STRIP);
      vertex(0,0,0,     0, 0)
      vertex(120,0,0,   0, 1)
      vertex(0,210,0,   1, 0)
      vertex(120,210,0, 1, 1)
    endShape(CLOSE);
  pop()


  // plane(100, 150)
  angle += 0.01
}
