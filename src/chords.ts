import { isEqual } from 'lodash';

export const NOTES = ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B', 'H'];
export const CHORDTYPES = ['', 'm', '7', 'dim', '5'];

const TUNING = [55, 62, 57];
const MAX_POS = 8;

const CHORD_DB = [];

const createNotesArr = (notes: number[]) => {
  const arr = notes.map(n => n % 12);
  arr.sort((a, b) => a - b);
  return arr;
};

const createDb = () => {
  for (let i = 0; i < 12; i++) {
    CHORD_DB.push(
      { base: i, type: 0, typeStr: '', notes: createNotesArr([i, i + 4, i + 4 + 3]) },
      { base: i, type: 1, typeStr: 'm', notes: createNotesArr([i, i + 3, i + 3 + 4]) },
      { base: i, type: 2, typeStr: '7', notes: createNotesArr([i, i + 4, i + 4 + 3 + 3]) },
      { base: i, type: 2, typeStr: '7', notes: createNotesArr([i, i + 4 + 3 + 3, i + 4 + 3]) },
      { base: i, type: 2, typeStr: '7', notes: createNotesArr([i + 4 + 3 + 3, i + 4, i + 4 + 3]) },
      { base: i, type: 3, typeStr: 'dim', notes: createNotesArr([i, i + 3, i + 6]) },
      // { base: i, type: 3, typeStr: 'dim', notes: createNotesArr([i, i + 3, i + 9]) },
      // { base: i, type: 3, typeStr: 'dim', notes: createNotesArr([i, i + 9, i + 6]) },
      // { base: i, type: 3, typeStr: 'dim', notes: createNotesArr([i + 9, i + 3, i + 6]) },
      { base: i, type: 4, typeStr: '5', notes: createNotesArr([i, i, i + 3 + 4]) },
      { base: i, type: 4, typeStr: '5', notes: createNotesArr([i, i + 3 + 4, i + 3 + 4]) },
    );
  }
};
createDb();
console.log(CHORD_DB);

// note is zero indexed
const pitchToNote = (pitch: number) => {
  return pitch % 12;
}

const getChords = (pitches: number[]) => {
  const notes = pitches.map(p => pitchToNote(p)).sort((a, b) => a - b);
  const res = CHORD_DB.filter(item => isEqual(item.notes, notes));
  return res.map(r => ({ base: r.base, type: r.type }));
};

// VALID_CHORDS[note][type] = [pitches];
const VALID_CHORDS = [];

function init() {
  for (let i = 0; i < MAX_POS; i++) {
    for (let j = 0; j < MAX_POS; j++) {
      for (let k = 0; k < MAX_POS; k++) {
        const pitches = [TUNING[0] + i, TUNING[1] + j, TUNING[2] + k];
        const chords = getChords(pitches);
        chords.forEach(chord => {
          if (!Array.isArray(VALID_CHORDS[chord.base])) {
            VALID_CHORDS[chord.base] = [];
          }
          if (!Array.isArray(VALID_CHORDS[chord.base][chord.type])) {
            VALID_CHORDS[chord.base][chord.type] = [];
          }
          VALID_CHORDS[chord.base][chord.type].push(pitches);
        });
      }
    }
  }
}

init();

export function getChordPitches(note: number, type: number) {
  return VALID_CHORDS[note][type];
}

export function getChordPositions(note: number, type: number) {
  return VALID_CHORDS[note][type].map(pitches => pitches.map((pitch, i) => pitch - TUNING[i]));
}

console.log('VALID_CHORDS', VALID_CHORDS);
