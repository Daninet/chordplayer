import WebAudioFontPlayer from 'webaudiofont';

const soundFont = (window as any)._tone_0411_FluidR3_GM_sf2_file

export class AudioFontPlayer {
  private player;
  private audioContext;
  private envelopes = [];
  private volume = 0.5;
  private playbackRate = 1.0;

  constructor () {
    const AudioContextFunc = window.AudioContext || (window as any).webkitAudioContext;
    this.audioContext = new AudioContextFunc();
    this.player = new WebAudioFontPlayer();
    this.player.loader.decodeAfterLoading(this.audioContext, '_tone_0411_FluidR3_GM_sf2_file');
    // sustain
    // for (let i = 0; i < soundFont.zones.length; i++){
    //   soundFont.zones[i].ahdsr = false;
    // }
    console.log(this.player, soundFont);
  }

  queueNote(note: number, duration: number) {
    const zone = this.player.findZone(this.audioContext, soundFont, note);
    const baseDetune = zone.originalPitch - 100.0 * zone.coarseTune - zone.fineTune;
		const playbackRate = this.playbackRate * Math.pow(2, (100.0 * note - baseDetune) / 1200.0);
    const envelope = this.player.queueWaveTable(this.audioContext, this.audioContext.destination, soundFont, 0, note, duration, this.volume);
    console.log('i', note, playbackRate);
    envelope.audioBufferSourceNode.playbackRate.cancelScheduledValues(0);
    envelope.audioBufferSourceNode.playbackRate.setValueAtTime(playbackRate, 0);
    this.envelopes.push(envelope);
  }

  playChord(pitches: number[]) {
    this.stop();
    pitches.forEach(pitch => this.queueNote(pitch, 999));
  }

  stop() {
    while (true) {
      const envelope = this.envelopes.pop();
      if (!envelope) break;
      envelope.cancel();
    }
  }

  get playing() {
    return this.envelopes.length > 0;
  }

  setFreq(freq: number) {
    this.playbackRate = freq / 440;
    const pitches = this.envelopes.map(e => e.pitch);
    this.playChord(pitches);
  }

  setVolume(volume: number) {
    this.volume = volume;
    // it doesn't accept 0
    if (this.volume === 0) {
      this.volume = 0.0001;
    }
    const pitches = this.envelopes.map(e => e.pitch);
    this.playChord(pitches);
  }
}
