import { profile } from '../data/content';
import Weave from './Weave';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <Weave seed="footer-koudougou" height={34} />
      <div className="container footer__inner">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="footer__made">Tissé à Koudougou, Burkina Faso — avec React.</p>
        <a href="#home">Revenir en haut ↑</a>
      </div>
    </footer>
  );
}
