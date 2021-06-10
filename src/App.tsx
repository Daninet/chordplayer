import React, { useRef, useState } from 'react';
import './App.css';
import { CHORDTYPES, getChordPitches, getChordPositions, NOTES } from './chords';
import { ChordView } from './ChordView';
import Player from './Player';

export const App: React.FC = () => {
  let player = useRef(null);
  const [lastChordNote, setLastChordNote] = useState(0);
  const [lastChordType, setLastChordType] = useState(0);

  const playChord = (note: string, type: string) => {
    const pitches = getChordPitches(
      NOTES.indexOf(note),
      CHORDTYPES.indexOf(type)
    );

    setLastChordNote(NOTES.indexOf(note));
    setLastChordType(CHORDTYPES.indexOf(type));

    player.current.playChord(pitches[0]);
  }

  const renderButtons = (type) => {
    return NOTES.map(note => (
      <button key={note + type} onClick={() => playChord(note, type)}>{note}{type}</button>
    ));
  }

  const positions = getChordPositions(lastChordNote, lastChordType) ?? [];
  console.log(positions, lastChordNote, lastChordType);

  return (
    <div className="App">
      {CHORDTYPES.map(type => <>{renderButtons(type)}<br/></>)}
      <Player ref={player}/>
      <div className="chords">
        {positions.map(pos => (
          <ChordView key={JSON.stringify(pos)} positions={pos} />
        ))}
      </div>
    </div>
  );
};

export default App;
