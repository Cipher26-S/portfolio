// Motifs inspirés du Faso Dan Fani : bandes de largeurs variées et fines rayures,
// générés de façon déterministe à partir d'une graine (un prénom, un nom de projet…).

export const PALETTE = {
  indigo: '#1d2a5e',
  nuit: '#121a40',
  ocre: '#d9922b',
  terre: '#b8432a',
  vert: '#2f6b4f',
  creme: '#f4ead8',
  sable: '#e7d6b8',
  encre: '#1c1712',
};

export const DEFAULT_COLORS = [PALETTE.indigo, PALETTE.ocre, PALETTE.terre, PALETTE.vert, PALETTE.creme, PALETTE.nuit];

// Hachage FNV-1a : une même chaîne donne toujours le même motif
export function hashString(text) {
  let h = 2166136261;
  for (const ch of String(text).toLowerCase().trim()) {
    h ^= ch.codePointAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Générateur pseudo-aléatoire reproductible (mulberry32)
function random(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Une « répétition » de bandes : larges aplats ponctués de fines rayures, en miroir comme sur le pagne
export function makeStripes(seed, colors = DEFAULT_COLORS, count = 9) {
  const rnd = random(typeof seed === 'number' ? seed : hashString(seed));
  const pick = () => colors[Math.floor(rnd() * colors.length)];
  const half = [];
  let previous = null;
  for (let i = 0; i < count; i += 1) {
    let color = pick();
    if (color === previous) color = colors[(colors.indexOf(color) + 1) % colors.length];
    previous = color;
    const thin = rnd() < 0.45;
    half.push({ color, width: thin ? 1 + Math.floor(rnd() * 2) : 4 + Math.floor(rnd() * 9) });
  }
  return [...half, ...half.slice(0, -1).reverse()];
}

// Convertit les bandes en dégradé CSS répétable (en pixels)
export function stripesToGradient(stripes, angle = 90, scale = 4) {
  let pos = 0;
  const stops = stripes.map(({ color, width }) => {
    const start = pos;
    pos += width * scale;
    return `${color} ${start}px ${pos}px`;
  });
  return { background: `repeating-linear-gradient(${angle}deg, ${stops.join(', ')})`, period: pos };
}

// Dessine un pagne comme sur un métier traditionnel : des bandes étroites tissées
// (rayures verticales de la chaîne) coupées de blocs de trame, puis cousues côte à côte,
// chaque bande décalée de la suivante — ce qui donne le damier typique du Faso Dan Fani.
export function drawPagne(canvas, seed, colors = DEFAULT_COLORS) {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  const rnd = random(hashString(`${seed}~bandes`));
  const warp = makeStripes(seed, colors, 7);
  const weft = makeStripes(`${seed}~trame`, colors, 5);

  const strips = 4 + Math.floor(rnd() * 2); // 4 ou 5 bandes cousues
  const stripW = width / strips;
  const rows = 5 + Math.floor(rnd() * 3); // blocs le long de chaque bande
  const rowH = height / rows;
  const warpTotal = warp.reduce((sum, st) => sum + st.width, 0);
  const weftTotal = weft.reduce((sum, st) => sum + st.width, 0);

  for (let i = 0; i < strips; i += 1) {
    const x0 = i * stripW;
    for (let r = 0; r < rows; r += 1) {
      const y0 = r * rowH;
      if ((r + i) % 2 === 0) {
        // Bloc de chaîne : rayures verticales qui remplissent la largeur de la bande
        let x = x0;
        for (const st of warp) {
          const w = (st.width / warpTotal) * stripW;
          ctx.fillStyle = st.color;
          ctx.fillRect(x, y0, w + 0.5, rowH + 0.5);
          x += w;
        }
      } else {
        // Bloc de trame : rayures horizontales, plus denses
        const repeats = 2;
        let y = y0;
        for (let k = 0; k < repeats; k += 1) {
          for (const st of weft) {
            const h = (st.width / weftTotal) * (rowH / repeats);
            ctx.fillStyle = st.color;
            ctx.fillRect(x0, y, stripW + 0.5, h + 0.5);
            y += h;
          }
        }
      }
    }
  }

  // Grain du tissage : fils clairs et sombres alternés
  for (let y = 0; y < height; y += 3) {
    ctx.fillStyle = (y / 3) % 2 ? 'rgba(0,0,0,0.09)' : 'rgba(255,255,255,0.06)';
    ctx.fillRect(0, y, width, 1);
  }

  // Coutures entre les bandes : un trait sombre et des points de fil
  for (let i = 1; i < strips; i += 1) {
    const x = Math.round(i * stripW);
    ctx.fillStyle = 'rgba(28,23,18,0.55)';
    ctx.fillRect(x - 1, 0, 2, height);
    ctx.fillStyle = 'rgba(244,234,216,0.75)';
    for (let y = 4; y < height; y += 14) ctx.fillRect(x - 3, y, 6, 2);
  }
}
