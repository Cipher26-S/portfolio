import { useContent } from '../lib/lang';
import Weave from './Weave';
import './Footer.css';

export default function Footer() {
  const { profile, ui } = useContent();
  return (
    <footer className="footer">
      <Weave seed="footer-koudougou" height={34} />
      <div className="container footer__inner">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="footer__made">{ui.footer.made}</p>
        <a href="#home">{ui.footer.top}</a>
      </div>
    </footer>
  );
}
