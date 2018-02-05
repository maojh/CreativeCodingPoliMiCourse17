function setup() {

	// Create the canvas
	createCanvas(windowWidth, windowHeight);

	// Deal with microphone
	mic = new p5.AudioIn();
	mic.start();
}

function draw() {

	//get the volume
	var volume = mic.getLevel();

	background(200);

	push();

	//Start with transformations
	//move to the center of the canvas
	translate(width / 2, height / 2);

	// Set the new size. Volume goes from 0 to 1.
	// You can remap it to any size you want.
	var minSize = width / 20;
	var maxSize = width;
	var size = map(volume, 0, 1, minSize, maxSize);

	//draw an ellipse
	ellipse(0, 0, size);

	//All transformation are now dropped and the coordinate system is resetted.
	pop();

}

//if the window is resized, update the sketchs
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}