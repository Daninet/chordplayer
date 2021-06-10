import React, { useRef, useState } from 'react';
import './App.css';
import { CHORDTYPES, getChordPitches, getChordPositions, NOTES, positionsToPitches } from './chords';
import { ChordView } from './ChordView';
import Player from './Player';

export const App: React.FC = () => {
  let player = useRef(null);
  const [lastChordNote, setLastChordNote] = useState(0);
  const [lastChordType, setLastChordType] = useState(0);
  const [, render] = useState(0);

  const getStorageKey = (note: string, type: string) => `viola-${note}${type}`;
  const storageKey = getStorageKey(NOTES[lastChordNote], CHORDTYPES[lastChordType]);

  const getPitches = (note: string, type: string) => {
    const storageKey = getStorageKey(note, type);
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length === 3 && parsed.every(p => Number.isInteger(p))) {
          console.log(parsed, positionsToPitches(parsed));
          return positionsToPitches(parsed);
        }
      } catch (err) {}
    }

    return getChordPitches(
      NOTES.indexOf(note),
      CHORDTYPES.indexOf(type)
    )[0];
  };

  const playChord = (note: string, type: string) => {
    const pitches = getPitches(note, type);

    setLastChordNote(NOTES.indexOf(note));
    setLastChordType(CHORDTYPES.indexOf(type));

    player.current.playChord(pitches);
  }

  const renderButtons = (type) => {
    return NOTES.map(note => (
      <button key={note + type} onClick={() => playChord(note, type)}>{note}{type}</button>
    ));
  }

  const positions = getChordPositions(lastChordNote, lastChordType) ?? [];

  const onChordClick = (positions: number[]) => {
    const pitches = positionsToPitches(positions);
    player.current.playChord(pitches);
    localStorage.setItem(storageKey, JSON.stringify(positions));
    render(Date.now()); // needed for the checkbox above chord icons
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const noteKeymap = ['z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n', 'j', 'm', ','];
    console.log(e.key);
    if (noteKeymap.includes(e.key)) {
      return playChord(NOTES[noteKeymap.indexOf(e.key) % 12], CHORDTYPES[lastChordType]);
    }

    const typeKeymap = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (typeKeymap.includes(e.key)) {
      return setLastChordType(typeKeymap.indexOf(e.key));
    }
  };

  const renderChord = (pos: [number, number, number]) => {
    const key = JSON.stringify(pos);
    const isChecked = key === localStorage.getItem(storageKey);

    return (
      <ChordView
        key={key}
        positions={pos}
        onClick={onChordClick}
        isChecked={isChecked}
      />
    );
  };

  return (
    <div className="App" onKeyDown={onKeyDown} tabIndex={0}>
      {CHORDTYPES.map(type => <>{renderButtons(type)}<br/></>)}
      <Player ref={player}/>
      <div className="chords">
        {positions.map(pos => renderChord(pos))}
      </div>
    </div>
  );
};

export default App;
