import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { education, experience } from '../data/content';
import './Education.css';

function Timeline({ title, icon: Icon, items }) {
  return (
    <div className="journey__col">
      <h3 className="journey__heading"><Icon /> {title}</h3>
      <div className="timeline">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            className="timeline__item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <div className="timeline__marker">
              <Icon />
            </div>
            <div className="timeline__content">
              <span className="timeline__period">{item.period}</span>
              <h4 className="timeline__title">{item.title}</h4>
              <p className="timeline__place">{item.place}</p>
              <p className="timeline__desc">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <section id="journey" className="section education">
      <div className="container">
        <motion.div
          className="skills__head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Parcours</span>
          <h2 className="section-title">
            Expérience & <span className="accent">formation</span>
          </h2>
        </motion.div>

        <div className="journey">
          <Timeline title="Expérience" icon={FaBriefcase} items={experience} />
          <Timeline title="Formation" icon={FaGraduationCap} items={education} />
        </div>
      </div>
    </section>
  );
}
