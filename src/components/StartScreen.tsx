import { useState } from 'react';
import { Clef, AccidentalType, AccidentalMode, NotationSystem, TrainingMode, TrainingConfig } from '../types';
import { notesByClef } from '../data/noteDefinitions';
import { ConfigPanel } from './ConfigPanel';
import { NoteSelector } from './NoteSelector';

interface StartScreenProps {
  onStart: (config: TrainingConfig) => void;
}

const defaultConfig: TrainingConfig = {
  clef: Clef.Treble,
  selectedNoteIds: [],
  accidentalType: AccidentalType.None,
  accidentalMode: AccidentalMode.Single,
  notationSystem: NotationSystem.German,
  trainingMode: TrainingMode.Endless,
  taskCount: 20,
};

export function StartScreen({ onStart }: StartScreenProps) {
  const [config, setConfig] = useState<TrainingConfig>(() => {
    const allNotes = notesByClef[defaultConfig.clef];
    return { ...defaultConfig, selectedNoteIds: allNotes.map((n) => n.id) };
  });

  const allNotes = notesByClef[config.clef];

  function handleConfigChange(updated: TrainingConfig) {
    if (updated.clef !== config.clef) {
      const notes = notesByClef[updated.clef];
      updated.selectedNoteIds = notes.map((n) => n.id);
    }
    setConfig(updated);
  }

  function handleToggleNote(id: string) {
    setConfig((prev) => {
      const ids = prev.selectedNoteIds.includes(id)
        ? prev.selectedNoteIds.filter((nid) => nid !== id)
        : [...prev.selectedNoteIds, id];
      return { ...prev, selectedNoteIds: ids };
    });
  }

  function handleSelectAll() {
    setConfig((prev) => ({
      ...prev,
      selectedNoteIds: notesByClef[prev.clef].map((n) => n.id),
    }));
  }

  function handleDeselectAll() {
    setConfig((prev) => ({ ...prev, selectedNoteIds: [] }));
  }

  function handleStart() {
    if (config.selectedNoteIds.length === 0) return;
    onStart(config);
  }

  return (
    <div className="start-screen">
      <h1 className="app-title">Notentrainer</h1>
      <p className="app-subtitle">Viel Spaß beim Noten lesen üben!</p>
      <ConfigPanel config={config} onChange={handleConfigChange} />
      <NoteSelector
        notes={allNotes}
        selectedIds={config.selectedNoteIds}
        notationSystem={config.notationSystem}
        onToggle={handleToggleNote}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
      />
      <button
        className="start-btn"
        onClick={handleStart}
        disabled={config.selectedNoteIds.length === 0}
      >
        {config.trainingMode === TrainingMode.Fixed
          ? `Training starten (${config.taskCount} Aufgaben)`
          : 'Training starten'}
      </button>
    </div>
  );
}
