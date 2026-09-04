// src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";

// Las piezas que separaste
import Hero from "../components/home/hero.jsx";
import InfoSections from "../components/home/InfoSections.jsx";
import Catalog from "../components/home/Catalog.jsx";
import { HowToChoose } from "../components/home/HowToChoose.jsx";
import CTA from "../components/home/CTA.jsx";

export default function HomePage() {
  const [esSeñalado, setEsSeñalado] = useState(false);

  const irAPuntosDePortada = () => {
    const el = document.getElementById("portada-hero");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setEsSeñalado(true);
      setTimeout(() => setEsSeñalado(false), 3500); 
    }
  };

  useEffect(() => {
    if (window.location.hash === "#catalogo") {
      const el = document.getElementById("catalogo");
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, []);

  return (
    <>
      <Header />
      <Hero esSeñalado={esSeñalado} />
      <InfoSections alHacerClicVerPuntos={irAPuntosDePortada} />
      <Catalog />
      <HowToChoose />
      <CTA />
      <Footer />
    </>
  );
}
