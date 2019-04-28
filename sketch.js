let size = 20;
let sSlider;
let freqSlider;
let speedSlider;
let gapSlider;
let angle = 0;
let camAngle = 0;

function setup() {
    p5.disableFriendlyErrors = true;
    createCanvas(500, 500, WEBGL);

    createP('Block Size');
    sSlider = createSlider(4, 100, 20, 1);
    sSlider.style('width', '500px');

    createP('Gap Size');
    gapSlider = createSlider(1, 5, 1.1, 0.01);
    gapSlider.style('width', '500px');

    createP('Wave Frequency');
    freqSlider = createSlider(-80, 80, 20, 0.001);
    freqSlider.style('width', '500px');

    createP('Wave Speed');
    speedSlider = createSlider(0, 0.1, 0.02, 0.001);
    speedSlider.style('width', '500px');

    createP('Cam Speed');
    camSpeedSlider = createSlider(0, 0.1, 0.02, 0.001);
    camSpeedSlider.style('width', '500px');
}

function draw() {
    background(60);
    print(frameRate());
    size = sSlider.value();
    translate(0,100,-250);
    rotateX(radians(-40));
    rotateY(camAngle/4);
    
    var frequency = freqSlider.value();
    var gap = gapSlider.value();

    for (let xoff = -250 + size; xoff < 250 - size / 2; xoff+= size*gap) {
        for (let yoff = -250 + size; yoff < 250 - size / 2; yoff+= size*gap) {
            
            var xh = Math.cos((xoff)/(width)) * frequency;
            var yh = Math.cos(yoff/(width)) * frequency;
            var zh = xh + yh + angle;
            
            var height = (Math.sin(zh) + 1 ) * 100 + 10;
            fill(map(Math.sin(angle + xoff / 200), -1, 1, 0, 255), map(Math.cos(angle+ yoff / 400), -1, 1, 255, 0), map(Math.sin(angle), -1, 1, 255, 0));
            
            push();
            translate(xoff, -height/2, yoff);
            box(size, height, size);
            pop();
        }
    }
    
    angle += speedSlider.value();
    camAngle += camSpeedSlider.value();
    
}