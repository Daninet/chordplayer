import React, { useEffect, useState } from 'react';
import styles from './Sustain.module.scss';
import { useDebounce } from './useDebounce';

interface SustainProps {
  onSetSustain: (sustain: number | null) => void;
}

export const Sustain: React.FC<SustainProps> = (props) => {
  const { onSetSustain } = props;
  const [sustain, setSustain] = useState(null);
  const debouncedSustain = useDebounce(sustain, 25);

  useEffect(() => {
    onSetSustain(debouncedSustain);
  }, [onSetSustain, debouncedSustain]);

  return (
    <div className={styles.sustain}>
      <div className={styles.left}>
        <label>
          <input
            type="radio"
            name="sustain"
            value="sustain"
            checked={sustain === null}
            onChange={(e) => setSustain(null)}
          />
          Sustain
        </label>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label>
          <input
            type="radio"
            name="sustain"
            value="release"
            checked={sustain !== null}
            onChange={(e) => setSustain(0.3)}
          />
          Auto release
        </label>
      </div>
      <div className={styles.right}>
        <label>
          Auto release timing
          <br />
          <input
            className={styles.tuner}
            type="range"
            step="0.02"
            min="0"
            max="1"
            disabled={sustain === null}
            value={sustain}
            onChange={(e) => setSustain(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
};
