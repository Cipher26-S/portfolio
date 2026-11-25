import { useContent } from '../lib/lang';
import Reveal from './Reveal';
import Weave from './Weave';
import './About.css';

export default function About() {
  const { profile, services, ui } = useContent();
  const t = ui.about;
  return (
    <section id="about" className="about">
      <div className="container about__inner section">
        <Reveal className="about__intro">
          <span className="kicker kicker--light">{t.kicker}</span>
          <h2 className="title">{t.titleStart} <em>{t.titleEm}</em>{t.titleEnd}</h2>
        </Reveal>

        <div className="about__grid">
          <Reveal className="about__bio" delay={100}>
            <p>{profile.bio}</p>

            <ul className="about__stats">
              {profile.stats.map((stat) => (
                <li key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="dl" className="about__tag" delay={200}>
            <div className="about__tag-hole" aria-hidden="true" />
            {profile.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </Reveal>
        </div>

        <ul className="about__services">
          {services.map((service, i) => (
            <Reveal as="li" key={service.title} delay={i * 90}>
              <span className="about__service-num">0{i + 1}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
      <Weave seed="about-indigo" height={18} />
    </section>
  );
}
