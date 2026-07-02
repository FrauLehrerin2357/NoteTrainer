interface StatisticsProps {
  total: number;
  correct: number;
  wrong: number;
  startTime: number;
}

function formatDuration(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  if (min > 0) return `${min}:${sec.toString().padStart(2, '0')}`;
  return `${sec}s`;
}

export function Statistics({ total, correct, wrong, startTime }: StatisticsProps) {
  const elapsed = startTime ? Date.now() - startTime : 0;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="statistics">
      <div className="stat-item">
        <span className="stat-label">Aufgaben</span>
        <span className="stat-value">{total}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Richtig</span>
        <span className="stat-value correct">{correct}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Falsch</span>
        <span className="stat-value wrong">{wrong}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Quote</span>
        <span className="stat-value">{percentage}%</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Zeit</span>
        <span className="stat-value">{formatDuration(elapsed)}</span>
      </div>
    </div>
  );
}
