import { motion } from 'framer-motion';
import {
  SiJavascript, SiDart, SiPython, SiHtml5, SiCss,
  SiReact, SiFlutter, SiNodedotjs, SiExpress,
  SiPostgresql, SiMongodb, SiFirebase,
  SiGit, SiGithub, SiAndroidstudio, SiPostman, SiDocker, SiFigma,
} from 'react-icons/si';
import { FaJava, FaDatabase, FaCode, FaPalette } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import { skills } from '../data/content';
import './Skills.css';

const ICONS = {
  JavaScript: SiJavascript,
  Dart: SiDart,
  Java: FaJava,
  Python: SiPython,
  SQL: FaDatabase,
  HTML5: SiHtml5,
  CSS3: SiCss,
  React: SiReact,
  Flutter: SiFlutter,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Firebase: SiFirebase,
  Git: SiGit,
  GitHub: SiGithub,
  'VS Code': VscVscode,
  'Android Studio': SiAndroidstudio,
  Postman: SiPostman,
  Docker: SiDocker,
  Figma: SiFigma,
  Photoshop: FaPalette,
};

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <motion.div
          className="skills__head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Boîte à outils</span>
          <h2 className="section-title">
            Compétences & <span className="accent">Technologies</span>
          </h2>
          <p className="section-lead">
            Un socle technique polyvalent pour construire des produits complets, du back-end à l'application mobile.
          </p>
        </motion.div>

        <div className="skills__grid">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              className="skills__card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <h3 className="skills__card-title">{group.category}</h3>
              <div className="skills__tags">
                {group.items.map((item) => {
                  const Icon = ICONS[item] || FaCode;
                  return (
                    <span key={item} className="skills__tag">
                      <Icon /> {item}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
