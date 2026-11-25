import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { useContent } from '../lib/lang';
import Reveal from './Reveal';
import './Journey.css';

export default function Journey() {
  const { education, experience, ui } = useContent();
  const t = ui.journey;
  const entries = [
    ...experience.map((e) => ({ ...e, kind: t.experience, icon: FaBriefcase })),
    ...education.map((e) => ({ ...e, kind: t.education, icon: FaGraduationCap })),
  ];
  return (
    <section id="journey" className="section journey">
      <div className="container">
        <Reveal>
          <span className="kicker">{t.kicker}</span>
          <h2 className="title">{t.titleStart} <em>{t.titleEm}</em>{t.titleEnd}</h2>
        </Reveal>

        <ol className="journey__list">
          {entries.map(({ icon: Icon, ...item }, i) => (
            <Reveal as="li" key={item.period} className="journey__item" delay={i * 100}>
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
