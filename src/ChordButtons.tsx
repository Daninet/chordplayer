import React from 'react';
import { CHORDTYPES } from './chords';
import styles from './ChordButtons.module.scss';
import { ChordButtonLine } from './ChordButtonLine';

interface ChordButtonsProps {
  activeNote: number;
  activeType: number;
  pendingType: number;
  layout: 'chromatic' | 'fifths';
  setLayout: (layout: 'chromatic' | 'fifths') => void;
  onClick: (note: number, type: number) => void;
  onStop: () => void;
}

export const CHROMATIC_KEYMAP = ['z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n', 'j', 'm'];
export const CHROMATIC_KEYMAP_CODES = ['KeyZ', 'KeyS', 'KeyX', 'KeyD', 'KeyC', 'KeyV', 'KeyG', 'KeyB', 'KeyH', 'KeyN', 'KeyJ', 'KeyM'];
export const CHROMATIC_BG_WHITE = [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1];
export const FIFTHS_KEYMAP = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];
export const FIFTHS_KEYMAP_CODES_MAJOR = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal'];
export const FIFTHS_KEYMAP_CODES_MINOR = ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight'];
export const FIFTHS_KEYMAP_CODES_SEVENTH = ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash'];

export const ChordButtons: React.FC<ChordButtonsProps> = (props) => {
  const { activeNote, activeType, pendingType, layout, setLayout, onClick, onStop } = props;

  const keymap = layout === 'chromatic' ? CHROMATIC_KEYMAP : FIFTHS_KEYMAP;

  return (
    <div className={styles.chordbuttons}>
      <table>
        <thead>
          <tr>
            <td><strong>Key</strong></td>
            {keymap.map(key => <td key={key}>{key}</td>)}
          </tr>
        </thead>
        <tbody>
          {CHORDTYPES.map((type, typeIndex) => (
            <ChordButtonLine
              key={type}
              layout={layout}
              typeIndex={typeIndex}
              activeButton={activeType !== typeIndex ? null : activeNote}
              pendingType={pendingType}
              onClick={onClick}
            />
          ))}
          <tr>
            <td>Space</td>
            <td colSpan={12}>
              <button className={styles.stop} onClick={onStop}>Stop</button>
            </td>
          </tr>
        </tbody>
      </table>
      <label>
        <input
          type="radio"
          name="layout"
          value="chromatic"
          checked={layout === 'chromatic'}
          onChange={(e) => setLayout(e.target.value as any)}
        />
        Chromatic
      </label>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <label>
        <input
          type="radio"
          name="layout"
          value="fifths"
          checked={layout === 'fifths'}
          onChange={(e) => setLayout(e.target.value as any)}
        />
        Circle of fifths
      </label>
    </div>
  );
};
