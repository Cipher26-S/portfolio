import { motion } from 'framer-motion';
import { FaCode, FaMobileAlt, FaServer, FaDatabase } from 'react-icons/fa';
import { services } from '../data/content';
import './Services.css';

const ICONS = {
  code: FaCode,
  mobile: FaMobileAlt,
  server: FaServer,
  database: FaDatabase,
};

export default function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <motion.div
          className="skills__head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Ce que je fais</span>
          <h2 className="section-title">
            Des <span className="accent">services</span> sur-mesure
          </h2>
          <p className="section-lead">
            De l'idée au produit final, j'accompagne vos projets web et mobiles à chaque étape.
          </p>
        </motion.div>

        <div className="services__grid">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <motion.div
                key={service.title}
                className="services__card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="services__icon">
                  <Icon />
                </div>
                <h3 className="services__title">{service.title}</h3>
                <p className="services__desc">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
