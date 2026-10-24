// Resilient Web Audio & Speech Synthesizer for Indigenous Phonetics
// Designed for 100% offline reliability in remote village schools.

class BoliAudioPlayer {
  constructor() {
    this.audioCtx = null;
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  }

  initContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
  }

  // Play a soft pedagogical bell chime using pure Web Audio oscillator (Zero asset dependency)
  playChime(frequency = 523.25, duration = 0.25) {
    try {
      this.initContext();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, this.audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('AudioContext unavailable:', e);
    }
  }

  // Speak the phonetic pronunciation aloud
  speakPhonetic(text, onEndCallback) {
    this.playChime(659.25, 0.15); // E5 friendly chime

    if (!this.synth) {
      if (onEndCallback) onEndCallback();
      return;
    }

    try {
      this.synth.cancel(); // Stop any overlapping audio

      // We read the phonetic transliteration (e.g., 'Johar' or 'Mid, Bar, Pe')
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // Slower, clearer cadence for primary education
      utterance.pitch = 1.05; // Friendly pedagogical tone

      // Try picking an Indian English / Hindi voice if available
      const voices = this.synth.getVoices();
      const preferredVoice = voices.find(v => v.lang.includes('hi-IN') || v.lang.includes('en-IN'));
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => {
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = () => {
        if (onEndCallback) onEndCallback();
      };

      this.synth.speak(utterance);
    } catch (err) {
      console.warn('SpeechSynthesis error:', err);
      if (onEndCallback) onEndCallback();
    }
  }

  // Play celebratory win melody when child gets a quiz right
  playVictory() {
    this.initContext();
    if (!this.audioCtx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 0.2);
      }, idx * 120);
    });
  }
}

export const boliAudio = new BoliAudioPlayer();
