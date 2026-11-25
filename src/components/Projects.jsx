import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useContent } from '../lib/lang';
import Reveal from './Reveal';
import Weave from './Weave';
import { projectSlug } from '../lib/slug';
import './Projects.css';

function Shots({ images }) {
  if (images[0].kind === 'desktop') {
    return (
      <div className="shot-browser">
        <div className="shot-browser__bar"><span /><span /><span /></div>
        <img src={images[0].src} alt={images[0].alt} loading="lazy" />
      </div>
    );
  }
  return (
    <div className="shot-phones">
      {images.slice(0, 2).map((img) => (
        <div key={img.src} className="shot-phone">
          <img src={img.src} alt={img.alt} loading="lazy" />
        </div>
      ))}
    </div>
  );
}

function Project({ project, index, t }) {
  return (
    <Reveal as="article" id={projectSlug(project.name)} className={`work ${index % 2 ? 'work--flip' : ''}`}>
      <div className="work__visual">
        <Weave seed={project.name} colors={project.colors} height={16} scale={3} className="work__weave" />
        <div className="work__stage" style={{ '--accent': project.colors[0] }}>
          {project.logo && <img className="work__logo" src={project.logo} alt={`${t.logoAlt} ${project.name}`} loading="lazy" />}
          <Shots images={project.images} />
        </div>
      </div>

      <div className="work__body">
        <span className="work__num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <p className="work__tag">{project.tag}</p>
        <h3 className="work__title">{project.name}</h3>
        <p className="work__desc">{project.description}</p>
        <ul className="work__points">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <ul className="work__tech" aria-label={t.techLabel}>
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="work__links">
          <a href={project.github} target="_blank" rel="noreferrer" className="btn btn--light">
            <FaGithub /> {t.code}
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn--ocre">
              <FaExternalLinkAlt /> {t.demo}
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  const { projects, projectFilters, ui } = useContent();
  const t = ui.projects;
  const [filter, setFilter] = useState('all');
  const visible = projects.filter((p) => filter === 'all' || p.categories.includes(filter));

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <Reveal className="projects__head">
          <div>
            <span className="kicker">{t.kicker}</span>
            <h2 className="title">{t.titleStart} <em>{t.titleEm}</em> {t.titleEnd}</h2>
          </div>
          <div className="projects__filters" role="group" aria-label={t.filtersLabel}>
            {projectFilters.map((f) => (
              <button
                key={f.id}
                aria-pressed={filter === f.id}
                className={filter === f.id ? 'is-active' : ''}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="projects__list">
          {visible.map((project) => (
            <Project key={project.name} project={project} index={projects.indexOf(project)} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
