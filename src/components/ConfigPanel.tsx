import { Clef, AccidentalType, AccidentalMode, NotationSystem, TrainingMode, TrainingConfig } from '../types';
import { clefLabels } from '../data/noteDefinitions';

interface ConfigPanelProps {
  config: TrainingConfig;
  onChange: (config: TrainingConfig) => void;
}

export function ConfigPanel({ config, onChange }: ConfigPanelProps) {
  function update<K extends keyof TrainingConfig>(key: K, value: TrainingConfig[K]) {
    onChange({ ...config, [key]: value });
  }

  function handleTaskCountChange(value: string) {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) {
      update('taskCount', num);
    }
  }

  return (
    <div className="config-panel">
      <div className="config-group">
        <label className="config-label">Notenschlüssel</label>
        <div className="config-options">
          {Object.values(Clef).map((c) => (
            <button
              key={c}
              className={`config-btn ${config.clef === c ? 'active' : ''}`}
              onClick={() => update('clef', c)}
            >
              {clefLabels[c]}
            </button>
          ))}
        </div>
      </div>

      <div className="config-group">
        <label className="config-label">Vorzeichen</label>
        <div className="config-options">
          {[
            { value: AccidentalType.None, label: 'Keine' },
            { value: AccidentalType.Sharp, label: 'Nur #' },
            { value: AccidentalType.Flat, label: 'Nur b' },
            { value: AccidentalType.Mixed, label: 'Gemischt' },
          ].map((o) => (
            <button
              key={o.value}
              className={`config-btn ${config.accidentalType === o.value ? 'active' : ''}`}
              onClick={() => update('accidentalType', o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {config.accidentalType !== AccidentalType.None && (
        <div className="config-group">
          <label className="config-label">Darstellungsart</label>
          <div className="config-options">
            {[
              { value: AccidentalMode.Single, label: 'Einzelvorzeichen' },
              { value: AccidentalMode.KeySignature, label: 'Generalvorzeichen' },
              { value: AccidentalMode.Mixed, label: 'Gemischt' },
            ].map((o) => (
              <button
                key={o.value}
                className={`config-btn ${config.accidentalMode === o.value ? 'active' : ''}`}
                onClick={() => update('accidentalMode', o.value)}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="config-group">
        <label className="config-label">Notation</label>
        <div className="config-options">
          {[
            { value: NotationSystem.German, label: 'Deutsch' },
            { value: NotationSystem.International, label: 'International' },
          ].map((o) => (
            <button
              key={o.value}
              className={`config-btn ${config.notationSystem === o.value ? 'active' : ''}`}
              onClick={() => update('notationSystem', o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="config-group">
        <label className="config-label">Modus</label>
        <div className="config-options">
          {[
            { value: TrainingMode.Endless, label: 'Endlos' },
            { value: TrainingMode.Fixed, label: 'Feste Anzahl' },
          ].map((o) => (
            <button
              key={o.value}
              className={`config-btn ${config.trainingMode === o.value ? 'active' : ''}`}
              onClick={() => update('trainingMode', o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {config.trainingMode === TrainingMode.Fixed && (
        <div className="config-group">
          <label className="config-label">Anzahl Aufgaben</label>
          <input
            type="number"
            className="config-input"
            value={config.taskCount}
            min={1}
            max={200}
            onChange={(e) => handleTaskCountChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
