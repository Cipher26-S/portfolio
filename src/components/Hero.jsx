import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown, FaDownload } from 'react-icons/fa';
import { profile } from '../data/content';
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <motion.p
          className="pill hero__badge"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="hero__dot" /> Disponible pour de nouveaux projets
        </motion.p>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Bonjour, je suis <span className="gradient-text">{profile.name}</span>
        </motion.h1>

        <motion.h2
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {profile.title}
          <span className="hero__stack"> — {profile.subtitle}</span>
        </motion.h2>

        <motion.p
          className="hero__lead"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Je conçois des applications web et mobiles modernes, performantes et
          pensées pour avoir un impact réel — du Burkina Faso pour le monde.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <a href="#projects" className="btn btn-primary">
            Voir mes projets
          </a>
          <a href={profile.cvPath} download className="btn btn-ghost">
            <FaDownload /> Télécharger mon CV
          </a>
        </motion.div>

        <motion.div
          className="hero__socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
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

      <a href="#about" className="hero__scroll" aria-label="Défiler vers le bas">
        <FaArrowDown />
      </a>
    </section>
  );
}
