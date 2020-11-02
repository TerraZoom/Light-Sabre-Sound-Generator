let hum1,hum2,buzz1,noise1;
let hum1Slider, hum2Slider, buzz1Slider;
let button;
let env;

function setup() {
  let cnv = createCanvas(100, 100);
  cnv.mousePressed(thumbSaber);
  background(220);
  text('Test your light saber', 20, 20);

  let t1 = 0.1; // attack time in seconds
  let l1 = 0.3; // attack level 0.0 - 1.0
  let t2 = 0.3; // decay time in seconds
  let l2 = 0.1; // decay level

  env = new p5.Envelope(t1,l1,t2,l2);

  hum1 = new p5.Oscillator(); // sine, triangle, sawtooth, square
  hum2 = new p5.Oscillator();
  buzz1 = new p5.Oscillator('sawtooth');

  // create sliders
  hum1Slider = createSlider(20,100,50);
  hum1Slider.position(100,20);
  hum2Slider = createSlider(20,150,50);
  hum2Slider.position(100,50);
  buzz1Slider = createSlider(20,150,50);
  buzz1Slider.position(100,80);
}

let status = 0; // off

function thumbSaber() {
  if(status == 1) {
    hum1.stop();
    hum2.stop();
    buzz1.stop();
    status = 0;
  } else {
  // note duration (in seconds)
    let dur = 5;

    // time from now (in seconds)
    let time = 0;

    // velocity (volume, from 0 to 1)
    let vel = 0.02;

    const hum1Note = hum1Slider.value();
    const hum2Note = hum2Slider.value();
    const buzz1Note = buzz1Slider.value();
    // notes can overlap with each other
    hum1.start();
    hum2.start();
    buzz1.start();
    env.play(hum1);
    env.play(hum2);
    hum1.amp(0.01);
    hum2.amp(0.01);
    buzz1.amp(0.001);
    hum1.freq(hum1Note); // F#2
    // hum1.play('C3', vel, time += 1/3, dur);
    // hum1.play('G3', vel, time += 1/3, dur);
    hum2.freq(hum2Note);
    buzz1.freq(buzz1Note);
    status = 1;
  }
}
