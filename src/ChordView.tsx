import React from 'react';
import { NOTES } from './chords';
import styles from './ChordView.module.scss';

interface ChordViewProps {
  positions: [number, number, number];
}

export const ChordView: React.FC<ChordViewProps> = ({ positions }) => {
  const getNote = (baseNote: number, pos: number) => {
    const index = (baseNote + pos) % 12;
    return NOTES[index];
  }

  return (
    <table className={styles.chordview}>
      <thead>
        <tr>
          <th>{getNote(7, positions[0])}</th>
          <th>{getNote(2, positions[1])}</th>
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
  )
};
