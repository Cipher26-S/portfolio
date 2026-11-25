import { useEffect, useRef, useState } from 'react';
import { FaDownload, FaRandom } from 'react-icons/fa';
import { drawPagne, PALETTE } from '../lib/weave';
import Reveal from './Reveal';
import { useContent } from '../lib/lang';
import './Loom.css';

const SUGGESTIONS = ['Awa', 'Moussa', 'Mamie Rasmata', 'Papa Issa', 'Koudougou'];

// Palettes inspirées des pagnes : chacune donne une ambiance différente
const PALETTES = [
  { name: 'indigo', colors: [PALETTE.indigo, PALETTE.ocre, PALETTE.terre, PALETTE.creme, PALETTE.nuit] },
  { name: 'terre', colors: [PALETTE.terre, PALETTE.encre, PALETTE.ocre, PALETTE.sable, PALETTE.vert] },
  { name: 'karite', colors: [PALETTE.vert, PALETTE.ocre, PALETTE.creme, PALETTE.encre, PALETTE.terre] },
  { name: 'nuit', colors: [PALETTE.nuit, PALETTE.indigo, PALETTE.ocre, PALETTE.sable, PALETTE.terre] },
];

export default function Loom() {
  const { ui } = useContent();
  const t = ui.loom;
  const canvasRef = useRef(null);
  const [name, setName] = useState('Salif');
  const [palette, setPalette] = useState(0);

  // Le même prénom donne toujours le même pagne
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawPagne(canvas, name.trim() || 'Salif', PALETTES[palette].colors);
  }, [name, palette]);

  const download = () => {
    const link = document.createElement('a');
    const slug = (name.trim() || t.fileName).toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '-');
    link.download = `${t.fileName}-${slug}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const surprise = () => {
    setName(SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)]);
    setPalette(Math.floor(Math.random() * PALETTES.length));
  };

  return (
    <section id="loom" className="section loom">
      <div className="container loom__inner">
        <Reveal className="loom__text">
          <span className="kicker kicker--light">{t.kicker}</span>
          <h2 className="title">{t.titleStart} <em>{t.titleEm}</em> {t.titleEnd}</h2>
          <p className="loom__lead">{t.lead}</p>

          <label className="loom__field">
            <span>{t.field}</span>
            <input
              value={name}
              maxLength={40}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.placeholder}
              autoComplete="off"
            />
          </label>

          <fieldset className="loom__palettes">
            <legend>{t.colors}</legend>
            {PALETTES.map((p, i) => (
              <button
                key={p.name}
                type="button"
                aria-pressed={palette === i}
                className={palette === i ? 'is-active' : ''}
                onClick={() => setPalette(i)}
              >
                <span className="loom__swatch" style={{ background: `linear-gradient(90deg, ${p.colors.join(', ')})` }} />
                {t.palettes[i]}
              </button>
            ))}
          </fieldset>

          <div className="loom__actions">
            <button type="button" className="btn btn--ocre" onClick={download}>
              <FaDownload /> {t.download}
            </button>
            <button type="button" className="btn btn--light" onClick={surprise}>
              <FaRandom /> {t.surprise}
            </button>
          </div>
        </Reveal>

        <Reveal className="loom__frame" delay={150}>
          <canvas
            ref={canvasRef}
            width="640"
            height="800"
            role="img"
            aria-label={`${t.ariaFor} ${name || 'Salif'}`}
          />
          <p className="loom__caption">{t.caption} <strong>{name.trim() || 'Salif'}</strong></p>
        </Reveal>
      </div>
    </section>
  );
}
