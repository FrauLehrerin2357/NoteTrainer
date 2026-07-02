import { Clef, NotePosition, KeySignature, NotationSystem } from '../types';

function tNote(
  id: string,
  clef: Clef,
  staffPosition: number,
  step: 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B',
  octave: number,
  germanName: string,
  internationalName: string,
  midiNumber: number
): NotePosition {
  return { id, clef, staffPosition, step, octave, germanName, internationalName, midiNumber };
}

/*
 * Treble clef: G4 (g') is on the 2nd line (position 2 from bottom).
 * Range: g (G3) to c''' (C6)
 */
export const trebleNotes: NotePosition[] = [
  tNote('t-g', Clef.Treble, -5, 'G', 3, 'g', 'G3', 55),
  tNote('t-a', Clef.Treble, -4, 'A', 3, 'a', 'A3', 57),
  tNote('t-h', Clef.Treble, -3, 'B', 3, 'h', 'B3', 59),
  tNote('t-c1', Clef.Treble, -2, 'C', 4, "c'", 'C4', 60),
  tNote('t-d1', Clef.Treble, -1, 'D', 4, "d'", 'D4', 62),
  tNote('t-e1', Clef.Treble, 0, 'E', 4, "e'", 'E4', 64),
  tNote('t-f1', Clef.Treble, 1, 'F', 4, "f'", 'F4', 65),
  tNote('t-g1', Clef.Treble, 2, 'G', 4, "g'", 'G4', 67),
  tNote('t-a1', Clef.Treble, 3, 'A', 4, "a'", 'A4', 69),
  tNote('t-h1', Clef.Treble, 4, 'B', 4, "h'", 'B4', 71),
  tNote('t-c2', Clef.Treble, 5, 'C', 5, "c''", 'C5', 72),
  tNote('t-d2', Clef.Treble, 6, 'D', 5, "d''", 'D5', 74),
  tNote('t-e2', Clef.Treble, 7, 'E', 5, "e''", 'E5', 76),
  tNote('t-f2', Clef.Treble, 8, 'F', 5, "f''", 'F5', 77),
  tNote('t-g2', Clef.Treble, 9, 'G', 5, "g''", 'G5', 79),
  tNote('t-a2', Clef.Treble, 10, 'A', 5, "a''", 'A5', 81),
  tNote('t-h2', Clef.Treble, 11, 'B', 5, "h''", 'B5', 83),
  tNote('t-c3', Clef.Treble, 12, 'C', 6, "c'''", 'C6', 84),
];

/*
 * Bass clef: F3 (f) is on the 4th line (position 6 from bottom).
 * The two dots of the bass clef surround the F-line.
 * Range: C (C2) to e' (E4)
 */
export const bassNotes: NotePosition[] = [
  tNote('b-c', Clef.Bass, -4, 'C', 2, 'C', 'C2', 36),
  tNote('b-d', Clef.Bass, -3, 'D', 2, 'D', 'D2', 38),
  tNote('b-e', Clef.Bass, -2, 'E', 2, 'E', 'E2', 40),
  tNote('b-f', Clef.Bass, -1, 'F', 2, 'F', 'F2', 41),
  tNote('b-g', Clef.Bass, 0, 'G', 2, 'G', 'G2', 43),
  tNote('b-a', Clef.Bass, 1, 'A', 2, 'A', 'A2', 45),
  tNote('b-h', Clef.Bass, 2, 'B', 2, 'H', 'B2', 47),
  tNote('b-c1', Clef.Bass, 3, 'C', 3, 'c', 'C3', 48),
  tNote('b-d1', Clef.Bass, 4, 'D', 3, 'd', 'D3', 50),
  tNote('b-e1', Clef.Bass, 5, 'E', 3, 'e', 'E3', 52),
  tNote('b-f1', Clef.Bass, 6, 'F', 3, 'f', 'F3', 53),
  tNote('b-g1', Clef.Bass, 7, 'G', 3, 'g', 'G3', 55),
  tNote('b-a1', Clef.Bass, 8, 'A', 3, 'a', 'A3', 57),
  tNote('b-h1', Clef.Bass, 9, 'B', 3, 'h', 'B3', 59),
  tNote('b-c2', Clef.Bass, 10, 'C', 4, "c'", 'C4', 60),
  tNote('b-d2', Clef.Bass, 11, 'D', 4, "d'", 'D4', 62),
  tNote('b-e2', Clef.Bass, 12, 'E', 4, "e'", 'E4', 64),
];

/*
 * Alto clef (C-clef): C4 (c') is on the middle line (position 4 from bottom).
 * Range: A (A2) to e'' (E5)
 */
export const altoNotes: NotePosition[] = [
  tNote('a-a', Clef.CAlto, -5, 'A', 2, 'A', 'A2', 45),
  tNote('a-h', Clef.CAlto, -4, 'B', 2, 'H', 'B2', 47),
  tNote('a-c1', Clef.CAlto, -3, 'C', 3, 'c', 'C3', 48),
  tNote('a-d1', Clef.CAlto, -2, 'D', 3, 'd', 'D3', 50),
  tNote('a-e1', Clef.CAlto, -1, 'E', 3, 'e', 'E3', 52),
  tNote('a-f1', Clef.CAlto, 0, 'F', 3, 'f', 'F3', 53),
  tNote('a-g1', Clef.CAlto, 1, 'G', 3, 'g', 'G3', 55),
  tNote('a-a1', Clef.CAlto, 2, 'A', 3, 'a', 'A3', 57),
  tNote('a-h1', Clef.CAlto, 3, 'B', 3, 'h', 'B3', 59),
  tNote('a-c2', Clef.CAlto, 4, 'C', 4, "c'", 'C4', 60),
  tNote('a-d2', Clef.CAlto, 5, 'D', 4, "d'", 'D4', 62),
  tNote('a-e2', Clef.CAlto, 6, 'E', 4, "e'", 'E4', 64),
  tNote('a-f2', Clef.CAlto, 7, 'F', 4, "f'", 'F4', 65),
  tNote('a-g2', Clef.CAlto, 8, 'G', 4, "g'", 'G4', 67),
  tNote('a-a2', Clef.CAlto, 9, 'A', 4, "a'", 'A4', 69),
  tNote('a-h2', Clef.CAlto, 10, 'B', 4, "h'", 'B4', 71),
  tNote('a-c3', Clef.CAlto, 11, 'C', 5, "c''", 'C5', 72),
  tNote('a-d3', Clef.CAlto, 12, 'D', 5, "d''", 'D5', 74),
  tNote('a-e3', Clef.CAlto, 13, 'E', 5, "e''", 'E5', 76),
];

export const notesByClef: Record<Clef, NotePosition[]> = {
  [Clef.Treble]: trebleNotes,
  [Clef.Bass]: bassNotes,
  [Clef.CAlto]: altoNotes,
};

export const clefLabels: Record<Clef, string> = {
  [Clef.Treble]: 'Violinschl\xfcssel',
  [Clef.Bass]: 'Bassschl\xfcssel',
  [Clef.CAlto]: 'Altschl\xfcssel (C-Schl\xfcssel)',
};

export const clefSymbols: Record<Clef, string> = {
  [Clef.Treble]: '\u{1D11E}',
  [Clef.Bass]: '\u{1D122}',
  [Clef.CAlto]: '\u{1D120}',
};

/*
 * Key signature positions (staff positions for sharps/flats in the standard order):
 * Treble: F5(8), C5(5), G4(2), D5(6), A4(3), E5(7), B4(4)
 * Bass:   F3(6), C3(3), G2(0), D3(4), A2(1), E3(5), B2(2)
 * Alto:   F4(7), C4(4), G3(1), D4(5), A3(2), E4(6), B3(3)
 */
export const keySignaturePositions: Record<Clef, { sharps: number[]; flats: number[] }> = {
  [Clef.Treble]: {
    sharps: [8, 5, 9, 6, 3, 7, 4],
    flats: [4, 7, 3, 6, 2, 5, 8],
  },
  [Clef.Bass]: {
    sharps: [6, 3, 0, 4, 1, 5, 2],
    flats: [2, 5, 1, 4, 0, 3, 6],
  },
  [Clef.CAlto]: {
    sharps: [7, 4, 1, 5, 2, 6, 3],
    flats: [3, 6, 2, 5, 1, 4, 7],
  },
};

export const accidentalStepMap: Record<string, { sharpId: string; flatId: string } | null> = {
  C: { sharpId: 'C#', flatId: 'Cb' },
  D: { sharpId: 'D#', flatId: 'Db' },
  E: { sharpId: 'E#', flatId: 'Eb' },
  F: { sharpId: 'F#', flatId: 'Fb' },
  G: { sharpId: 'G#', flatId: 'Gb' },
  A: { sharpId: 'A#', flatId: 'Ab' },
  B: { sharpId: 'B#', flatId: 'Bb' },
};

function getGermanAccidentalName(germanRoot: string, accidental: number): string {
  const match = germanRoot.match(/^([a-hA-H])(.*)$/);
  if (!match) return germanRoot;
  const base = match[1];
  const octave = match[2];

  if (accidental === 1) {
    const sharpBase: Record<string, string> = {
      'c': 'cis', 'd': 'dis', 'e': 'eis', 'f': 'fis',
      'g': 'gis', 'a': 'ais', 'h': 'his',
      'C': 'Cis', 'D': 'Dis', 'E': 'Eis', 'F': 'Fis',
      'G': 'Gis', 'A': 'Ais', 'H': 'His',
    };
    return (sharpBase[base] ?? base + 'is') + octave;
  }
  if (accidental === -1) {
    if (base === 'h') return 'b' + octave;
    if (base === 'H') return 'B';
    const flatBase: Record<string, string> = {
      'c': 'ces', 'd': 'des', 'e': 'es', 'f': 'fes',
      'g': 'ges', 'a': 'as',
      'C': 'Ces', 'D': 'Des', 'E': 'Es', 'F': 'Fes',
      'G': 'Ges', 'A': 'As',
    };
    return (flatBase[base] ?? base + 'es') + octave;
  }
  return germanRoot;
}

function getInternationalAccidentalName(intRoot: string, accidental: number): string {
  const step = intRoot.replace(/[0-9]/g, '');
  const octave = intRoot.replace(/[A-Z]/g, '');
  if (accidental === 1) return step + '#' + octave;
  if (accidental === -1) return step + 'b' + octave;
  return intRoot;
}

export function getNoteVariantName(
  note: NotePosition,
  accidental: number,
  notationSystem: NotationSystem
): string {
  if (notationSystem === 'german') {
    return getGermanAccidentalName(note.germanName, accidental);
  }
  return getInternationalAccidentalName(note.internationalName, accidental);
}

export function isAccidentalCommon(step: string, type: 'sharp' | 'flat'): boolean {
  const commonSharps = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const commonFlats = ['D', 'E', 'G', 'A', 'B'];
  if (type === 'sharp') return commonSharps.includes(step);
  return commonFlats.includes(step);
}

export function getKeySignature(clef: Clef, type: 'sharp' | 'flat', count: number): KeySignature | null {
  if (count === 0) return null;
  const sig = keySignaturePositions[clef];
  const positions = type === 'sharp' ? sig.sharps.slice(0, count) : sig.flats.slice(0, count);
  return { type, count, staffPositions: positions };
}
