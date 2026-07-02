import { Clef, NotePosition, KeySignature } from '../types';
import { keySignaturePositions } from '../data/noteDefinitions';

const SPACING = 20;
const NOTEHEAD_W = 16;
const NOTEHEAD_H = 12;
const CLEF_FONT_SIZE = 105;
const ACCIDENTAL_FONT_SIZE = 40;
const MARGIN_LEFT = 30;
const SHARP_Y_OFFSET = 14;
const FLAT_Y_OFFSET = 8;

const CLEF_FONT = "'Segoe UI Symbol', 'Noto Music', 'Bravura', 'Emmentaler', serif";

const clefSymbols: Record<Clef, string> = {
  [Clef.Treble]: '\u{1D11E}',
  [Clef.Bass]:   '\u{1D122}',
  [Clef.CAlto]:  '\u{1D121}',
};

function staffY(position: number, centerY: number): number {
  return centerY - (position - 4) * (SPACING / 2);
}

function getClefY(clef: Clef, centerY: number): number {
  switch (clef) {
    case Clef.Treble: return centerY + 38;
    case Clef.Bass: return centerY + 26;
    case Clef.CAlto: return centerY + 41;
  }
}

function getClefX(clef: Clef, centerX: number): number {
  switch (clef) {
    case Clef.Treble: return centerX + 8;
    case Clef.Bass: return centerX + 8;
    case Clef.CAlto: return centerX + 0;
  }
}

function getAccidentalSymbol(accidental: number): string {
  if (accidental === 1) return '\u266F';
  if (accidental === -1) return '\u266D';
  return '';
}

export function renderStaffSvg(
  clef: Clef,
  note: NotePosition | null,
  accidental: number,
  keySignature: KeySignature | null,
  width: number,
  height: number
): string {
  const centerY = height / 2;
  const svgW = Math.max(width, 200);
  const svgH = Math.max(height, 220);

  const lines: string[] = [];
  const topLinePos = 8;
  const bottomLinePos = 0;
  lines.push(`<rect x="0" y="0" width="${svgW}" height="${svgH}" fill="white" />`);

  for (let p = bottomLinePos; p <= topLinePos; p += 2) {
    const y = staffY(p, centerY);
    lines.push(`<line x1="0" y1="${y}" x2="${svgW}" y2="${y}" stroke="black" stroke-width="1.5" />`);
  }

  const clefY = getClefY(clef, centerY);
  const clefX = getClefX(clef, MARGIN_LEFT - 38);
  lines.push(`<text x="${clefX}" y="${clefY}" font-size="${CLEF_FONT_SIZE}" font-family="${CLEF_FONT}" fill="#28170b">${clefSymbols[clef]}</text>`);

  if (keySignature) {
    const sigPositions = keySignaturePositions[clef];
    const positions = keySignature.type === 'sharp' ? sigPositions.sharps : sigPositions.flats;
    const activePositions = positions.slice(0, keySignature.count);
    const startX = MARGIN_LEFT + 35;
    activePositions.forEach((pos, i) => {
      const x = startX + i * 16;
      const yOff = keySignature.type === 'sharp' ? SHARP_Y_OFFSET : FLAT_Y_OFFSET;
      const y = staffY(pos, centerY) + yOff;
      lines.push(`<text x="${x}" y="${y}" font-size="${ACCIDENTAL_FONT_SIZE}" font-family="${CLEF_FONT}">${keySignature.type === 'sharp' ? '\u266F' : '\u266D'}</text>`);
    });
  }

  if (note) {
    const noteX = MARGIN_LEFT + 180;
    const noteY = staffY(note.staffPosition, centerY);

    const minLine = -6;
    const maxLine = 14;
    if (note.staffPosition <= 0) {
      const startP = note.staffPosition % 2 === 0 ? note.staffPosition : note.staffPosition + 1;
      for (let p = startP; p < 0; p += 2) {
        if (p >= minLine) {
          const ly = staffY(p, centerY);
          lines.push(`<line x1="${noteX - NOTEHEAD_W}" y1="${ly}" x2="${noteX + NOTEHEAD_W}" y2="${ly}" stroke="black" stroke-width="1.5" />`);
        }
      }
    }
    if (note.staffPosition >= 8) {
      for (let p = 8; p <= note.staffPosition; p += 2) {
        if (p <= maxLine && p % 2 === 0) {
          const ly = staffY(p, centerY);
          lines.push(`<line x1="${noteX - NOTEHEAD_W}" y1="${ly}" x2="${noteX + NOTEHEAD_W}" y2="${ly}" stroke="black" stroke-width="1.5" />`);
        }
      }
    }

    if (accidental !== 0 && !keySignature) {
      const ax = noteX - 27;
      const yOff = accidental === 1 ? SHARP_Y_OFFSET : FLAT_Y_OFFSET;
      const ay = noteY + yOff;
      lines.push(`<text x="${ax}" y="${ay}" font-size="${ACCIDENTAL_FONT_SIZE}" font-family="${CLEF_FONT}">${getAccidentalSymbol(accidental)}</text>`);
    }

    lines.push(`<ellipse cx="${noteX}" cy="${noteY}" rx="${NOTEHEAD_W / 2}" ry="${NOTEHEAD_H / 2}" fill="none" stroke="black" stroke-width="2" />`);
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgW} ${svgH}">
    ${lines.join('\n    ')}
  </svg>`;
}

export function renderNoteSvgDataUri(clef: Clef, note: NotePosition | null, accidental: number, keySignature: KeySignature | null, width: number, height: number): string {
  const svg = renderStaffSvg(clef, note, accidental, keySignature, width, height);
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}
