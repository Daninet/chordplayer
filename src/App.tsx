import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './App.module.scss';
import { AudioFontPlayer } from './AudioFontPlayer';
import { ChordButtons, CHROMATIC_KEYMAP_CODES, FIFTHS_KEYMAP_CODES } from './ChordButtons';
import { CHORDTYPES, getChordPitches, getChordPositions, NOTES, NOTES_FIFTHS_ORDER, positionsToPitches } from './chords';
import { ChordView } from './ChordView';
import { Sliders } from './Sliders';

export const App: React.FC = () => {
  const player = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    player.current = new AudioFontPlayer();
    setReady(true);
  }, []);

  const [lastChordNote, setLastChordNote] = useState(0);
  const [lastChordType, setLastChordType] = useState(0);
  const [pendingChordType, setPendingChordType] = useState<number>(null);
  const [, render] = useState(0);

  const getStorageKey = (note: string, type: string) => `viola-${note}${type}`;
  const storageKey = getStorageKey(NOTES[lastChordNote], CHORDTYPES[lastChordType]);

  const getPitches = useCallback((note: string, type: string) => {
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
  }, []);

  const playChord = useCallback((note: number, type: number) => {
    const pitches = getPitches(NOTES[note], CHORDTYPES[type]);

    setLastChordNote(note);
    setLastChordType(type);
    setPendingChordType(null);

    player.current.playChord(pitches);
  }, [getPitches])

  const positions = getChordPositions(lastChordNote, lastChordType) ?? [];

  const onChordClick = (positions: number[]) => {
    const pitches = positionsToPitches(positions);
    player.current.playChord(pitches);
    localStorage.setItem(storageKey, JSON.stringify(positions));
    render(Date.now()); // needed for the checkbox above chord icons
  };

  const onStop = () => {
    player.current.stop();
  };

  const onKeyDown = useCallback((key: string, keyCode: string) => {
    console.log(key, keyCode);
    if (CHROMATIC_KEYMAP_CODES.includes(keyCode)) {
      console.log('pending', pendingChordType);
      playChord(CHROMATIC_KEYMAP_CODES.indexOf(keyCode) % 12, pendingChordType ?? lastChordType);
      setPendingChordType(null);
      return true;
    }

    if (FIFTHS_KEYMAP_CODES.includes(keyCode)) {
      playChord(NOTES_FIFTHS_ORDER[FIFTHS_KEYMAP_CODES.indexOf(keyCode) % 12], pendingChordType ?? lastChordType);
      setPendingChordType(null);
      return true;
    }

    const typeKeymap = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (typeKeymap.includes(key)) {
      setPendingChordType(typeKeymap.indexOf(key));
      return true;
    }

    if (key === ' ') {
      onStop();
      return true;
    }

    return false;
  }, [pendingChordType, lastChordType, playChord]);

  useEffect(() => {
    const listener = (e) => {
      console.log(e.key, e.code);
      const res = onKeyDown(e.key, e.code);
      if (res) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [onKeyDown]);

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

  const onSetTuning = useCallback((freq: number) => {
    player.current.setFreq(freq);
  }, []);

  const onSetVolume = useCallback((volume: number) => {
    player.current.setVolume(volume);
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <div className={styles.app}>
      <ChordButtons
        activeNote={lastChordNote}
        activeType={lastChordType}
        pendingType={pendingChordType}
        onClick={playChord}
        onStop={onStop}
      />

      <Sliders
        onSetTuning={onSetTuning}
        onSetVolume={onSetVolume}
      />
      
      <div className={styles.chords}>
        {positions.map(pos => renderChord(pos))}
      </div>
    </div>
  );
};

export default App;
