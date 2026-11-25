import './Projects.css';

// Captures d'un projet : navigateur pour le web, deux téléphones pour le mobile
export default function Shots({ images }) {
  if (images[0].kind === 'desktop') {
    return (
      <div className="shot-browser">
        <div className="shot-browser__bar"><span /><span /><span /></div>
        <img src={images[0].src} alt={images[0].alt} loading="lazy" />
      </div>
    );
  }
  return (
    <div className="shot-phones">
      {images.slice(0, 2).map((img) => (
        <div key={img.src} className="shot-phone">
          <img src={img.src} alt={img.alt} loading="lazy" />
        </div>
      ))}
    </div>
  );
}
