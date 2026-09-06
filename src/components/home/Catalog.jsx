// src/components/home/Catalog.jsx
// src/components/home/Catalog.jsx
import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../cart/Cart.jsx"; 
import { getProducts } from "../../services/productsService.js";

const categoryLabels = {
  portatiles: "Portátiles",
  fijos: "Fijos",
  industriales: "Industriales",
};

function formatPrice(precio) {
  return `Q${Number(precio).toLocaleString("es-GT")}`;
}

function calcularEscalaOptima(img, targetFillRatio = 1.0) {
  try {
    const canvas = document.createElement("canvas");
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, w, h);

    const { data } = ctx.getImageData(0, 0, w, h);
    let minX = w, minY = h, maxX = 0, maxY = 0;
    let found = false;

    const step = 2;
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const idx = (y * w + x) * 4;
        const alpha = data[idx + 3];
        const r = data[idx], g = data[idx + 1], b = data[idx + 2];
        const isWhite = r > 245 && g > 245 && b > 245;

        if (alpha > 15 && !isWhite) {
          found = true;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (!found) {
      console.warn("No se detectó contenido en la imagen, usando escala 1");
      return 1;
    }

    const contentWidth = maxX - minX;
    const contentHeight = maxY - minY;
    const fillRatio = Math.max(contentWidth / w, contentHeight / h);

    if (fillRatio <= 0) return 1;

    const scale = targetFillRatio / fillRatio;
    console.log(`fillRatio: ${fillRatio.toFixed(2)}, scale calculado: ${scale.toFixed(2)}`);

    // Techo subido de 1.6 a 3 — antes se recortaba silenciosamente acá
    return Math.min(Math.max(scale, 0.7), 3);
  } catch (err) {
    console.warn("⚠️ FALLÓ el cálculo (probable CORS):", err);
    return 1;
  }
}

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const imagenes = product.imagenes || [];

  // Productos donde la SEGUNDA imagen (índice 1) debe mostrarse como principal
  const productosImagenInvertida = [
    "BLUETTI EB55",
    "BLUETTI AC200PL",
    "BLUETTI AC180P",
    "BLUETTI AC500+2 B300K",
  ];

  const usarImagenInvertida = productosImagenInvertida.some((nombre) =>
    product.nombre?.toUpperCase().includes(nombre)
  );

  const imagenPrincipal =
    usarImagenInvertida && imagenes.length > 1 ? imagenes[1] : imagenes[0];

  const [imgScale, setImgScale] = useState(1);
  const scaleCache = useRef({});

  const handleImageLoad = useCallback((e) => {
    const src = e.target.src;
    if (scaleCache.current[src] !== undefined) {
      setImgScale(scaleCache.current[src]);
      return;
    }
    const scale = calcularEscalaOptima(e.target);
    scaleCache.current[src] = scale;
    setImgScale(scale);
  }, []);

  return (
    <Link
      to={`/producto/${product.id}`}
      className="group relative p-4 rounded-3xl bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-black/15 border border-black/5 transition-all duration-300 ease-out flex flex-col justify-between"
    >
      <div>
        <div className="w-full h-56 mb-2 flex items-center justify-center p-2 relative overflow-hidden">
          <div className="absolute top-2 left-2 z-10">
            {!product.disponible ? (
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-100/90 border border-red-200 px-2.5 py-1 rounded-xl shadow-xs">
                Agotado
              </span>
            ) : (
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-neutral-900/95 backdrop-blur-sm px-3.5 py-1.5 rounded-xl shadow-sm border border-white/10">
  
  <span className="tracking-wide">10 años de garantía</span>
</div>
            )}
          </div>

          {imagenPrincipal ? (
            <img
              src={imagenPrincipal}
              alt={product.nombre}
              crossOrigin="anonymous"
              onLoad={handleImageLoad}
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
              }}
              style={{ transform: `scale(${imgScale})` }}
              className="max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-200 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="text-4xl">☀️</div>
          )}
        </div>

        <div className="space-y-0.5 px-1">
          <p className="text-[10px] font-semibold tracking-widest text-black/40 uppercase">
            {categoryLabels[product.categoria] || "Energía Solar"}
          </p>
          <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-teal-700 transition-colors line-clamp-2">
            {product.nombre}
          </h3>
        </div>
      </div>

      <div className="pt-3 mt-3 px-1 border-t border-black/10 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-[9px] font-medium text-black/40 uppercase tracking-wider">Precio</span>
          <span className="text-lg font-black text-black leading-tight">
            {formatPrice(product.precio_venta)}
          </span>
        </div>

        {product.disponible ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart({
                slug: product.id,
                name: product.nombre,
                price: formatPrice(product.precio_venta),
                imagen_url: imagenPrincipal,
              });
            }}
            className="px-4 py-2 rounded-full bg-black text-white text-xs font-semibold hover:bg-teal-600 transition-all duration-200 active:scale-95 shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span>Agregar</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        ) : (
          <button
            disabled
            onClick={(e) => e.preventDefault()}
            className="px-4 py-2 rounded-full bg-black/5 text-black/30 text-xs font-semibold cursor-not-allowed"
          >
            Agotado
          </button>
        )}
      </div>
    </Link>
  );
}

export default function Catalog() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("todos");
  const [sort, setSort] = useState("sugerido");
  
  // Estado para el texto del buscador
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getProducts()
      .then(setProductos)
      .catch((error) => console.error("Error al cargar productos:", error))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    return [...new Set(productos.map((p) => p.categoria))];
  }, [productos]);

  const filtered = useMemo(() => {
    // 1. Filtrar por categoría
    let list =
      categoryFilter === "todos"
        ? [...productos]
        : productos.filter((p) => p.categoria === categoryFilter);

    // 2. Filtrar por texto de búsqueda (nombre o descripción)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.nombre?.toLowerCase().includes(query) ||
          p.descripcion?.toLowerCase().includes(query)
      );
    }

    // 3. Ordenar: Disponibles PRIMERO, Agotados AL FINAL + Filtro de Precio
    return list.sort((a, b) => {
      const aDisponible = Boolean(a.disponible);
      const bDisponible = Boolean(b.disponible);

      if (aDisponible !== bDisponible) {
        return aDisponible ? -1 : 1;
      }

      if (sort === "asc") {
        return Number(a.precio_venta) - Number(b.precio_venta);
      }
      if (sort === "desc") {
        return Number(b.precio_venta) - Number(a.precio_venta);
      }

      return 0;
    });
  }, [productos, categoryFilter, searchQuery, sort]);

  return (
    <section id="catalogo" className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="uppercase tracking-[0.2em] text-xs font-semibold mb-3 text-teal">Catalogo</p>
          <h2 className="text-3xl md:text-4xl font-bold">Elige tu nivel de respaldo</h2>
        </div>
        <p className="text-black/60 max-w-sm text-sm">
          Desde respaldo basico para electrodomesticos hasta sistemas para toda la casa.
        </p>
      </div>

      {/* BARRA DE BÚSQUEDA Y FILTROS */}
      <div className="space-y-4 mb-8">
        
        {/* Input de Buscador */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-black/15 rounded-full py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:border-black/40 transition-all shadow-sm"
          />
          {/* Lupa SVG */}
          <svg
            className="w-4 h-4 text-black/40 absolute left-3.5 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          {/* Botón para limpiar texto de búsqueda */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/40 hover:text-black text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Categorías y Orden */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategoryFilter("todos")}
              className={
                "px-4 py-2 rounded-full text-sm font-semibold border transition " +
                (categoryFilter === "todos" ? "bg-ink text-white border-ink" : "border-black/15 text-black/70 hover:border-black/30")
              }
            >
              Todos
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={
                  "px-4 py-2 rounded-full text-sm font-semibold border transition " +
                  (categoryFilter === c ? "bg-ink text-white border-ink" : "border-black/15 text-black/70 hover:border-black/30")
                }
              >
                {categoryLabels[c] || c}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 rounded-full text-sm font-semibold border border-black/15 text-black/70 bg-white cursor-pointer"
          >
            <option value="sugerido">Orden sugerido</option>
            <option value="asc">Precio: menor a mayor</option>
            <option value="desc">Precio: mayor a menor</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-black/50 text-sm">Cargando productos...</p>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center bg-black/5 rounded-2xl">
          <p className="text-black/60 text-sm font-medium">No se encontraron productos que coincidan con tu búsqueda.</p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-3 text-xs font-bold text-teal hover:underline"
            >
              Limpiar filtro de búsqueda
            </button>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p}/>
          ))}
        </div>
      )}
    </section>
  );
}