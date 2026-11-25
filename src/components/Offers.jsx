import { FaArrowRight, FaCheck } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';
import { useContent } from '../lib/lang';
import { projectSlug } from '../lib/slug';
import Reveal from './Reveal';
import Weave from './Weave';
import './Offers.css';

// « Travaillons ensemble » : les services proposés, la façon de travailler et le tarif
export default function Offers() {
  const { offers, projects } = useContent();
  const colorsOf = (name) => projects.find((p) => p.name === name)?.colors;

  return (
    <section id="offers" className="section offers">
      <div className="container">
        <Reveal className="offers__head">
          <div>
            <span className="kicker">{offers.kicker}</span>
            <h2 className="title">
              {offers.titleStart} <em>{offers.titleEm}</em>
              {offers.titleEnd}
            </h2>
          </div>
          <div className="offers__intro">
            <p className="offers__badge">
              <span className="offers__pulse" aria-hidden="true" /> {offers.available}
            </p>
            <p className="lead">{offers.lead}</p>
          </div>
        </Reveal>

        <ul className="offers__grid">
          {offers.items.map((item, i) => (
            <Reveal as="li" key={item.title} className="offer" delay={i * 90}>
              <Weave seed={`offre-${item.example}`} colors={colorsOf(item.example)} height={12} scale={3} />
              <div className="offer__body">
                <span className="offer__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul className="offer__points">
                  {item.points.map((point) => (
                    <li key={point}>
                      <FaCheck aria-hidden="true" /> {point}
                    </li>
                  ))}
                </ul>
                <a className="offer__example" href={`#${projectSlug(item.example)}`}>
                  {offers.exampleLabel} {item.example} <FaArrowRight aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="offers__process">
          <h3>{offers.stepsTitle}</h3>
          <ol>
            {offers.steps.map((step, i) => (
              <li key={step.title}>
                <span className="offers__knot" aria-hidden="true">{i + 1}</span>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="offers__cta">
          <p className="offers__rate">{offers.rate}</p>
          <div className="offers__actions">
            <a href="#contact" className="btn btn--dark">
              {offers.contactLabel} <FaArrowRight aria-hidden="true" />
            </a>
            {offers.upwork && (
              <a href={offers.upwork} target="_blank" rel="noreferrer" className="btn btn--light">
                <SiUpwork aria-hidden="true" /> {offers.upworkLabel}
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
