import { useContent } from './lib/lang';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Atelier from './components/Atelier';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Loom from './components/Loom';
import Offers from './components/Offers';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const { ui } = useContent();
  return (
    <>
      <a href="#projects" className="sr-only">{ui.skipToProjects}</a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Atelier />
        <Projects />
        <Skills />
        <Journey />
        <Offers />
        <Loom />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
