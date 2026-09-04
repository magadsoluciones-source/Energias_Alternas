// src/components/home/Catalog.jsx
import { useMemo, useState, useEffect } from "react";
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
      {/* Etiqueta flotante de Agotado en la esquina de la foto */}
      {!product.disponible && (
        <span className="absolute top-8 right-8 z-10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500 text-white shadow-md">
          Agotado
        </span>
      )}

      <div className="w-full h-40 rounded-xl mb-5 overflow-hidden bg-black/5 relative">
        {imagen ? (
          <img src={imagen} alt={product.nombre} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">☀️</div>
        )}
      </div>

      <h3 className="text-lg font-bold mb-2">{product.nombre}</h3>
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold">{formatPrice(product.precio_venta)}</span>
      </div>

      {/* Botón condicional según la disponibilidad */}
      {product.disponible ? (
        <button
          onClick={(e) => {
            e.preventDefault(); // evita navegar cuando dan clic aquí
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

export default function Catalog() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("todos");
  const [sort, setSort] = useState("sugerido");

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
    // 1. Filtrar por categoría primero
    let list =
      categoryFilter === "todos"
        ? [...productos]
        : productos.filter((p) => p.categoria === categoryFilter);

    // 2. Ordenar aplicando la regla: Disponibles PRIMERO, Inactivos/Agotados AL FINAL
    return list.sort((a, b) => {
      // Convertimos a booleano seguro (true/false)
      const aDisponible = Boolean(a.disponible);
      const bDisponible = Boolean(b.disponible);

      // Regla de oro: Si la disponibilidad es distinta, el disponible va primero (-1)
      if (aDisponible !== bDisponible) {
        return aDisponible ? -1 : 1;
      }

      // Si AMBOS están disponibles (o ambos agotados), aplicamos el criterio de orden seleccionado:
      if (sort === "asc") {
        return Number(a.precio_venta) - Number(b.precio_venta);
      }
      if (sort === "desc") {
        return Number(b.precio_venta) - Number(a.precio_venta);
      }

      // "sugerido" (mantiene el orden original por defecto de la BD)
      return 0;
    });
  }, [productos, categoryFilter, sort]);

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

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
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
          className="px-4 py-2 rounded-full text-sm font-semibold border border-black/15 text-black/70 bg-white"
        >
          <option value="sugerido">Orden sugerido</option>
          <option value="asc">Precio: menor a mayor</option>
          <option value="desc">Precio: mayor a menor</option>
        </select>
      </div>

      {loading ? (
        <p className="text-black/50 text-sm">Cargando productos...</p>
      ) : filtered.length === 0 ? (
        <p className="text-black/50 text-sm">No hay productos en esta categoria por ahora.</p>
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