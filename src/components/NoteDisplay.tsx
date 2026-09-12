import { useEffect, useRef } from 'react';
import { Accidental, Formatter, Renderer, Stave, StaveNote, Voice } from 'vexflow';
import { Clef, NotePosition, KeySignature } from '../types';

interface NoteDisplayProps {
  clef: Clef;
  note: NotePosition | null;
  accidental: number;
  keySignature: KeySignature | null;
  width?: number;
  height?: number;
}

export function NoteDisplay({ clef, note, accidental, keySignature, width = 300, height = 220 }: NoteDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.replaceChildren();
    const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
    renderer.resize(width, height);

    const context = renderer.getContext();
    const stave = new Stave(10, 40, width - 20);
    stave.addClef(getVexFlowClef(clef));
    if (keySignature) {
      stave.addKeySignature(getKeySignatureName(keySignature));
    }
    stave.setContext(context).draw();

    if (!note) return;

    const staveNote = new StaveNote({
      clef: getVexFlowClef(clef),
      keys: [`${note.step.toLowerCase()}/${note.octave}`],
      duration: 'w',
    });

    if (accidental !== 0 && !keySignature) {
      staveNote.addModifier(new Accidental(accidental === 1 ? '#' : 'b'), 0);
    }

    const voice = new Voice({ numBeats: 1, beatValue: 1 });
    voice.addTickable(staveNote);
    const noteAreaWidth = stave.getNoteEndX() - stave.getNoteStartX();
    new Formatter().joinVoices([voice]).format([voice], noteAreaWidth);
    const noteWidth = staveNote.getWidth();
    const centerOffset = Math.max(0, (noteAreaWidth - noteWidth) / 2);
    staveNote.setXShift(centerOffset);
    voice.draw(context, stave);
  }, [accidental, clef, height, keySignature, note, width]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Notendarstellung"
      style={{ width: '100%', maxWidth: width, height }}
    />
  );
}

function getVexFlowClef(clef: Clef): 'treble' | 'bass' | 'alto' {
  if (clef === Clef.Bass) return 'bass';
  if (clef === Clef.CAlto) return 'alto';
  return 'treble';
}

function getKeySignatureName(keySignature: KeySignature): string {
  if (keySignature.count === 0) return 'C';

  const sharpRoots = ['G', 'D', 'A', 'E', 'B', 'F#', 'C#'];
  const flatRoots = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'];
  const roots = keySignature.type === 'sharp' ? sharpRoots : flatRoots;
  return roots[keySignature.count - 1] ?? 'C';
}
