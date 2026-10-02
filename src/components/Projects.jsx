import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../data/content';
import './Projects.css';

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <motion.div
          className="skills__head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Mes réalisations</span>
          <h2 className="section-title">
            Projets <span className="accent">récents</span>
          </h2>
          <p className="section-lead">
            Une sélection de projets qui illustrent ma façon de résoudre des problèmes concrets avec du code.
          </p>
        </motion.div>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <motion.article
              key={project.name}
              className="project-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div className="project-card__cover" style={{ background: project.gradient }}>
                <span className="project-card__cover-glyph">
                  {project.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                </span>
              </div>

              <div className="project-card__body">
                <span className="project-card__tag">{project.tag}</span>
                <h3 className="project-card__title">{project.name}</h3>
                <p className="project-card__desc">{project.description}</p>

                <div className="project-card__tech">
                  {project.tech.map((t) => (
                    <span key={t} className="project-card__tech-item">{t}</span>
                  ))}
                </div>

                <div className="project-card__links">
                  {project.github ? (
                    <a href={project.github} target="_blank" rel="noreferrer" className="project-card__link">
                      <FaGithub /> Code
                    </a>
                  ) : (
                    <span className="project-card__link project-card__link--disabled">
                      <FaGithub /> Bientôt disponible
                    </span>
                  )}
                  {project.demo ? (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="project-card__link">
                      <FaExternalLinkAlt /> Démo
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
