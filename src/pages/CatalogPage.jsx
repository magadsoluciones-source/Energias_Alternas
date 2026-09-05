// src/pages/CatalogPage.jsx
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import Catalog from "../components/home/Catalog.jsx";

export default function CatalogPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Catalog />
      </main>
      <Footer />
    </>
  );
}