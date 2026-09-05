// src/pages/HomePage.jsx
import { useState } from "react";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";

import Hero from "../components/home/Hero.jsx";
import InfoSections from "../components/home/InfoSections.jsx";
import CatalogPreview from "../components/home/CatalogPreview.jsx"; // <-- Vista previa
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

  return (
    <>
      <Header />
      <Hero esSeñalado={esSeñalado} />
      <InfoSections alHacerClicVerPuntos={irAPuntosDePortada} />
      <CatalogPreview />
      <HowToChoose />
      <CTA />
      <Footer />
    </>
  );
}