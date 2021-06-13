import { isEqual } from 'lodash';

export const NOTES = ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B', 'H'];
export const NOTES_CHROMATIC_ORDER = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
export const NOTES_FIFTHS_ORDER = [6, 1, 8, 3, 10, 5, 0, 7, 2, 9, 4, 11];
export const CHORDTYPES = ['', 'm', '7', 'dim', '5', '6', 'm7', 'maj7', 'sus2', 'sus4', 'm6', 'aug'];

const TUNING = [55, 62, 57];
const MAX_POS = 8;

const CHORD_DB = [];

const createNotesArr = (notes: number[]) => {
  const arr = notes.map(n => n % 12);
  arr.sort((a, b) => a - b);
  return arr;
};

const threeNoteChordItem = (base: number, type: number, notes: number[]) => {
  return { base, type, notes: createNotesArr(notes) };
}

const fourNoteChordItem = (base: number, type: number, notes: number[], fourth: number) => {
  return [
    threeNoteChordItem(base, type, [notes[0], notes[1], fourth]),
    threeNoteChordItem(base, type, [notes[0], fourth, notes[2]]),
    threeNoteChordItem(base, type, [fourth, notes[1], notes[2]]),
  ];
}

const createDb = () => {
  for (let i = 0; i < 12; i++) {
    CHORD_DB.push(
      threeNoteChordItem(i, 0, [i, i + 4, i + 4 + 3]), // major
      threeNoteChordItem(i, 1, [i, i + 3, i + 3 + 4]), // minor
      ...fourNoteChordItem(i, 2, [i, i + 4, i + 4 + 3], i + 4 + 3 + 3), // 7
      threeNoteChordItem(i, 3, [i, i + 3, i + 6]), // dim
      threeNoteChordItem(i, 4, [i, i, i + 3 + 4]), // 5
      threeNoteChordItem(i, 4, [i, i + 3 + 4, i + 3 + 4]), // 5
      ...fourNoteChordItem(i, 5, [i, i + 4, i + 4 + 3], i + 4 + 3 + 2), // 6
      ...fourNoteChordItem(i, 6, [i, i + 3, i + 3 + 4], i + 4 + 3 + 3), // m7
      ...fourNoteChordItem(i, 7, [i, i + 4, i + 4 + 3], i + 4 + 3 + 4), // maj7
      threeNoteChordItem(i, 8, [i, i + 2, i + 4 + 3]), // sus2
      threeNoteChordItem(i, 9, [i, i + 5, i + 4 + 3]), // sus4
      ...fourNoteChordItem(i, 10, [i, i + 3, i + 3 + 4], i + 4 + 3 + 2), // m6
      threeNoteChordItem(i, 11, [i, i + 4, i + 4 + 4]), // aug
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

const getDifficulty = (pitches: number[]) => {
  const positions = pitches.map((pitch, i) => pitch - TUNING[i]);
  const score = positions.reduce((prev, curr) => curr === 0 ? prev + 2 : prev + curr, 0);
  return score;
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

  // order by complexity
  for (let i = 0; i < VALID_CHORDS.length; i++) {
    for (let j = 0; j < VALID_CHORDS[i].length; j++) {
      const pitches = VALID_CHORDS[i][j];
      pitches.sort((a, b) => getDifficulty(a) - getDifficulty(b));
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

export function positionsToPitches(positions: number[]) {
  return TUNING.map((t, i) => positions[i] + t);
}

export function getAlternativeNames(positions: number[]) {
  const pitches = positions.map((p, i) => TUNING[i] + p);
  const chords = getChords(pitches).sort((a, b) => a.type - b.type);
  return chords.map(c => `${NOTES[c.base]}${CHORDTYPES[c.type]}`);
}

console.log('VALID_CHORDS', VALID_CHORDS);
