import { FaArrowUp } from 'react-icons/fa';
import { profile } from '../data/content';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__text">
          © {new Date().getFullYear()} {profile.name}. Conçu et développé avec passion.
        </p>
        <a href="#home" className="footer__top" aria-label="Retour en haut">
          <FaArrowUp />
        </a>
      </div>
    </footer>
  );
}
