import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCheck } from 'react-icons/fa';
import { projects, projectFilters } from '../data/content';
import './Projects.css';

function Shots({ images, max = 2 }) {
  const shown = images.slice(0, max);
  if (shown[0]?.kind === 'desktop') {
    const img = shown[0];
    return (
      <div className="browser">
        <div className="browser__bar"><span /><span /><span /></div>
        <img src={img.src} alt={img.alt} loading="lazy" />
      </div>
    );
  }
  return (
    <div className="phones">
      {shown.map((img) => (
        <div key={img.src} className="phone">
          <img src={img.src} alt={img.alt} loading="lazy" />
        </div>
      ))}
    </div>
  );
}

function Links({ project }) {
  return (
    <div className="project-card__links">
      {project.github ? (
        <a href={project.github} target="_blank" rel="noreferrer" className="project-card__link">
          <FaGithub /> Code source
        </a>
      ) : (
        <span className="project-card__link project-card__link--disabled">
          <FaGithub /> Bientôt disponible
        </span>
      )}
      {project.demo && (
        <a href={project.demo} target="_blank" rel="noreferrer" className="project-card__link">
          <FaExternalLinkAlt /> Démo
        </a>
      )}
    </div>
  );
}

function Tech({ items }) {
  return (
    <div className="project-card__tech">
      {items.map((t) => (
        <span key={t} className="project-card__tech-item">{t}</span>
      ))}
    </div>
  );
}

function Featured({ project }) {
  return (
    <motion.article
      className="featured"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7 }}
    >
      <div className="featured__body">
        <img className="featured__logo" src={project.logo} alt={`Logo ${project.name}`} loading="lazy" />
        <span className="project-card__tag">{project.tag}</span>
        <h3 className="featured__title">{project.name}</h3>
        <p className="project-card__desc">{project.description}</p>
        <ul className="highlights">
          {project.highlights.map((h) => (
            <li key={h}><FaCheck /> {h}</li>
          ))}
        </ul>
        <Tech items={project.tech} />
        <Links project={project} />
      </div>
      <div className="featured__visual">
        <Shots images={project.images} />
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const featured = projects.find((p) => p.featured);
  const visible = projects.filter(
    (p) => !p.featured && (filter === 'all' || p.categories.includes(filter))
  );
  const showFeatured = featured && (filter === 'all' || featured.categories.includes(filter));

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
            Projets <span className="accent">sélectionnés</span>
          </h2>
          <p className="section-lead">
            Des applications complètes, testées et documentées, du back-end au mobile.
          </p>
        </motion.div>

        <div className="filters" role="tablist" aria-label="Filtrer les projets">
          {projectFilters.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              className={`filters__btn ${filter === f.id ? 'filters__btn--active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {showFeatured && <Featured project={featured} />}

        <motion.div layout className="projects__grid">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.article
                layout
                key={project.name}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
              >
                <div className={`project-card__cover project-card__cover--${project.images[0].kind}`}>
                  <Shots images={project.images} />
                </div>

                <div className="project-card__body">
                  <span className="project-card__tag">{project.tag}</span>
                  <h3 className="project-card__title">{project.name}</h3>
                  <p className="project-card__desc">{project.description}</p>
                  <ul className="highlights highlights--compact">
                    {project.highlights.map((h) => (
                      <li key={h}><FaCheck /> {h}</li>
                    ))}
                  </ul>
                  <Tech items={project.tech} />
                  <Links project={project} />
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
