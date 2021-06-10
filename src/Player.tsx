import React, { Component } from 'react';
import './App.css';
import MIDISounds from 'midi-sounds-react';

class Player extends Component {
  private midiSounds: any;

  playChord(pitches: number[]) {
    this.midiSounds.playChordNow(
      465,
      pitches,
      0.5
    );
  }

  render() {
    return (
      <div className="Player">
        <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[465]} />
      </div>
    );
  }
}

export default Player;
