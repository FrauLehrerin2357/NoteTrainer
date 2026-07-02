import {
  NotePosition,
  TrainingConfig,
  Task,
  KeySignature,
  AccidentalType,
  AccidentalMode,
  Clef,
} from '../types';
import {
  notesByClef,
  getKeySignature,
  isAccidentalCommon,
  getNoteVariantName,
} from '../data/noteDefinitions';

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getAvailableAccidentals(
  type: AccidentalType,
  step: string
): number[] {
  switch (type) {
    case AccidentalType.None:
      return [0];
    case AccidentalType.Sharp:
      return isAccidentalCommon(step, 'sharp') ? [0, 1] : [0];
    case AccidentalType.Flat:
      return isAccidentalCommon(step, 'flat') ? [0, -1] : [0];
    case AccidentalType.Mixed:
      const result = [0];
      if (isAccidentalCommon(step, 'sharp')) result.push(1);
      if (isAccidentalCommon(step, 'flat')) result.push(-1);
      return result;
  }
}

function pickKeySignature(
  clef: Clef,
  accidentalType: AccidentalType
): KeySignature | null {
  if (accidentalType === AccidentalType.None) return null;

  const maxSharps = accidentalType === AccidentalType.Sharp || accidentalType === AccidentalType.Mixed ? 5 : 0;
  const maxFlats = accidentalType === AccidentalType.Flat || accidentalType === AccidentalType.Mixed ? 5 : 0;

  const types: ('sharp' | 'flat')[] = [];
  if (maxSharps > 0) types.push('sharp');
  if (maxFlats > 0) types.push('flat');

  if (types.length === 0) return null;

  const chosenType = pickRandom(types);
  const maxCount = chosenType === 'sharp' ? maxSharps : maxFlats;
  const count = Math.floor(Math.random() * maxCount) + 1;

  return getKeySignature(clef, chosenType, count);
}

function getKeySignatureAccidentalForStep(keySig: KeySignature, step: string): number {
  if (keySig.type === 'sharp') {
    const sharpSteps = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];
    const count = keySig.count;
    if (sharpSteps.slice(0, count).includes(step)) return 1;
  } else {
    const flatSteps = ['B', 'E', 'A', 'D', 'G', 'C', 'F'];
    const count = keySig.count;
    if (flatSteps.slice(0, count).includes(step)) return -1;
  }
  return 0;
}

function generateSingleTask(
  config: TrainingConfig,
  notes: NotePosition[],
  lastNoteId: string | null,
  lastAccidental: number | null
): Task {
  let note: NotePosition;
  do {
    note = pickRandom(notes);
  } while (notes.length > 1 && note.id === lastNoteId);

  const accidentalType = config.accidentalType;
  const accidentalMode = config.accidentalMode;

  let actualMode: 'single' | 'key-signature';
  if (accidentalMode === AccidentalMode.Single) actualMode = 'single';
  else if (accidentalMode === AccidentalMode.KeySignature) actualMode = 'key-signature';
  else actualMode = Math.random() < 0.5 ? 'single' : 'key-signature';

  let accidental: number = 0;
  let keySignature: KeySignature | null = null;

  if (actualMode === 'key-signature' && accidentalType !== AccidentalType.None) {
    keySignature = pickKeySignature(config.clef, accidentalType);

    if (keySignature) {
      const noteAccidental = getKeySignatureAccidentalForStep(keySignature, note.step);
      const variants = getAvailableAccidentals(accidentalType, note.step);
      if (variants.includes(noteAccidental)) {
        accidental = noteAccidental;
      } else {
        accidental = pickRandom(variants);
        if (accidental === 0) {
          keySignature = null;
        } else {
          actualMode = 'single';
        }
      }
    } else {
      actualMode = 'single';
    }
  }

  if (actualMode === 'single' || !keySignature) {
    keySignature = null;
    actualMode = 'single';
    const variants = getAvailableAccidentals(accidentalType, note.step);
    if (note.id === lastNoteId && lastAccidental !== null && variants.length > 1) {
      const filtered = variants.filter(v => v !== lastAccidental);
      accidental = pickRandom(filtered.length > 0 ? filtered : variants);
    } else {
      accidental = pickRandom(variants);
    }
  }

  const correctAnswer = getNoteVariantName(note, accidental, config.notationSystem);

  return {
    note,
    accidental,
    displayMode: actualMode,
    keySignature,
    correctAnswer,
  };
}

export function generateTasks(
  config: TrainingConfig,
  count: number
): Task[] {
  const notes = notesByClef[config.clef].filter((n) =>
    config.selectedNoteIds.includes(n.id)
  );

  if (notes.length === 0) return [];

  const tasks: Task[] = [];
  let lastNoteId: string | null = null;
  let lastAccidental: number | null = null;

  for (let i = 0; i < count; i++) {
    const task = generateSingleTask(config, notes, lastNoteId, lastAccidental);
    lastNoteId = task.note.id;
    lastAccidental = task.accidental;
    tasks.push(task);
  }

  return tasks;
}
