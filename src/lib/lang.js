import { createContext, useContext } from 'react';
import * as fr from '../data/content';
import * as en from '../data/content.en';

// Deux langues : tout le texte du site vient de content.js (français) ou content.en.js (anglais)
export const CONTENTS = { fr, en };
export const LangContext = createContext({ lang: 'fr', setLang: () => {}, content: fr });

export const useLang = () => useContext(LangContext);
export const useContent = () => useContext(LangContext).content;
