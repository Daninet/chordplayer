import React, { useEffect, useState } from 'react';
import styles from './Sliders.module.scss';
import { useDebounce } from './useDebounce';

interface SlidersProps {
  onSetVolume: (volume: number) => void;
  onSetTuning: (tuning: number) => void;
}

export const Sliders: React.FC<SlidersProps> = (props) => {
  const { onSetVolume, onSetTuning } = props;
  const [volume, setVolume] = useState(0.5);
  const debouncedVolume = useDebounce(volume, 50);
  const [tuning, setTuning] = useState(440);
  const debouncedTuning = useDebounce(tuning, 25);

  useEffect(() => {
    onSetVolume(debouncedVolume);
  }, [onSetVolume, debouncedVolume]);

  useEffect(() => {
    onSetTuning(debouncedTuning);
  }, [onSetTuning, debouncedTuning]);

  return (
    <div className={styles.sliders}>
      <label>
        Tuning
        <br />
        <input
          className={styles.tuner}
          type="range"
          step="0.1"
          min="400"
          max="500"
          value={tuning}
          onChange={(e) => setTuning(Number(e.target.value))}
        />
      </label>
      <label>
        Volume
        <br />
        <input
          className={styles.tuner}
          type="range"
          step="0.02"
          min="0"
          max="1"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </label>
      {/* <br />
      {tuning.toFixed(1)}
      <br /> */}
    </div>
  );
};
