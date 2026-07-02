import { NotePosition, NotationSystem, AccidentalType } from '../types';
import { getNoteVariantName, isAccidentalCommon } from '../data/noteDefinitions';

interface AnswerButtonsProps {
  notes: NotePosition[];
  notationSystem: NotationSystem;
  accidentalType: AccidentalType;
  onAnswer: (answer: string) => void;
  disabled: boolean;
  correctAnswer: string | null;
  givenAnswer: string | null;
}

function getVariantAccidentals(step: string, accidentalType: AccidentalType): number[] {
  if (accidentalType === AccidentalType.None) return [0];

  const result = [0];
  if ((accidentalType === AccidentalType.Sharp || accidentalType === AccidentalType.Mixed) && isAccidentalCommon(step, 'sharp')) {
    result.push(1);
  }
  if ((accidentalType === AccidentalType.Flat || accidentalType === AccidentalType.Mixed) && isAccidentalCommon(step, 'flat')) {
    result.push(-1);
  }
  return result;
}

export function AnswerButtons({
  notes,
  notationSystem,
  accidentalType,
  onAnswer,
  disabled,
  correctAnswer,
  givenAnswer,
}: AnswerButtonsProps) {
  const answers: { key: string; label: string }[] = [];

  for (const note of notes) {
    const accidentals = getVariantAccidentals(note.step, accidentalType);
    for (const acc of accidentals) {
      const label = getNoteVariantName(note, acc, notationSystem);
      const key = note.id + '_' + acc;
      if (!answers.some((a) => a.label === label)) {
        answers.push({ key, label });
      }
    }
  }

  function getButtonClass(label: string): string {
    if (!givenAnswer || !correctAnswer) return '';
    if (label === correctAnswer) return 'correct';
    if (label === givenAnswer && label !== correctAnswer) return 'wrong';
    return '';
  }

  return (
    <div className="answer-buttons">
      {answers.map((a) => (
        <button
          key={a.key}
          className={`answer-btn ${getButtonClass(a.label)}`}
          onClick={() => onAnswer(a.label)}
          disabled={disabled}
          aria-label={a.label}
        >
          {a.label}
        </button>
      ))}
    </div>
  );
}
