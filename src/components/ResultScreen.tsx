import { TrainingResult } from '../types';

interface ResultScreenProps {
  result: TrainingResult;
  onRestart: () => void;
}

function formatDuration(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  if (min > 0) return `${min}:${sec.toString().padStart(2, '0')}`;
  return `${sec}s`;
}

export function ResultScreen({ result, onRestart }: ResultScreenProps) {
  const total = result.answers.length;
  const percentage = total > 0 ? Math.round((result.correctCount / total) * 100) : 0;

  return (
    <div className="result-screen">
      <h2>Training beendet</h2>

      <div className="result-stat">
        <span className="result-label">Aufgaben insgesamt:</span>
        <span className="result-value">{total}</span>
      </div>
      <div className="result-stat">
        <span className="result-label">Richtig:</span>
        <span className="result-value correct">{result.correctCount}</span>
      </div>
      <div className="result-stat">
        <span className="result-label">Falsch:</span>
        <span className="result-value wrong">{result.wrongCount}</span>
      </div>
      <div className="result-stat">
        <span className="result-label">Trefferquote:</span>
        <span className="result-value">{percentage}%</span>
      </div>
      <div className="result-stat">
        <span className="result-label">Trainingsdauer:</span>
        <span className="result-value">{formatDuration(result.totalTime)}</span>
      </div>

      <button className="start-btn" onClick={onRestart}>
        Noch einmal
      </button>
    </div>
  );
}
