import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import { profile } from '../data/content';
import './Contact.css';

const contactCards = [
  { icon: FaEnvelope, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: FaPhone, label: 'Téléphone', value: profile.phone, href: profile.phoneHref },
  { icon: FaMapMarkerAlt, label: 'Localisation', value: profile.location, href: null },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact portfolio — ${form.name || 'Nouveau message'}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section contact">
      <div className="container contact__inner">
        <motion.div
          className="skills__head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Restons en contact</span>
          <h2 className="section-title">
            Un projet en tête ? <span className="accent">Discutons-en</span>
          </h2>
          <p className="section-lead">
            Que ce soit pour une opportunité, une collaboration ou simplement échanger, ma boîte de réception est ouverte.
          </p>
        </motion.div>

        <div className="contact__grid">
          <motion.div
            className="contact__cards"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            {contactCards.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <>
                  <span className="contact__card-icon"><Icon /></span>
                  <span>
                    <span className="contact__card-label">{label}</span>
                    <span className="contact__card-value">{value}</span>
                  </span>
                </>
              );
              return href ? (
                <a key={label} href={href} className="contact__card">{content}</a>
              ) : (
                <div key={label} className="contact__card">{content}</div>
              );
            })}

            <div className="contact__socials">
              <a href={profile.github} target="_blank" rel="noreferrer" className="hero__social-link" aria-label="GitHub">
                <FaGithub />
              </a>
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hero__social-link" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
              )}
            </div>
          </motion.div>

          <motion.form
            className="contact__form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="contact__field">
              <label htmlFor="name">Nom</label>
              <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Votre nom" />
            </div>
            <div className="contact__field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="vous@exemple.com" />
            </div>
            <div className="contact__field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required value={form.message} onChange={handleChange} placeholder="Parlez-moi de votre projet..." />
            </div>
            <button type="submit" className="btn btn-primary contact__submit">
              <FaPaperPlane /> Envoyer le message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
