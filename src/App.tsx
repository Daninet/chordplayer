import React, { useEffect, useRef, useState } from 'react';
import styles from './App.module.scss';
import { AudioFontPlayer } from './AudioFontPlayer';
import { CHORDTYPES, getChordPitches, getChordPositions, NOTES, positionsToPitches } from './chords';
import { ChordView } from './ChordView';

export const App: React.FC = () => {
  const player = useRef(null);
  useEffect(() => {
    player.current = new AudioFontPlayer();
  }, []);

  const [lastChordNote, setLastChordNote] = useState(0);
  const [lastChordType, setLastChordType] = useState(0);
  const [tuning, setTuning] = useState(440);
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

  const updateTuning = (freq: number) => {
    setTuning(freq);
    player.current.setFreq(freq);
  };

  return (
    <div className={styles.app} onKeyDown={onKeyDown} tabIndex={0}>
      <input className={styles.tuner} type="range" step="0.1" min="400" max="500" value={tuning} onChange={(e) => updateTuning(Number(e.target.value))} />
      <br />
      {tuning.toFixed(1)}
      <br />
      {CHORDTYPES.map(type => <>{renderButtons(type)}<br/></>)}
      {/* <Player ref={player}/> */}
      <div className={styles.chords}>
        {positions.map(pos => renderChord(pos))}
      </div>
    </div>
  );
};

export default App;
