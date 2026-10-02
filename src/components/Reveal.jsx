import { useInView } from '../lib/useInView';

// Fait apparaître son contenu en douceur quand il entre dans l'écran
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, style, children, ...rest }) {
  const [ref, visible] = useInView({ threshold: 0.15 });
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
