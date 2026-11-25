import { useEffect, useMemo, useState } from 'react';
import { CONTENTS, LangContext } from './lib/lang';

// ?lang=en dans l'adresse (pratique pour un lien Upwork), puis le dernier choix, puis la langue du navigateur
function initialLang() {
  if (typeof window === 'undefined') return 'fr';
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (fromUrl === 'fr' || fromUrl === 'en') return fromUrl;
  try {
    const saved = window.localStorage.getItem('lang');
    if (saved === 'fr' || saved === 'en') return saved;
  } catch {
    // stockage indisponible : on continue
  }
  const browser = (navigator.languages?.[0] || navigator.language || 'fr').toLowerCase();
  return browser.startsWith('fr') ? 'fr' : browser.startsWith('en') ? 'en' : 'fr';
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = CONTENTS[lang].meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', CONTENTS[lang].meta.description);
    try {
      window.localStorage.setItem('lang', lang);
    } catch {
      // stockage indisponible : le choix vaut pour la visite en cours
    }
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, content: CONTENTS[lang] }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
