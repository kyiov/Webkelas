import { zzfx } from 'zzfx';

class SoundFX {
  constructor() {
    this.drawingInterval = null;
  }

  playClick() {
    zzfx(1, 0.05, 800, 0.01, 0, 0.05, 1, 0.1, -10, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }

  playHover() {
    zzfx(0.2, 0.5, 200, 0.05, 0.05, 0.1, 3, 1, 0, 0, 0, 0.5, 0, 0, 0, 0, 0.1, 0);
  }

  playShutter() {
    zzfx(1, 0.05, 150, 0, 0.05, 0.1, 0, 1.5, -20, 0.05, 0, 0, 0, 0, 0, 0, 0, 0);
    setTimeout(() => {
      zzfx(0.6, 0.1, 800, 0.01, 0.1, 0.2, 3, 0.1, 0, 0, 0, 0.8, 0, 0, 0, 0, 0, 0);
    }, 50);
  }

  startDrawing() {
    if (this.drawingInterval) return;

    zzfx(0.3, 0.8, 150, 0.05, 0.05, 0.1, 3, 1.5, 0, 0, 0, 0.8, 0, 0, 0, 0, 0, 0);

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
