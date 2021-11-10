import React from 'react';
import { NOTES } from './chords';
import styles from './Tuning.module.scss';

interface TuningProps {
  tuning: number[];
  maxPos: number;
  onSetTuning: (tuning: number[]) => void;
  onSetMaxNote: (number) => void;
}

export const Tuning: React.FC<TuningProps> = React.memo((props) => {
  const { tuning, maxPos, onSetTuning, onSetMaxNote } = props;

  const tuningOptions = [
    ...NOTES.map((note, index) => ({ label: note, value: 48 + index })),
    ...NOTES.map((note, index) => ({ label: `${note}'`, value: 60 + index })),
  ];

  const maxPosOptions = [
    ...Array(10).fill(0).map((_, index) => ({ label: 7 + index, value: 7 + index })),
  ];

  const getTuningArray = (pos: number, newValue: number) => {
    const clone = [...tuning];
    clone[pos] = newValue;
    return clone;
  }

  const renderTuningSelect = (pos: number) => {
    return (
      <select value={tuning[pos]} onChange={(e) => onSetTuning(getTuningArray(pos, Number(e.currentTarget.value)))}>
        {tuningOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className={styles.tuning}>
      <div>
        <label>Tuning:</label>
        <span>
          {renderTuningSelect(0)}
          {renderTuningSelect(1)}
          {renderTuningSelect(2)}
          <button onClick={() => onSetTuning([55, 62, 57])}>Reset</button>
        </span>
      </div>
      <div>
        <label>Max position:</label>
        <select value={maxPos} onChange={(e) => onSetMaxNote(Number(e.currentTarget.value))}>
          {maxPosOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});
