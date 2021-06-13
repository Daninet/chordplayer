import React, { useState } from 'react';
import { CHORDTYPES, NOTES, NOTES_CHROMATIC_ORDER, NOTES_FIFTHS_ORDER } from './chords';
import styles from './ChordButtons.module.scss';

interface ChordButtonsProps {
  activeNote: number;
  activeType: number;
  onClick: (note: number, type: number) => void;
  onStop: () => void;
}

export const CHROMATIC_KEYMAP = ['z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n', 'j', 'm'];
export const FIFTHS_KEYMAP = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'];

export const ChordButtons: React.FC<ChordButtonsProps> = (props) => {
  const { activeNote, activeType, onClick, onStop } = props;
  const [layout, setLayout] = useState('chromatic');

  const renderButtons = (typeIndex: number) => {
    const order = layout === 'chromatic' ? NOTES_CHROMATIC_ORDER : NOTES_FIFTHS_ORDER;

    return (
      <tr key={typeIndex}>
        <td>{typeIndex < 9 ? typeIndex + 1 : ''}</td>
        {order.map((noteIndex) => (
          <td key={noteIndex + typeIndex}>
            <button
              className={activeType === typeIndex && activeNote === noteIndex ? styles.active : ' '}
              onClick={() => onClick(noteIndex, typeIndex)}
            >
              {NOTES[noteIndex]}{CHORDTYPES[typeIndex]}
            </button>
          </td>
        ))}
      </tr>
    );
  }

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
          {CHORDTYPES.map((_, typeIndex) => renderButtons(typeIndex))}
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
          onChange={(e) => setLayout(e.target.value)}
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
          onChange={(e) => setLayout(e.target.value)}
        />
        Circle of fifths
      </label>
    </div>
  );
};
