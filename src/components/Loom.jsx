import { useEffect, useRef, useState } from 'react';
import { FaDownload, FaRandom } from 'react-icons/fa';
import { drawPagne, PALETTE } from '../lib/weave';
import Reveal from './Reveal';
import './Loom.css';

const SUGGESTIONS = ['Awa', 'Moussa', 'Mamie Rasmata', 'Papa Issa', 'Koudougou'];

// Palettes inspirées des pagnes : chacune donne une ambiance différente
const PALETTES = [
  { name: 'Indigo', colors: [PALETTE.indigo, PALETTE.ocre, PALETTE.terre, PALETTE.creme, PALETTE.nuit] },
  { name: 'Terre', colors: [PALETTE.terre, PALETTE.encre, PALETTE.ocre, PALETTE.sable, PALETTE.vert] },
  { name: 'Karité', colors: [PALETTE.vert, PALETTE.ocre, PALETTE.creme, PALETTE.encre, PALETTE.terre] },
  { name: 'Nuit', colors: [PALETTE.nuit, PALETTE.indigo, PALETTE.ocre, PALETTE.sable, PALETTE.terre] },
];

export default function Loom() {
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
    const slug = (name.trim() || 'pagne').toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '-');
    link.download = `pagne-${slug}.png`;
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
          <span className="kicker kicker--light">Le métier à tisser</span>
          <h2 className="title">Tissez <em>votre</em> pagne.</h2>
          <p className="loom__lead">
            Écrivez un prénom — le vôtre, celui de votre mère, de votre grand-père, de votre enfant.
            Le code le transforme en un motif unique, inspiré du Faso Dan Fani. Le même prénom donne
            toujours le même pagne.
          </p>

          <label className="loom__field">
            <span>Un prénom</span>
            <input
              value={name}
              maxLength={40}
              onChange={(e) => setName(e.target.value)}
              placeholder="Écrivez un prénom…"
              autoComplete="off"
            />
          </label>

          <fieldset className="loom__palettes">
            <legend>Couleurs</legend>
            {PALETTES.map((p, i) => (
              <button
                key={p.name}
                type="button"
                aria-pressed={palette === i}
                className={palette === i ? 'is-active' : ''}
                onClick={() => setPalette(i)}
              >
                <span className="loom__swatch" style={{ background: `linear-gradient(90deg, ${p.colors.join(', ')})` }} />
                {p.name}
              </button>
            ))}
          </fieldset>

          <div className="loom__actions">
            <button type="button" className="btn btn--ocre" onClick={download}>
              <FaDownload /> Télécharger mon pagne
            </button>
            <button type="button" className="btn btn--light" onClick={surprise}>
              <FaRandom /> Surprenez-moi
            </button>
          </div>
        </Reveal>

        <Reveal className="loom__frame" delay={150}>
          <canvas
            ref={canvasRef}
            width="640"
            height="800"
            role="img"
            aria-label={`Pagne tissé pour ${name || 'Salif'}`}
          />
          <p className="loom__caption">Pagne de <strong>{name.trim() || 'Salif'}</strong></p>
        </Reveal>
      </div>
    </section>
  );
}
