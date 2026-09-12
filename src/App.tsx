import { LangProvider } from "./context";
import { FloatingActions, Footer, Header } from "./components/chrome";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Career, Expertise, Method } from "./sections/Expertise";
import { Testimonies } from "./sections/Testimonies";
import { Contact } from "./sections/Contact";

export default function App() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero />
          <About />
          <Expertise />
          <Method />
          <Career />
          <Testimonies />
          <Contact />
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </LangProvider>
  );
}
