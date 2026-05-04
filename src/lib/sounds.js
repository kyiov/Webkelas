// Utility class for playing real audio files
// Replaced procedural generation with high-quality MP3/OGG files for realism

class SoundFX {
  constructor() {
    this.sounds = {
      click: new Audio('/sounds/click.ogg'),
      hover: new Audio('/sounds/paper.mp3'),
      shutter: new Audio('/sounds/shutter.mp3'),
      drawing: new Audio('/sounds/pencil.mp3')
    };

    // Preload and configure volumes
    this.sounds.click.volume = 0.4;
    
    this.sounds.hover.volume = 0.1; // Paper sound should be subtle
    this.sounds.hover.playbackRate = 1.5; // Speed it up slightly
    
    this.sounds.shutter.volume = 0.6;
    
    this.sounds.drawing.volume = 0.3;
    this.sounds.drawing.loop = true; // Pencil sound loops while holding click
    
    this.isDrawing = false;
  }

  // Helper to play sound from beginning, allowing overlaps
  playSound(name) {
    if (!this.sounds[name]) return;
    
    // For hover and click, we clone the audio node so rapid clicks overlap nicely
    if (name === 'click' || name === 'hover') {
      const clone = this.sounds[name].cloneNode();
      clone.volume = this.sounds[name].volume;
      clone.playbackRate = this.sounds[name].playbackRate;
      clone.play().catch(e => console.log('Audio play failed:', e));
    } else {
      // For shutter, just reset to start
      this.sounds[name].currentTime = 0;
      this.sounds[name].play().catch(e => console.log('Audio play failed:', e));
    }
  }

  playClick() {
    this.playSound('click');
  }

  playHover() {
    this.playSound('hover');
  }

  playShutter() {
    this.playSound('shutter');
  }

  startDrawing() {
    if (this.isDrawing) return;
    this.isDrawing = true;
    this.sounds.drawing.currentTime = 0;
    this.sounds.drawing.play().catch(e => console.log('Audio play failed:', e));
  }

  stopDrawing() {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    this.sounds.drawing.pause();
  }
}

export const sfx = new SoundFX();
