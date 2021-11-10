import React from 'react';
import { NOTES } from './chords';
import styles from './ChordView.module.scss';

interface ChordViewProps {
  tuning: [number, number, number];
  maxPos: number;
  isChecked: boolean;
  positions: [number, number, number];
  onClick: (positions: number[]) => void;
  getAlternativeNames: (positions: number[]) => string[];
}

export const ChordView: React.FC<ChordViewProps> = (props) => {
  const { tuning, maxPos, isChecked, positions, onClick, getAlternativeNames } = props;

  const getNote = (baseNote: number, pos: number) => {
    const index = (baseNote + pos) % 12;
    return NOTES[index];
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
            <th>{getNote(tuning[0], positions[0])}</th>
            <th>{getNote(tuning[1], positions[1])}</th>
            <th>{getNote(tuning[2], positions[2])}</th>
          </tr>
        </thead>
        <tbody>
          {new Array(maxPos - 1).fill(0).map((_, i) => (
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
