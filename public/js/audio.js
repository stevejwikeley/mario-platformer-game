// Simple audio system for retro sound effects
class AudioManager {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.musicPlaying = false;
        this.initAudio();
    }
    
    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }
    
    // Generate retro sound effects using Web Audio API
    playJump() {
        this.playTone(220, 0.1, 'sine');
    }
    
    playAttack() {
        this.playTone(440, 0.2, 'square');
    }
    
    playCollect() {
        this.playTone(880, 0.3, 'triangle');
    }
    
    playDamage() {
        this.playTone(110, 0.5, 'sawtooth');
    }
    
    playTone(frequency, duration, type = 'sine') {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
    
    // Simple chiptune background music
    playBackgroundMusic() {
        if (this.musicPlaying || !this.audioContext) return;
        
        this.musicPlaying = true;
        this.playMelody();
    }
    
    playMelody() {
        if (!this.musicPlaying) return;
        
        const melody = [262, 294, 330, 349, 392, 440, 494, 523]; // C major scale
        let noteIndex = 0;
        
        const playNote = () => {
            if (!this.musicPlaying) return;
            
            this.playTone(melody[noteIndex], 0.5, 'triangle');
            noteIndex = (noteIndex + 1) % melody.length;
            
            setTimeout(playNote, 600);
        };
        
        playNote();
    }
    
    stopMusic() {
        this.musicPlaying = false;
    }
}

// Global audio manager
window.audioManager = new AudioManager();
