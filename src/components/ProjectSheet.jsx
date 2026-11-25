import { useEffect, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Shots from './Shots';
import Weave from './Weave';

// Fiche complète d'un projet, ouverte par-dessus l'atelier
export default function ProjectSheet({ project, index, total, labels, onClose, onMove }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onMove(1);
      if (e.key === 'ArrowLeft') onMove(-1);
    };
    window.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
      previous?.focus?.({ preventScroll: true });
    };
  }, [onClose, onMove]);

  return (
    <div className="sheet" role="presentation" onClick={onClose}>
      <article
        className="sheet__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        onClick={(e) => e.stopPropagation()}
        style={{ '--accent': project.colors[0] }}
      >
        <Weave seed={project.name} colors={project.colors} height={16} scale={3} className="sheet__weave" />
        <button ref={closeRef} type="button" className="sheet__close" onClick={onClose} aria-label={labels.close}>
          <FaTimes aria-hidden="true" />
        </button>

        <div className="sheet__grid">
          <div className="sheet__visual">
            {project.logo && <img className="sheet__logo" src={project.logo} alt="" />}
            <Shots images={project.images} />
          </div>

          <div className="sheet__body">
            <p className="sheet__num">
              {String(index + 1).padStart(2, '0')} <small>/ {String(total).padStart(2, '0')}</small>
            </p>
            <p className="sheet__tag">{project.tag}</p>
            <h3 id="sheet-title" className="sheet__name">{project.name}</h3>
            <p className="sheet__desc">{project.description}</p>
            <ul className="sheet__points">
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <ul className="sheet__tech" aria-label={labels.tech}>
              {project.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="sheet__links">
              <a href={project.github} target="_blank" rel="noreferrer" className="btn btn--dark">
                <FaGithub aria-hidden="true" /> {labels.code}
              </a>
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn--ocre">
                  <FaExternalLinkAlt aria-hidden="true" /> {labels.demo}
                </a>
              )}
            </div>
          </div>
        </div>

        <nav className="sheet__nav">
          <button type="button" onClick={() => onMove(-1)} disabled={index === 0}>
            <FaChevronLeft aria-hidden="true" /> {labels.prev}
          </button>
          <button type="button" onClick={() => onMove(1)} disabled={index === total - 1}>
            {labels.next} <FaChevronRight aria-hidden="true" />
          </button>
        </nav>
      </article>
    </div>
  );
}
