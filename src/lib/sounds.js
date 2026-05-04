

class SoundFX {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.drawingNode = null;
    this.drawingGain = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.3;
    this.masterGain.connect(this.ctx.destination);
    this.initialized = true;
  }

  createNoiseBuffer(duration) {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  playClick() {
    if (!this.initialized) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(1, this.ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

    osc.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playHover() {
    if (!this.initialized) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = this.createNoiseBuffer(0.1);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1000;

    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    noiseSource.start();
  }

  playShutter() {
    if (!this.initialized) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.1);
    oscGain.gain.setValueAtTime(1, now);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.1);

    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer(0.15);
    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 2000;
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.8, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    noise.start(now);

    const motorOsc = this.ctx.createOscillator();
    const motorGain = this.ctx.createGain();
    motorOsc.type = 'sawtooth';
    motorOsc.frequency.setValueAtTime(200, now + 0.1);
    motorGain.gain.setValueAtTime(0, now);
    motorGain.gain.linearRampToValueAtTime(0.1, now + 0.15);
    motorGain.gain.setValueAtTime(0.1, now + 0.6);
    motorGain.gain.linearRampToValueAtTime(0.01, now + 0.8);
    motorOsc.connect(motorGain);
    motorGain.connect(this.masterGain);
    motorOsc.start(now + 0.1);
    motorOsc.stop(now + 0.8);
  }

  startDrawing() {
    if (!this.initialized) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    
    if (this.drawingNode) return;

    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    this.drawingNode = this.ctx.createBufferSource();
    this.drawingNode.buffer = noiseBuffer;
    this.drawingNode.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1500;
    filter.Q.value = 1.5;

    this.drawingGain = this.ctx.createGain();
    this.drawingGain.gain.value = 0.1;

    this.drawingNode.connect(filter);
    filter.connect(this.drawingGain);
    this.drawingGain.connect(this.masterGain);

    this.drawingNode.start();
  }

  stopDrawing() {
    if (!this.drawingNode || !this.drawingGain || !this.ctx) return;
    

    this.drawingGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    
    setTimeout(() => {
      if (this.drawingNode) {
        this.drawingNode.stop();
        this.drawingNode.disconnect();
        this.drawingNode = null;
      }
    }, 100);
  }
}

export const sfx = new SoundFX();
