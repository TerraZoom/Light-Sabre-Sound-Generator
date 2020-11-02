var wave;
var button;
var slider;
var playing;
var env;

function setup() {
  createCanvas(400, 400);

  env = new p5.Envelope();
  env.setADSR(0.15, 0.2, 0.5, 0.5);
  env.setRange(0.8, 0);

  wave = new p5.Oscillator();
  slider = createSlider(100, 1200, 440);

  wave.setType('sine');
  wave.start();
  wave.amp(env);
  wave.freq(440);

  button = createButton("play/pause");
  button.mousePressed(toggle);
}

function draw() {
  wave.freq(slider.value());
  if (playing) {
    background(255, 0, 255);
  } else {
    background(51);
  }
}

function toggle() {
  env.play();
  // if (!playing) {
  //   wave.amp(1, 1);
  //   playing = true;
  // } else {
  //   wave.amp(0, 1);
  //   playing = false;
  // }
}
