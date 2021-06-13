import React from 'react';
import { getAlternativeNames, NOTES } from './chords';
import styles from './ChordView.module.scss';

interface ChordViewProps {
  isChecked: boolean;
  positions: [number, number, number];
  onClick: (positions: number[]) => void;
}

export const ChordView: React.FC<ChordViewProps> = (props) => {
  const { isChecked, positions, onClick } = props;

  const getNote = (baseNote: number, pos: number) => {
    const index = (baseNote + pos) % 12;
    const isHighNote = baseNote + pos >= 7 + 12;
    return isHighNote ? `${NOTES[index]}'` : NOTES[index];
  }

  return (
    <div className={styles.wrapper} onClick={() => onClick(positions)}>
      <table className={styles.chordview}>
        <thead>
          <tr>
            <th colSpan={3}>
              <input type="checkbox" checked={isChecked} readOnly/>
            </th>
          </tr>
          <tr>
            <th>{getNote(7, positions[0])}</th>
            <th>{getNote(14, positions[1])}</th>
            <th>{getNote(9, positions[2])}</th>
          </tr>
        </thead>
        <tbody>
          {new Array(7).fill(0).map((_, i) => (
            <tr key={i}>
              <td>{positions[0] === i + 1 ? '●' : ''}</td>
              <td>{positions[1] === i + 1 ? '●' : ''}</td>
              <td>{positions[2] === i + 1 ? '●' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.names}>
        {getAlternativeNames(positions).map(name =>
          <React.Fragment key={name}>
            {name}
            <br />
          </React.Fragment>
        )}
      </div>
    </div>
  )
};
