import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Loom from './components/Loom';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <a href="#projects" className="sr-only">Aller aux réalisations</a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Journey />
        <Loom />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
