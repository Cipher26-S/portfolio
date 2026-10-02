import { skills } from '../data/content';
import Reveal from './Reveal';
import './Skills.css';

const COLORS = ['var(--indigo)', 'var(--terre)', 'var(--vert)', 'var(--encre)'];

export default function Skills() {
  const all = skills.flatMap((group) => group.items);

  return (
    <section id="skills" className="skills">
      {/* Ruban qui défile : deux copies pour une boucle sans couture */}
      <div className="ribbon" aria-hidden="true">
        <div className="ribbon__track">
          {[0, 1].map((copy) => (
            <span key={copy} className="ribbon__run">
              {all.map((item) => (
                <span key={`${copy}-${item}`}>{item}<i>✦</i></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="container section skills__inner">
        <Reveal>
          <span className="kicker">Les fils de mon métier</span>
          <h2 className="title">Ce que je sais <em>assembler</em>.</h2>
        </Reveal>

        <div className="skills__grid">
          {skills.map((group, i) => (
            <Reveal key={group.category} className="skills__card" delay={i * 90} style={{ '--thread': COLORS[i % COLORS.length] }}>
              <h3>{group.category}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
