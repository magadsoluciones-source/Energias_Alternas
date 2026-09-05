// src/components/home/CatalogPreview.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../cart/Cart.jsx";
import { getProducts } from "../../services/productsService.js";

function formatPrice(precio) {
  return `Q${Number(precio).toLocaleString("es-GT")}`;
}

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const imagen = product.imagenes?.[0];

  return (
    <Link
      to={`/producto/${product.id}`}
      className={`card-lift bg-white rounded-2xl p-6 border border-black/5 relative block transition-all ${
        !product.disponible ? "opacity-75" : ""
      }`}
    >
      {/* ETIQUETA DE GARANTÍA (Esquina superior izquierda de la tarjeta) */}
        {product.garantia && (
        <div className="absolute top-8 left-8 z-20 bg-black/90 text-white text-[11px] font-bold px-3 py-1 rounded-sm shadow-md">
            {product.garantia}
        </div>
        )}

      {/* Etiqueta flotante de Agotado (Esquina superior derecha) */}
      {!product.disponible && (
        <span className="absolute top-8 right-8 z-20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500 text-white shadow-md">
          Agotado
        </span>
      )}

      {/* Contenedor de la Imagen */}
      <div className="w-full h-44 rounded-xl mb-5 overflow-hidden bg-black/5 relative flex items-center justify-center">
        {imagen ? (
          <img
            src={imagen}
            alt={product.nombre}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">☀️</div>
        )}
      </div>

      <h3 className="text-lg font-bold mb-2">{product.nombre}</h3>
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold text-lg">{formatPrice(product.precio_venta)}</span>
      </div>

      {/* Botón de Agregar al carrito */}
      {product.disponible ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart({
              slug: product.id,
              name: product.nombre,
              price: formatPrice(product.precio_venta),
              imagen_url: imagen,
            });
          }}
          className="w-full py-2.5 rounded-full border border-black/15 text-sm font-semibold hover:bg-ink hover:text-white hover:border-ink transition-colors cursor-pointer"
        >
          Agregar al carrito
        </button>
      ) : (
        <button
          disabled
          onClick={(e) => e.preventDefault()}
          className="w-full py-2.5 rounded-full bg-slate-100 border border-slate-200 text-slate-400 text-sm font-semibold cursor-not-allowed"
        >
          No disponible
        </button>
      )}
    </Link>
  );
}

export default function CatalogPreview() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProductos)
      .catch((error) => console.error("Error al cargar productos:", error))
      .finally(() => setLoading(false));
  }, []);

  // Filtramos para tomar máximo 6 productos destacados y disponibles primero
  const previewProducts = productos
    .slice()
    .sort((a, b) => (Boolean(b.disponible) - Boolean(a.disponible)))
    .slice(0, 6);

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