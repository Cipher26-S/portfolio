import { useEffect, useState } from 'react';
import { useLang } from '../lib/lang';
import './Nav.css';

export default function Nav() {
  const { lang, setLang, content } = useLang();
  const { navLinks, profile, ui } = content;
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState('');

  // Souligne dans le menu la section en cours de lecture
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, [navLinks]);

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

          <nav id="menu" className={`nav__links ${open ? 'nav__links--open' : ''}`} aria-label={ui.navLabel}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={current === link.href.slice(1) ? 'true' : undefined}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              className="nav__lang"
              lang={lang === 'fr' ? 'en' : 'fr'}
              aria-label={ui.langSwitchLabel}
              onClick={() => {
                setLang(lang === 'fr' ? 'en' : 'fr');
                setOpen(false);
              }}
            >
              {ui.langSwitch}
            </button>
            <a href={profile.cvPath} download={ui.cvFile} className="btn btn--dark nav__cv">
              {ui.cv}
            </a>
          </nav>

          <button
            className={`nav__toggle ${open ? 'nav__toggle--open' : ''}`}
            aria-label={open ? ui.menuClose : ui.menuOpen}
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
