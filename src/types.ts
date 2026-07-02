export enum Clef {
  Treble = 'treble',
  Bass = 'bass',
  CAlto = 'c-alto',
}

export enum AccidentalType {
  None = 'none',
  Sharp = 'sharp',
  Flat = 'flat',
  Mixed = 'mixed',
}

export enum AccidentalMode {
  Single = 'single',
  KeySignature = 'key-signature',
  Mixed = 'mixed',
}

export enum NotationSystem {
  German = 'german',
  International = 'international',
}

export enum TrainingMode {
  Endless = 'endless',
  Fixed = 'fixed',
}

export interface NotePosition {
  id: string;
  clef: Clef;
  staffPosition: number;
  step: 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';
  octave: number;
  germanName: string;
  internationalName: string;
  midiNumber: number;
}

export interface NoteVariant {
  noteId: string;
  accidental: number;
  germanName: string;
  internationalName: string;
}

export interface Task {
  note: NotePosition;
  accidental: number;
  displayMode: 'single' | 'key-signature';
  keySignature: KeySignature | null;
  correctAnswer: string;
}

export interface KeySignature {
  type: 'sharp' | 'flat';
  count: number;
  staffPositions: number[];
}

export interface TrainingConfig {
  clef: Clef;
  selectedNoteIds: string[];
  accidentalType: AccidentalType;
  accidentalMode: AccidentalMode;
  notationSystem: NotationSystem;
  trainingMode: TrainingMode;
  taskCount: number;
}

export interface Answer {
  task: Task;
  givenAnswer: string;
  correct: boolean;
  responseTime: number;
}

export interface TrainingResult {
  config: TrainingConfig;
  answers: Answer[];
  startTime: number;
  endTime: number;
  correctCount: number;
  wrongCount: number;
  totalTime: number;
}

export type Screen = 'start' | 'training' | 'result';
