import { NotePosition, NotationSystem } from '../types';
import { getNoteVariantName } from '../data/noteDefinitions';

interface NoteSelectorProps {
  notes: NotePosition[];
  selectedIds: string[];
  notationSystem: NotationSystem;
  onToggle: (id: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export function NoteSelector({
  notes,
  selectedIds,
  notationSystem,
  onToggle,
  onSelectAll,
  onDeselectAll,
}: NoteSelectorProps) {
  return (
    <div className="note-selector">
      <div className="note-selector-header">
        <span>Notenauswahl</span>
        <div className="note-selector-actions">
          <button className="small-btn" onClick={onSelectAll}>Alle</button>
          <button className="small-btn" onClick={onDeselectAll}>Keine</button>
        </div>
      </div>
      <div className="note-selector-grid">
        {notes.map((n) => (
          <label key={n.id} className="note-checkbox">
            <input
              type="checkbox"
              checked={selectedIds.includes(n.id)}
              onChange={() => onToggle(n.id)}
            />
            <span>{getNoteVariantName(n, 0, notationSystem)}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
