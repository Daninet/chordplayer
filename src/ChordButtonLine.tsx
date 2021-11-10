import React from 'react';
import { CHORDTYPES, NOTES, NOTES_CHROMATIC_ORDER, NOTES_FIFTHS_ORDER } from './chords';
import styles from './ChordButtons.module.scss';
import { CHROMATIC_BG_WHITE } from './ChordButtons';

interface ChordButtonLineProps {
  activeButton: number;
  pendingType: number;
  layout: 'chromatic' | 'fifths';
  onClick: (note: number, type: number) => void;
  typeIndex: number;
}

export const ChordButtonLine: React.FC<ChordButtonLineProps> = React.memo((props) => {
  const { activeButton, pendingType, layout, typeIndex, onClick } = props;

  const getButtonBgColor = (pos: number) => {
    if (CHROMATIC_BG_WHITE[pos] === 1) return '#eee';
    return '#bbb';
  };

  const order = layout === 'chromatic' ? NOTES_CHROMATIC_ORDER : NOTES_FIFTHS_ORDER;
  const isButtonActive = (noteIndex: number) => activeButton === noteIndex;

  return (
    <tr className={pendingType === typeIndex ? styles.pending : ''} key={typeIndex}>
      <td>{typeIndex < 9 && layout === 'chromatic' ? typeIndex + 1 : ''}</td>
      {order.map((noteIndex) => (
        <td key={noteIndex + typeIndex}>
          <button
            style={{ ...(layout === 'chromatic' && !isButtonActive(noteIndex) ? { background: getButtonBgColor(noteIndex) }: {})}}
            className={isButtonActive(noteIndex) ? styles.active : ''}
            onClick={() => onClick(noteIndex, typeIndex)}
          >
            {NOTES[noteIndex]}{CHORDTYPES[typeIndex]}
          </button>
        </td>
      ))}
    </tr>
  );
});
