import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useContent } from '../lib/lang';
import Weave from './Weave';
import './Hero.css';

export default function Hero() {
  const { profile, ui } = useContent();
  const t = ui.hero;
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
            {t.taglineBefore} <span className="hero__woven">{t.taglineWord}</span> {t.taglineAfter}
            <br />
            {t.taglineLine2}
          </p>

          <p className="hero__lead">{profile.lead}</p>

          <div className="hero__actions">
            <a href="#projects" className="btn btn--dark">{t.seeWork}</a>
            <a href={profile.cvPath} download={ui.cvFile} className="btn btn--light">{t.downloadCv}</a>
          </div>

          <div className="hero__socials">
            <a href={`mailto:${profile.email}`} aria-label="Email"><FaEnvelope /></a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>

        <figure className="hero__portrait">
          <div className="hero__arch">
            <img src={profile.photo} alt={`${t.portraitAlt} ${profile.name}`} width="640" height="640" fetchPriority="high" />
          </div>
          <figcaption className="hero__label">
            <span>{t.labelTop}</span>
            <strong>{t.labelMain}</strong>
            <span>{t.labelBottom}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
