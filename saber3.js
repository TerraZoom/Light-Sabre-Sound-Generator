let hum1,hum2,buzz1,noise1;
let hum1Slider, hum2Slider, buzz1Slider;
let hum1VolSlider, hum2VolSlider, buzz1VolSlider;
let env;
let analyzer1, analyzer2;

// amplitude - will return loudness
// fft - will return frequency

let saberHeight = 100;
let saberWidth = window.innerWidth * .8;

function setup() {
  let cnv = createCanvas(saberWidth, saberHeight);
  cnv.mousePressed(thumbSaber);
  background(220);
  text('Test your light saber', 20, 20);

  let start_t1 = 0.1; // attack time in seconds
  let start_l1 = 0.3; // attack level 0.0 - 1.0
  let start_t2 = 0.3; // decay time in seconds
  let start_l2 = 0.1; // decay level
  let end_t1 = 0.0; // attack time in seconds
  let end_l1 = 0.05; // attack level 0.0 - 1.0
  let end_t2 = 0.5; // decay time in seconds
  let end_l2 = 0.0; // decay level

  start_env = new p5.Envelope(start_t1,start_l1,start_t2,start_l2);
  end_env = new p5.Envelope(end_t1,end_l1,end_t2,end_l2);

  // env = new p5.Envelope(t1,l1,t2,l2);

  hum1 = new p5.Oscillator("sine"); // sine, triangle, sawtooth, square
  hum2 = new p5.Oscillator("sine");
  buzz1 = new p5.Oscillator('sawtooth');
  noise1 = new p5.Noise();
  analyzer1 = new p5.Amplitude();

  // create sliders
  // createSlider(min,max,initial,step)
  hum1Slider = createSlider(20,150,120,10);
  hum1Slider.position(100,saberHeight+50);
  hum1VolSlider = createSlider(0,1,0.1,0.01);
  hum1VolSlider.position(400,saberHeight+50);

  hum2Slider = createSlider(20,150,90,10);
  hum2Slider.position(100,saberHeight+80);
  hum2VolSlider = createSlider(0,1,0.1,0.01);
  hum2VolSlider.position(400,saberHeight+80);

  buzz1Slider = createSlider(20,150,50);
  buzz1Slider.position(100,saberHeight+110);
  buzz1VolSlider = createSlider(0,0.1,0.003,0.001);
  buzz1VolSlider.position(400,saberHeight+110);

  noise1VolSlider = createSlider(0,0.01,0.0005,0.0001);
  noise1VolSlider.position(400,saberHeight+140);
}

let status = 0; // off

function thumbSaber() {
  if(status == 1) {
    // hum1.stop();
    // hum2.stop();
    end_env.play(hum1);
    end_env.play(hum2);
    buzz1.stop();
    noise1.stop();
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
    const hum1Amp = hum1VolSlider.value();
    const hum2Amp = hum2VolSlider.value();
    const buzz1Note = buzz1Slider.value();
    const buzz1Amp = buzz1VolSlider.value();
    const noise1Amp = noise1VolSlider.value();

    // notes can overlap with each other
    hum1.start();
    hum2.start();
    buzz1.start();
    noise1.start();
    start_env.play(hum1);
    start_env.play(hum2);
    // env.play(hum1);
    // env.play(hum2);
    // hum1.amp(0.3);
    // hum2.amp(0.3);
    hum1.amp(hum1Amp);
    hum2.amp(hum2Amp);
    buzz1.amp(buzz1Amp); // 0.001);
    noise1.amp(noise1Amp);
    hum1.freq(hum1Note); // F#2
    // hum1.play('C3', vel, time += 1/3, dur);
    // hum1.play('G3', vel, time += 1/3, dur);
    hum2.freq(hum2Note);
    buzz1.freq(buzz1Note);
    status = 1;
  }
}

function swingSaber() {

}
