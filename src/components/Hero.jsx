import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { profile } from '../data/content';
import Weave from './Weave';
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <Weave seed="hero-salif" height={22} />

      <div className="container hero__inner">
        <div className="hero__text">
          <p className="hero__meta">
            <span>{profile.title}</span>
            <span className="hero__dot" aria-hidden="true" />
            <span><FaMapMarkerAlt aria-hidden="true" /> {profile.location}</span>
          </p>

          <h1 className="hero__name">
            <span className="hero__line">Salif</span>
            <span className="hero__line hero__line--outline">Sawadogo</span>
          </h1>

          <p className="hero__tagline">
            Je <span className="hero__woven">tisse</span> du code
            <br />
            qui sert les gens.
          </p>

          <p className="hero__lead">{profile.lead}</p>

          <div className="hero__actions">
            <a href="#projects" className="btn btn--dark">Voir les réalisations</a>
            <a href={profile.cvPath} download="CV-Sawadogo-Salif.pdf" className="btn btn--light">Télécharger le CV</a>
          </div>

          <div className="hero__socials">
            <a href={`mailto:${profile.email}`} aria-label="Email"><FaEnvelope /></a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>

        <figure className="hero__portrait">
          <div className="hero__arch">
            <img src={profile.photo} alt={`Portrait de ${profile.name}`} width="640" height="640" fetchPriority="high" />
          </div>
          <figcaption className="hero__label">
            <span>Diplômé</span>
            <strong>Licence en Informatique</strong>
            <span>BIT · 2026</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
