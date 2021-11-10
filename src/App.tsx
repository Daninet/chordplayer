import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './App.module.scss';
import { AudioFontPlayer } from './AudioFontPlayer';
import { ChordButtons, CHROMATIC_KEYMAP_CODES, FIFTHS_KEYMAP_CODES_SEVENTH, FIFTHS_KEYMAP_CODES_MINOR, FIFTHS_KEYMAP_CODES_MAJOR } from './ChordButtons';
import { CHORDTYPES, getChordContext, NOTES, NOTES_FIFTHS_ORDER } from './chords';
import { ChordView } from './ChordView';
import { Sliders } from './Sliders';
import { Sustain } from './Sustain';
import { Tuning } from './Tuning';

const defaultTuning = [
  Number(localStorage.getItem(`viola-tuning-1`) ?? '55'),
  Number(localStorage.getItem(`viola-tuning-2`) ?? '62'),
  Number(localStorage.getItem(`viola-tuning-3`) ?? '57'),
];

const maxPos = Number(localStorage.getItem(`viola-max-pos`) ?? '8');

export const App: React.FC = () => {
  const player = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    player.current = new AudioFontPlayer();
    setReady(true);
  }, []);

  const [chordContext, setChordContext] = useState(getChordContext({ TUNING: defaultTuning, MAX_POS: maxPos }));
  const [lastChordNote, setLastChordNote] = useState(0);
  const [lastChordType, setLastChordType] = useState(0);
  const [keyUpEvent, setKeyUpEvent] = useState(true);
  const [pendingChordType, setPendingChordType] = useState<number>(null);
  const [layout, setLayout] = useState<'chromatic' | 'fifths'>('chromatic');
  const [, render] = useState(0);


  const getStorageKey = useCallback((note: string, type: string) => `viola-${chordContext.TUNING.join('-')}-${note}${type}`, [chordContext]);
  const storageKey = getStorageKey(NOTES[lastChordNote], CHORDTYPES[lastChordType]);

  const getPitches = useCallback((note: string, type: string) => {
    const storageKey = getStorageKey(note, type);
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length === 3 && parsed.every(p => Number.isInteger(p))) {
          return chordContext.positionsToPitches(parsed);
        }
      } catch (err) {}
    }

    const pitches = chordContext.getChordPitches(
      NOTES.indexOf(note),
      CHORDTYPES.indexOf(type)
    );

    return pitches?.[0];
  }, [getStorageKey, chordContext]);

  const playChord = useCallback((note: number, type: number) => {
    const pitches = getPitches(NOTES[note], CHORDTYPES[type]);

    if (pitches) {
      player.current.playChord(pitches);
    }

    setLastChordNote(note);
    setLastChordType(type);
    setPendingChordType(null);
  }, [getPitches])

  const positions = chordContext.getChordPositions(lastChordNote, lastChordType) ?? [];

  const onChordClick = (positions: number[]) => {
    const pitches = chordContext.positionsToPitches(positions);
    if (pitches) {
      player.current.playChord(pitches);
      localStorage.setItem(storageKey, JSON.stringify(positions));
    }
    render(Date.now()); // needed for the checkbox above chord icons
  };

  const onStop = useCallback(() => {
    player.current.stop();
  }, []);

  const onKeyDownChromatic = useCallback((key: string, keyCode: string) => {
    if (CHROMATIC_KEYMAP_CODES.includes(keyCode)) {
      playChord(CHROMATIC_KEYMAP_CODES.indexOf(keyCode) % 12, pendingChordType ?? lastChordType);
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
  }, [onStop, pendingChordType, lastChordType, playChord]);

  const onKeyDownFifths = useCallback((key: string, keyCode: string) => {
    if (FIFTHS_KEYMAP_CODES_MAJOR.includes(keyCode)) {
      playChord(NOTES_FIFTHS_ORDER[FIFTHS_KEYMAP_CODES_MAJOR.indexOf(keyCode) % 12], 0);
      setPendingChordType(null);
      return true;
    }

    if (FIFTHS_KEYMAP_CODES_MINOR.includes(keyCode)) {
      playChord(NOTES_FIFTHS_ORDER[FIFTHS_KEYMAP_CODES_MINOR.indexOf(keyCode) % 12], 1);
      setPendingChordType(null);
      return true;
    }

    if (FIFTHS_KEYMAP_CODES_SEVENTH.includes(keyCode)) {
      playChord(NOTES_FIFTHS_ORDER[FIFTHS_KEYMAP_CODES_SEVENTH.indexOf(keyCode) % 12], 2);
      setPendingChordType(null);
      return true;
    }

    if (key === ' ') {
      onStop();
      return true;
    }

    return false;
  }, [onStop, playChord]);

  useEffect(() => {
    const listener = (e) => {
      if (e.ctrlKey || e.shiftKey || e.altKey) return;
      if (e.repeat) return;
      const res = layout === 'chromatic' ? onKeyDownChromatic(e.key, e.code) : onKeyDownFifths(e.key, e.code);
      if (res) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [layout, onKeyDownChromatic, onKeyDownFifths]);

  useEffect(() => {
    if (!keyUpEvent) return;
    const listener = (e) => {
      if (e.ctrlKey || e.shiftKey || e.altKey) return;
      if (CHROMATIC_KEYMAP_CODES.includes(e.code)
        || FIFTHS_KEYMAP_CODES_MAJOR.includes(e.code)
        || FIFTHS_KEYMAP_CODES_MINOR.includes(e.code)
        || FIFTHS_KEYMAP_CODES_SEVENTH.includes(e.code)){
        onStop();
        e.preventDefault();
        e.stopPropagation();
        return true;
      }
    }
    document.addEventListener("keyup", listener);
    return () => document.removeEventListener("keyup", listener);
  }, [onStop, keyUpEvent]);

  const onSetFineTuning = useCallback((freq: number) => {
    player.current.setFreq(freq);
  }, []);

  const onSetSustain = useCallback((duration: number) => {
    if (duration === null) {
      player.current.setDuration(999);
      setKeyUpEvent(true);
    } else {
      player.current.setDuration(duration);
      setKeyUpEvent(false);
    }
  }, []);

  const onSetVolume = useCallback((volume: number) => {
    player.current.setVolume(volume);
  }, []);

  const onSetTuning = useCallback((TUNING: number[]) => {
    TUNING.forEach((val, index) => {
      localStorage.setItem(`viola-tuning-${index + 1}`, val.toString());
    })
    setChordContext(getChordContext({ TUNING, MAX_POS: chordContext.MAX_POS }));
  }, [chordContext.MAX_POS]);

  const onSetMaxPos = useCallback((MAX_POS: number) => {
    localStorage.setItem('viola-max-pos', MAX_POS.toString());
    setChordContext(getChordContext({ TUNING: chordContext.TUNING, MAX_POS }))
  }, [chordContext.TUNING]);

  if (!ready) {
    return null;
  }

  const renderChord = (pos: [number, number, number]) => {
    const key = JSON.stringify(pos);
    const isChecked = key === localStorage.getItem(storageKey);

    return (
      <ChordView
        key={key}
        positions={pos}
        tuning={chordContext.TUNING}
        maxPos={chordContext.MAX_POS}
        onClick={onChordClick}
        isChecked={isChecked}
        getAlternativeNames={chordContext.getAlternativeNames}
      />
    );
  };

  return (
    <div className={styles.app}>
      <ChordButtons
        activeNote={lastChordNote}
        activeType={lastChordType}
        pendingType={pendingChordType}
        onClick={playChord}
        onStop={onStop}
        layout={layout}
        setLayout={setLayout}
      />

      <Sustain
        onSetSustain={onSetSustain}
      />

      <Sliders
        onSetTuning={onSetFineTuning}
        onSetVolume={onSetVolume}
      />
      
      <Tuning
        tuning={chordContext.TUNING}
        maxPos={chordContext.MAX_POS}
        onSetTuning={onSetTuning}
        onSetMaxNote={onSetMaxPos}
      />

      <div className={styles.chords}>
        {positions.map(pos => renderChord(pos))}
      </div>
    </div>
  );
};

export default App;
