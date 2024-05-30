let imgProcessor;
let artRenderer;
let sound;
let amplitude;

// ImageProcessor class to handle image loading and processing
class ImageProcessor {
    constructor(imagePath) {
        this.img = loadImage(imagePath); // Load the image
    }

    // Method to resize the image
    resizeImage(width, height) {
        this.img.resize(width, height); // Resize the image to fit the given dimensions
    }

    // Method to get the color at a given position
    getColor(x, y) {
        return this.img.get(x, y); // Get the color of the pixel at the selected coordinates
    }
}

// ArtRenderer class to handle drawing the artistic effect
class ArtRenderer {
    draw(x, y, col, amp) {
        let length = map(saturation(col), 0, 255, 1, 40) * amp; // Map the saturation of the color to a length, scaled by amplitude
        let angle = map(hue(col), 0, 255, 0, 360); // Map the hue of the color to an angle

        // Adjust color based on amplitude
        let dynamicColor = lerpColor(color(red(col), green(col), blue(col)), color(255, 0, 0), amp); // Blend the color with red based on amplitude
        // the function "lerpColor" was learn from p5js.org. 

        fill(red(dynamicColor), green(dynamicColor), blue(dynamicColor), 127); // Set the fill color with some transparency
        noStroke(); // Disable the drawing of the outline
        push(); // Save the current drawing style and transformation
        translate(x, y); // Move the origin to (x, y)
        rotate(radians(angle)); // Rotate by the mapped angle
        rect(0, 0, length, 1); // Draw a rectangle with the mapped length
        pop(); // Restore the previous drawing style and transformation
    }
}

// Preload function to create an instance of ImageProcessor, load the image and the music
function preload() {
    imgProcessor = new ImageProcessor("./Claude_Monet,_Saint-Georges_majeur_au_crépuscule.jpg"); // Create a new ImageProcessor instance and load the image
    sound = loadSound('01 Fires Of Rubicon_Copy.mp3'); // Load the music file
}

// Setup function to initialize the canvas, the image, and the sound
function setup() {
    createCanvas(windowWidth, windowHeight); // Create a canvas with the same size as the window
    imgProcessor.resizeImage(width, height); // Resize the image to fit the canvas
    background(0); // Set the background to black
    artRenderer = new ArtRenderer(); // Create a new ArtRenderer instance
    
    // Setup sound
    sound.loop(); // Loop the sound
    amplitude = new p5.Amplitude(); // Create a new amplitude analyzer

    // Add a button to control play/pause functionality
    let button = createButton('Play/Pause');
    button.mousePressed(play_pause);
    button.position((width - button.width) / 2, height - button.height - 2);
}

// Draw function to draw rectangles based on pixel colors and sound amplitude
function draw() {
    let level = amplitude.getLevel(); // Get the current amplitude level
    
    // Loop 1000 times to draw 1000 rectangles randomly
    for (let i = 0; i < 1000; i++) {
        let x = int(random(width)); // Randomly select an x-coordinate within the canvas width
        let y = int(random(height)); // Randomly select a y-coordinate within the canvas height
        let col = imgProcessor.getColor(x, y); // Get the color at the selected coordinates using the ImageProcessor instance
        artRenderer.draw(x, y, col, level); // Draw a colored rectangle using the ArtRenderer instance, scaled by the amplitude
    }
}

// Function to toggle play/pause for the music，link to: https://canvas.sydney.edu.au/courses/56592/pages/week-11-tutorial?module_item_id=2258248
function play_pause() {
    if (sound.isPlaying()) {
        sound.pause(); // Pause the music if it is currently playing
    } else {
        sound.loop(); // Loop the music if it is currently paused
    }
}