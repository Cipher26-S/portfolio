// Déroulé de l'atelier en fonction du défilement (0 → 1), partagé par la scène 3D et le texte.
// 0 → DESCENT_END : descente dans le puits de pagnes
// puis un segment par projet : il se décroche du mur, reste, retourne au mur, la caméra tourne
// enfin : le cadre vide « Votre projet ici »

import { projects } from '../data/content';

export const SLOTS = 15;
export const PROJECT_SLOTS = projects.map((_, k) => k * 3);
export const EMPTY_SLOT = SLOTS - 1;

const DESCENT_END = 0.14;
const OUTRO_START = 0.88;
const N = projects.length;

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export function timeline(p) {
  const pulls = new Array(N).fill(0);
  const descent = smooth(0, DESCENT_END, p);

  if (p < DESCENT_END) {
    return { descent, slot: PROJECT_SLOTS[0], pulls, emptyPull: 0, phase: 'intro', active: -1 };
  }

  if (p >= OUTRO_START) {
    const u = (p - OUTRO_START) / (1 - OUTRO_START);
    return { descent: 1, slot: EMPTY_SLOT, pulls, emptyPull: smooth(0, 0.35, u), phase: 'outro', active: -1 };
  }

  const seg = ((p - DESCENT_END) / (OUTRO_START - DESCENT_END)) * N;
  const k = Math.min(N - 1, Math.floor(seg));
  const t = seg - k;
  const next = k === N - 1 ? EMPTY_SLOT : PROJECT_SLOTS[k + 1];
  const slot = PROJECT_SLOTS[k] + (next - PROJECT_SLOTS[k]) * smooth(0.66, 1, t);
  pulls[k] = smooth(0, 0.2, t) * (1 - smooth(0.5, 0.68, t));

  return { descent: 1, slot, pulls, emptyPull: 0, phase: 'projects', active: pulls[k] > 0.4 ? k : -1 };
}

// Position de défilement (0 → 1) où un projet est pleinement présenté
export function progressForProject(k) {
  return DESCENT_END + ((k + 0.3) / N) * (OUTRO_START - DESCENT_END);
}
