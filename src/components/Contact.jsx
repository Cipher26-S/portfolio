import { useState } from 'react';
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaArrowRight } from 'react-icons/fa';
import { profile } from '../data/content';
import Reveal from './Reveal';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // Ouvre la messagerie du visiteur avec le message prérempli
  const send = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message du portfolio — ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <Reveal>
          <span className="kicker">Contact</span>
          <h2 className="contact__title">
            Parlons-en<span>.</span>
          </h2>
          <a className="contact__mail" href={`mailto:${profile.email}`}>
            {profile.email} <FaArrowRight aria-hidden="true" />
          </a>
        </Reveal>

        <div className="contact__grid">
          <Reveal as="ul" className="contact__ways">
            <li>
              <a href={`mailto:${profile.email}`}><FaEnvelope /> Email</a>
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
              <span>Votre nom</span>
              <input name="name" required value={form.name} onChange={update} autoComplete="name" />
            </label>
            <label>
              <span>Votre email</span>
              <input name="email" type="email" required value={form.email} onChange={update} autoComplete="email" />
            </label>
            <label className="contact__wide">
              <span>Votre message</span>
              <textarea name="message" rows="5" required value={form.message} onChange={update} />
            </label>
            <button type="submit" className="btn btn--dark contact__wide">
              Envoyer le message <FaArrowRight aria-hidden="true" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
