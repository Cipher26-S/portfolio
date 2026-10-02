import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';
import { education } from '../data/content';
import './Education.css';

export default function Education() {
  return (
    <section id="education" className="section education">
      <div className="container">
        <motion.div
          className="skills__head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Parcours académique</span>
          <h2 className="section-title">
            Ma <span className="accent">formation</span>
          </h2>
        </motion.div>

        <div className="timeline">
          {education.map((item, i) => (
            <motion.div
              key={item.title}
              className="timeline__item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="timeline__marker">
                <FaGraduationCap />
              </div>
              <div className="timeline__content">
                <span className="timeline__period">{item.period}</span>
                <h3 className="timeline__title">{item.title}</h3>
                <p className="timeline__place">{item.place}</p>
                <p className="timeline__desc">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
