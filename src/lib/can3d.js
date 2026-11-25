// La 3D n'est montrée que si l'appareil sait l'afficher et que le visiteur n'a pas demandé moins d'animations.
// Sinon, la liste classique des projets prend le relais.
function detect() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export const CAN_3D = detect();
