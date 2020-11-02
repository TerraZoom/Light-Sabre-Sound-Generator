let hum1,hum2,buzz1,noise1;
let hum1Slider, hum2Slider, buzz1Slider;
let hum1VolSlider, hum2VolSlider, buzz1VolSlider;
let button;
let env;

function setup() {
  let cnv = createCanvas(100, 100);
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

  hum1 = new p5.Oscillator(); // sine, triangle, sawtooth, square
  hum2 = new p5.Oscillator();
  buzz1 = new p5.Oscillator('sawtooth');

  // create sliders
  // createSlider(min,max,initial,step)
  hum1Slider = createSlider(20,100,50);
  hum1Slider.position(100,20);
  hum2Slider = createSlider(20,150,50);
  hum2Slider.position(100,50);
  buzz1Slider = createSlider(20,150,50);
  buzz1Slider.position(100,80);

  hum1VolSlider = createSlider(0,1,0.3,0.1);
  hum1VolSlider.position(400,20);
  hum2VolSlider = createSlider(0,1,0.3,0.1);
  hum2VolSlider.position(400,50);
  buzz1VolSlider = createSlider(0,1,0.001,0.1);
  buzz1VolSlider.position(400,80)

}

let status = 0; // off

function thumbSaber() {
  if(status == 1) {
    end_env.play(hum1);
    end_env.play(hum2);
    buzz1.stop();
    status = 0;
  } else {
  // note duration (in seconsds)
    let dur = 5;

    // time from now (in seconds)
    let time = 0;

    // velocity (volume, from 0 to 1)
    let vel = 0.02;

    const hum1Note = hum1Slider.value();
    const hum2Note = hum2Slider.value();
    const buzz1Note = buzz1Slider.value();
    const hum1Vol = hum1VolSlider.value();
    const hum2Vol = hum2VolSlider.value();
    const buzz1Vol = buzz1VolSlider.value();
    // notes can overlap with each other
    hum1.start();
    hum2.start();
    buzz1.start();
    start_env.play(hum1);
    start_env.play(hum2);
    hum1.amp(hum1Vol); //(0.03);
    hum2.amp(hum2Vol); // 0.03);
    buzz1.amp(buzz1Vol); // 0.001);
    hum1.freq(hum1Note); // F#2
    // hum1.play('C3', vel, time += 1/3, dur);
    // hum1.play('G3', vel, time += 1/3, dur);
    hum2.freq(hum2Note);
    buzz1.freq(buzz1Note);
    status = 1;
  }
}
