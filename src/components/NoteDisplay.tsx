import { Clef, NotePosition, KeySignature } from '../types';
import { renderNoteSvgDataUri } from '../utils/staffRendering';

interface NoteDisplayProps {
  clef: Clef;
  note: NotePosition | null;
  accidental: number;
  keySignature: KeySignature | null;
  width?: number;
  height?: number;
}

export function NoteDisplay({ clef, note, accidental, keySignature, width = 300, height = 220 }: NoteDisplayProps) {
  const dataUri = renderNoteSvgDataUri(clef, note, accidental, keySignature, width, height);
  return <img src={dataUri} alt="Notendarstellung" style={{ width: '100%', maxWidth: width, height: 'auto' }} />;
}
