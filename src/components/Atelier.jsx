import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { FaGithub, FaArrowDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { projects, atelier } from '../data/content';
import { timeline, STOPS, SNAP_ZONE, nearestStop } from './atelierTimeline';
import { projectSlug } from '../lib/slug';
import './Atelier.css';

// three.js ne se télécharge que lorsque le visiteur approche de l'atelier
const AtelierScene = lazy(() => import('./AtelierScene'));

function canRun3D() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function Atelier() {
  const [enabled] = useState(canRun3D);
  const sectionRef = useRef(null);
  const progressRef = useRef(0);
  const [near, setNear] = useState(false);
  const [active, setActive] = useState(false);
  const [view, setView] = useState({ phase: 'intro', active: -1 });

  // Charge la scène un peu avant l'arrivée, et ne l'anime que lorsqu'elle est à l'écran
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || !enabled) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: '600px 0px' }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [enabled]);

  // Convertit une position de l'atelier (0 → 1) en position de page
  const scrollToProgress = (p) => {
    const node = sectionRef.current;
    if (!node) return;
    const top = node.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + p * (node.offsetHeight - window.innerHeight), behavior: 'smooth' });
  };

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || !enabled) return undefined;
    let snapTimer = 0;
    let touching = false;

    const readProgress = () => {
      const rect = node.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      return span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
    };

    // Quand le visiteur s'arrête entre deux projets, la caméra se pose sur le plus proche
    const snap = () => {
      if (touching) return;
      const p = readProgress();
      if (p < SNAP_ZONE[0] || p > SNAP_ZONE[1]) return;
      const target = STOPS[nearestStop(p)];
      const px = Math.abs(target - p) * (node.offsetHeight - window.innerHeight);
      if (px > 4) scrollToProgress(target);
    };

    const onScroll = () => {
      const p = readProgress();
      progressRef.current = p;
      const tl = timeline(p);
      setView((prev) => (prev.phase === tl.phase && prev.active === tl.active ? prev : { phase: tl.phase, active: tl.active }));
      window.clearTimeout(snapTimer);
      snapTimer = window.setTimeout(snap, 180);
    };
    const onTouchStart = () => {
      touching = true;
    };
    const onTouchEnd = () => {
      touching = false;
      window.clearTimeout(snapTimer);
      snapTimer = window.setTimeout(snap, 260);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.clearTimeout(snapTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [enabled]);

  // Flèches gauche / droite : projet précédent / suivant, seulement quand l'atelier occupe l'écran
  useEffect(() => {
    if (!enabled) return undefined;
    const onKey = (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      if (e.target.closest?.('input, textarea, select, [contenteditable]')) return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect || rect.top > 1 || rect.bottom < window.innerHeight - 1) return;
      e.preventDefault();
      step(e.key === 'ArrowRight' ? 1 : -1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!enabled) return null;

  // Avance ou recule d'un arrêt ; depuis l'entrée, « suivant » mène au premier projet
  function step(dir) {
    const p = progressRef.current;
    const here = nearestStop(p);
    let next;
    if (p < STOPS[0] - 0.01) next = dir > 0 ? 0 : -1;
    else next = here + dir;
    if (next < 0) return;
    if (next >= STOPS.length) {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    scrollToProgress(STOPS[next]);
  }

  const goTo = (k) => scrollToProgress(STOPS[k]);
  const skip = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

  const project = view.active >= 0 ? projects[view.active] : null;

  return (
    <section id="atelier" ref={sectionRef} className="atelier" aria-label={atelier.label}>
      <div className="atelier__sticky">
        {near && (
          <Suspense fallback={<div className="atelier__loading">{atelier.loading}</div>}>
            <AtelierScene progressRef={progressRef} active={active} />
          </Suspense>
        )}
        <div className="atelier__vignette" aria-hidden="true" />

        <div className={`atelier__intro ${view.phase === 'intro' ? 'is-on' : ''}`}>
          <span className="kicker atelier__kicker">{atelier.kicker}</span>
          <h2 className="title atelier__title">
            {atelier.titleStart} <em>{atelier.titleEm}</em>
          </h2>
          <p className="atelier__hint">
            <FaArrowDown aria-hidden="true" /> {atelier.hint}
          </p>
        </div>

        {projects.map((p, k) => (
          <article
            key={p.name}
            className={`atelier__card ${project === p ? 'is-on' : ''}`}
            aria-hidden={project !== p}
            style={{ '--accent': p.colors[0] }}
          >
            <span className="atelier__num">
              {String(k + 1).padStart(2, '0')} <small>/ {String(projects.length).padStart(2, '0')}</small>
            </span>
            <p className="atelier__tag">{p.tag}</p>
            <h3 className="atelier__name">{p.name}</h3>
            <p className="atelier__desc">{p.description}</p>
            <ul className="atelier__tech">
              {p.tech.slice(0, 5).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="atelier__links">
              <a href={`#${projectSlug(p.name)}`} className="btn btn--ocre" tabIndex={project === p ? 0 : -1}>
                {atelier.details}
              </a>
              <a href={p.github} target="_blank" rel="noreferrer" className="btn atelier__ghost" tabIndex={project === p ? 0 : -1}>
                <FaGithub /> {atelier.code}
              </a>
            </div>
          </article>
        ))}

        <div className={`atelier__outro ${view.phase === 'outro' ? 'is-on' : ''}`} aria-hidden={view.phase !== 'outro'}>
          <h2 className="title atelier__title">
            {atelier.outroStart} <em>{atelier.outroEm}</em> {atelier.outroEnd}
          </h2>
          <a href="#contact" className="btn btn--ocre" tabIndex={view.phase === 'outro' ? 0 : -1}>
            {atelier.cta}
          </a>
        </div>

        <div className="atelier__controls">
          <button type="button" onClick={() => step(-1)} aria-label={atelier.prev} disabled={view.phase === 'intro'}>
            <FaChevronLeft aria-hidden="true" />
          </button>
          <span className="atelier__count" aria-live="polite">
            {view.phase === 'intro' ? atelier.start : view.phase === 'outro' ? atelier.end : view.active >= 0 ? `${view.active + 1} / ${projects.length}` : '·'}
          </span>
          <button type="button" onClick={() => step(1)} aria-label={atelier.next}>
            <FaChevronRight aria-hidden="true" />
          </button>
          <button type="button" className="atelier__skip" onClick={skip}>
            {atelier.skip} <FaArrowDown aria-hidden="true" />
          </button>
        </div>

        <nav className="atelier__dots" aria-label={atelier.dotsLabel}>
          {projects.map((p, k) => (
            <button
              key={p.name}
              type="button"
              className={view.active === k ? 'is-on' : ''}
              aria-label={p.name}
              aria-current={view.active === k}
              onClick={() => goTo(k)}
            />
          ))}
        </nav>
      </div>
    </section>
  );
}
