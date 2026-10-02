import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { education, experience } from '../data/content';
import Reveal from './Reveal';
import './Journey.css';

const entries = [
  ...experience.map((e) => ({ ...e, kind: 'Expérience', icon: FaBriefcase })),
  ...education.map((e) => ({ ...e, kind: 'Formation', icon: FaGraduationCap })),
];

export default function Journey() {
  return (
    <section id="journey" className="section journey">
      <div className="container">
        <Reveal>
          <span className="kicker">Parcours</span>
          <h2 className="title">Le fil, <em>nœud après nœud</em>.</h2>
        </Reveal>

        <ol className="journey__list">
          {entries.map(({ icon: Icon, ...item }, i) => (
            <Reveal as="li" key={item.title} className="journey__item" delay={i * 100}>
              <span className="journey__knot" aria-hidden="true"><Icon /></span>
              <div className="journey__card">
                <p className="journey__meta">
                  <span className="journey__kind">{item.kind}</span>
                  <span>{item.period}</span>
                </p>
                <h3>{item.title}</h3>
                <p className="journey__place">{item.place}</p>
                <p className="journey__desc">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
