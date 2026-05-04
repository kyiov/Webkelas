import { zzfx } from 'zzfx';

// Using ZzFX library for robust, offline-ready sound effects 
// without relying on broken external audio files.

class SoundFX {
  constructor() {
    this.drawingInterval = null;
  }

  // Play a satisfying high-pitched mechanical click
  playClick() {
    // Parameters: volume, randomness, frequency, attack, sustain, release, shape, shape curve, pitch jump, pitch jump time, repeat time, noise, modulation, bit crush, delay, sustain volume, decay, tremolo
    zzfx(1, 0.05, 800, 0.01, 0, 0.05, 1, 0.1, -10, 0, 0, 0, 0, 0, 0, 0, 0, 0); 
  }

  // Play a soft paper rustle/swish for hover
  playHover() {
    zzfx(0.2, 0.5, 200, 0.05, 0.05, 0.1, 3, 1, 0, 0, 0, 0.5, 0, 0, 0, 0, 0.1, 0);
  }

  // Play a mechanical camera shutter sound
  playShutter() {
    // Click
    zzfx(1, 0.05, 150, 0, 0.05, 0.1, 0, 1.5, -20, 0.05, 0, 0, 0, 0, 0, 0, 0, 0);
    // Flash/Mechanism
    setTimeout(() => {
      zzfx(0.6, 0.1, 800, 0.01, 0.1, 0.2, 3, 0.1, 0, 0, 0, 0.8, 0, 0, 0, 0, 0, 0);
    }, 50);
  }

  // Play a continuous scratching sound for drawing
  startDrawing() {
    if (this.drawingInterval) return;
    
    // Play a scratch sound immediately
    zzfx(0.3, 0.8, 150, 0.05, 0.05, 0.1, 3, 1.5, 0, 0, 0, 0.8, 0, 0, 0, 0, 0, 0);
    
    // Loop the scratch sound rapidly
    this.drawingInterval = setInterval(() => {
      zzfx(0.2, 0.9, 150 + Math.random() * 50, 0.05, 0.05, 0.1, 3, 1.5, 0, 0, 0, 0.8, 0, 0, 0, 0, 0, 0);
    }, 80);
  }

  stopDrawing() {
    if (this.drawingInterval) {
      clearInterval(this.drawingInterval);
      this.drawingInterval = null;
    }
  }
}

export const sfx = new SoundFX();
