import { motion } from 'framer-motion';
import { profile } from '../data/content';
import './About.css';

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container about__inner">
        <motion.div
          className="about__content"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">À propos de moi</span>
          <h2 className="section-title">
            Construire des logiciels qui <span className="accent">comptent réellement</span>
          </h2>
          <p className="about__bio">{profile.bio}</p>

          <div className="about__stats">
            {profile.stats.map((stat) => (
              <div key={stat.label} className="about__stat">
                <span className="about__stat-value gradient-text">{stat.value}</span>
                <span className="about__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.dl
          className="about__facts"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          {profile.facts.map((fact) => (
            <div key={fact.label} className="about__fact">
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
