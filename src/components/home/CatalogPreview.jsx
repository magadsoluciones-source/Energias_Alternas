// src/components/home/CatalogPreview.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/productsService.js";
import { ProductCard } from "./Catalog.jsx";

// Nombres (o parte del nombre) de los productos que SIEMPRE queremos
// destacar primero en la vista previa de la home, en este orden.
const PRODUCTOS_DESTACADOS_HOME = [
  "EP500 PRO",
];

// Nombres (o parte del nombre) de los productos que NO queremos que
// aparezcan en la vista previa de la home (aunque sí sigan en /catalogo).
const PRODUCTOS_EXCLUIR_HOME = [
  "B80P",
];

export default function CatalogPreview() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProductos)
      .catch((error) => console.error("Error al cargar productos:", error))
      .finally(() => setLoading(false));
  }, []);

  // 1. Buscamos primero los productos "forzados" que queremos destacar,
  //    respetando el orden de PRODUCTOS_DESTACADOS_HOME
  const destacados = PRODUCTOS_DESTACADOS_HOME
    .map((nombreBuscado) =>
      productos.find(
        (p) =>
          p.disponible &&
          p.nombre?.toUpperCase().includes(nombreBuscado.toUpperCase())
      )
    )
    .filter(Boolean);

  const idsDestacados = new Set(destacados.map((p) => p.id));

  // 2. Completamos hasta 6 con el resto de productos (disponibles primero),
  //    sacando los que ya están en "destacados" Y los que están en "excluir"
  const resto = productos
    .filter((p) => !idsDestacados.has(p.id))
    .filter(
      (p) =>
        !PRODUCTOS_EXCLUIR_HOME.some((nombreExcluido) =>
          p.nombre?.toUpperCase().includes(nombreExcluido.toUpperCase())
        )
    )
    .slice()
    .sort((a, b) => Boolean(b.disponible) - Boolean(a.disponible));

  const previewProducts = [...destacados, ...resto].slice(0, 6);

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <p className="uppercase tracking-[0.2em] text-xs font-semibold mb-3 text-teal">Destacados</p>
          <h2 className="text-3xl md:text-4xl font-bold">Equipos Populares</h2>
        </div>
        <Link
          to="/catalogo"
          className="text-sm font-semibold text-black hover:text-orange transition-colors"
        >
          Ver todo el catálogo →
        </Link>
      </div>

      {loading ? (
        <p className="text-black/50 text-sm">Cargando equipos destacados...</p>
      ) : previewProducts.length === 0 ? (
        <p className="text-black/50 text-sm">No hay productos disponibles por ahora.</p>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {previewProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/catalogo"
              className="inline-block px-8 py-4 rounded-full bg-ink hover:bg-orange text-white font-semibold text-sm transition-colors shadow-md"
            >
              Explorar Catálogo Completo
            </Link>
          </div>
        </>
      )}
    </section>
  );
}