import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown, FaDownload, FaMapMarkerAlt } from 'react-icons/fa';
import { profile } from '../data/content';
import './Hero.css';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
});

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <div className="hero__text">
          <motion.p className="pill hero__badge" {...fadeUp(0)}>
            <span className="hero__dot" /> {profile.availability}
          </motion.p>

          <motion.h1 className="hero__title" {...fadeUp(0.1)}>
            Bonjour, je suis <span className="gradient-text">{profile.shortName}</span>
          </motion.h1>

          <motion.h2 className="hero__subtitle" {...fadeUp(0.2)}>
            {profile.title}
            <span className="hero__stack">{profile.subtitle}</span>
          </motion.h2>

          <motion.p className="hero__lead" {...fadeUp(0.3)}>
            {profile.lead}
          </motion.p>

          <motion.div className="hero__actions" {...fadeUp(0.4)}>
            <a href="#projects" className="btn btn-primary">
              Voir mes projets
            </a>
            <a href={profile.cvPath} download="CV-Sawadogo-Salif.pdf" className="btn btn-ghost">
              <FaDownload /> Télécharger mon CV
            </a>
          </motion.div>

          <motion.div className="hero__socials" {...fadeUp(0.55)}>
            <a href={`mailto:${profile.email}`} className="hero__social-link" aria-label="Email">
              <FaEnvelope />
            </a>
            <a href={profile.github} className="hero__social-link" aria-label="GitHub" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            {profile.linkedin && (
              <a href={profile.linkedin} className="hero__social-link" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          className="hero__portrait"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="hero__photo-frame">
            <img src={profile.photo} alt={`Portrait de ${profile.name}`} width="640" height="640" />
          </div>
          <div className="hero__location pill">
            <FaMapMarkerAlt /> {profile.location}
          </div>
        </motion.div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Défiler vers le bas">
        <FaArrowDown />
      </a>
    </section>
  );
}
