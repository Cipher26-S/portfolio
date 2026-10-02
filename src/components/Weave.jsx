import { useMemo } from 'react';
import { makeStripes, stripesToGradient, DEFAULT_COLORS } from '../lib/weave';
import { useInView } from '../lib/useInView';
import './Weave.css';

// Bande tissée qui « se tisse » à son apparition : la chaîne monte, puis la trame passe
export default function Weave({ seed = 'salif', colors = DEFAULT_COLORS, height = 28, scale = 4, className = '' }) {
  const [ref, woven] = useInView({ threshold: 0.3 });
  const { warp, weft } = useMemo(() => {
    const w = stripesToGradient(makeStripes(seed, colors), 90, scale);
    const t = stripesToGradient(makeStripes(`${seed}~trame`, colors, 5), 0, Math.max(1, scale / 2));
    return { warp: w.background, weft: t.background };
  }, [seed, colors, scale]);

  return (
    <div
      ref={ref}
      className={`weave ${woven ? 'weave--woven' : ''} ${className}`}
      style={{ '--weave-h': `${height}px`, '--warp': warp, '--weft': weft }}
      aria-hidden="true"
    />
  );
}
