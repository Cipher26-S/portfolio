import { useEffect, useState } from 'react';
import { navLinks, profile } from '../data/content';
import './Nav.css';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  // Le fil de progression : il « descend » le long de la page au fil de la lecture
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div className="thread" aria-hidden="true">
        <div className="thread__fill" style={{ transform: `scaleY(${progress})` }} />
        <div className="thread__needle" style={{ top: `${progress * 100}%` }} />
      </div>

      <header className="nav">
        <div className="container nav__inner">
          <a href="#home" className="nav__logo" onClick={() => setOpen(false)}>
            <span className="nav__mark" aria-hidden="true" />
            <span>Salif<b>.</b></span>
          </a>

          <nav id="menu" className={`nav__links ${open ? 'nav__links--open' : ''}`} aria-label="Navigation principale">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href={profile.cvPath} download="CV-Sawadogo-Salif.pdf" className="btn btn--dark nav__cv">
              CV
            </a>
          </nav>

          <button
            className={`nav__toggle ${open ? 'nav__toggle--open' : ''}`}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
    </>
  );
}
