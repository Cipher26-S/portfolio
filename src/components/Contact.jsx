import { useState } from 'react';
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaArrowRight, FaWhatsapp, FaRegCopy, FaCheck } from 'react-icons/fa';
import { useContent } from '../lib/lang';
import Reveal from './Reveal';
import './Contact.css';

export default function Contact() {
  const { profile, ui } = useContent();
  const t = ui.contact;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // Beaucoup de visiteurs n'ont pas de logiciel de messagerie : on leur permet de copier l'adresse
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  // Le même message, envoyé sur WhatsApp plutôt que par email
  const sendWhatsapp = (e) => {
    const formNode = e.currentTarget.form;
    if (!formNode.reportValidity()) return;
    const text = encodeURIComponent(`${t.whatsappIntro} ${form.name} (${form.email}).\n\n${form.message}`);
    window.open(`${profile.whatsapp}?text=${text}`, '_blank', 'noopener');
  };

  // Ouvre la messagerie du visiteur avec le message prérempli
  const send = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${t.subject} : ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <Reveal>
          <span className="kicker">{t.kicker}</span>
          <h2 className="contact__title">
            {t.title}<span>.</span>
          </h2>
          <div className="contact__mailrow">
            <a className="contact__mail" href={`mailto:${profile.email}`}>
              {profile.email} <FaArrowRight aria-hidden="true" />
            </a>
            <button type="button" className="contact__copy" onClick={copyEmail}>
              {copied ? <FaCheck aria-hidden="true" /> : <FaRegCopy aria-hidden="true" />}
              <span aria-live="polite">{copied ? t.copied : t.copy}</span>
            </button>
          </div>
        </Reveal>

        <div className="contact__grid">
          <Reveal as="ul" className="contact__ways">
            <li>
              <a href={`mailto:${profile.email}`}><FaEnvelope /> Email</a>
            </li>
            <li>
              <a href={profile.whatsapp} target="_blank" rel="noreferrer"><FaWhatsapp /> WhatsApp</a>
            </li>
            <li>
              <a href={profile.phoneHref}><FaPhone /> {profile.phone}</a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer"><FaLinkedin /> LinkedIn</a>
            </li>
          </Reveal>

          <Reveal as="form" className="contact__form" onSubmit={send} delay={120}>
            <label>
              <span>{t.name}</span>
              <input name="name" required value={form.name} onChange={update} autoComplete="name" />
            </label>
            <label>
              <span>{t.email}</span>
              <input name="email" type="email" required value={form.email} onChange={update} autoComplete="email" />
            </label>
            <label className="contact__wide">
              <span>{t.message}</span>
              <textarea name="message" rows="5" required value={form.message} onChange={update} />
            </label>
            <div className="contact__send contact__wide">
              <button type="submit" className="btn btn--dark">
                <FaEnvelope aria-hidden="true" /> {t.sendEmail}
              </button>
              <button type="button" className="btn btn--whatsapp" onClick={sendWhatsapp}>
                <FaWhatsapp aria-hidden="true" /> {t.sendWhatsapp}
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
