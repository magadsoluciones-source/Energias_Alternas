// src/pages/ProductPage.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { useCart } from "../cart/Cart.jsx";
import { getProductById } from "../services/productsService.js";

function formatPrice(precio) {
  return `Q${Number(precio).toLocaleString("es-GT")}`;
}

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal de imagen grande

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setQuantity(1);
      })
      .catch((error) => console.error("Error al cargar el producto:", error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center text-slate-500 text-sm">
          Cargando producto...
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center text-slate-500 text-sm">
          Producto no encontrado.
        </div>
        <Footer />
      </>
    );
  }

  const imagenes = product.imagenes?.length ? product.imagenes : [];
  const precioUnitario = Number(product.precio_venta) || 0;
  const subtotal = precioUnitario * quantity;

  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleIncrement = () => setQuantity((prev) => prev + 1);

  const handleAddToCartWithQty = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        slug: product.id,
        name: product.nombre,
        price: formatPrice(product.precio_venta),
        imagen_url: imagenes[0],
      });
    }
  };

  return (
    <>
      <Header />
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        <Link
          to="/#catalogo"
          className="text-xs font-semibold text-black/50 hover:text-black mb-8 inline-flex items-center gap-1 transition-colors"
        >
          ← Volver al catálogo
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* GALERÍA DE IMÁGENES */}
          <div>
            <div
              onClick={() => imagenes.length > 0 && setIsModalOpen(true)}
              className="group relative w-full h-96 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 cursor-zoom-in shadow-sm transition-all hover:shadow-md mb-4"
            >
              {imagenes.length > 0 ? (
                <>
                  <img
                    src={imagenes[activeImage]}
                    alt={product.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur-md text-xs font-bold px-4 py-2 rounded-full shadow-lg text-slate-800">
                      🔍 Toca para ampliar
                    </span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">☀️</div>
              )}
            </div>

            {/* MINIANURAS */}
            {imagenes.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {imagenes.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      i === activeImage
                        ? "border-amber-500 shadow-md scale-95"
                        : "border-slate-200 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DETALLES DEL PRODUCTO */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                {product.categoria}
              </span>

              {product.disponible ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  En Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Agotado
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{product.nombre}</h1>
            <p className="text-3xl font-extrabold text-amber-600">{formatPrice(product.precio_venta)}</p>
            <p className="text-slate-600 text-sm leading-relaxed">{product.descripcion}</p>

            {product.caracteristicas?.length > 0 && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Especificaciones destacadas
                </h3>
                <ul className="text-xs text-slate-700 space-y-2">
                  {product.caracteristicas.map((c, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* SECCIÓN DE CANTIDAD Y COMPRA PERMITIENDO TECLADO */}
            {product.disponible ? (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Cantidad
                  </label>
                  
                  {/* Cuadro de cantidad con input de teclado */}
                  <div className="inline-flex items-center border border-slate-300 bg-white rounded-md">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-black font-medium text-lg cursor-pointer select-none"
                    >
                      -
                    </button>

                    <input type="number" min="1" value={quantity} onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        // Si el cuadro queda vacío o ponen un número menor a 1, ponemos 1
                        if (isNaN(val) || val < 1) {
                          setQuantity(1);
                        } else {
                          setQuantity(val);
                        }
                      }}
                      className="w-12 text-center text-sm font-semibold text-slate-800 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />

                    <button
                      type="button"
                      onClick={handleIncrement}
                      className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-black font-medium text-lg cursor-pointer select-none"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Botón directo de agregar */}
                <button
                  type="button"
                  onClick={handleAddToCartWithQty}
                  className="w-full py-3.5 px-6 rounded-lg bg-ink hover:bg-orange text-white font-semibold text-sm transition-colors cursor-pointer"
                >
                  Agregar a carrito
                </button>
              </div>
            ) : (
              <button
                disabled
                className="w-full py-3.5 rounded-lg bg-slate-200 text-slate-400 font-semibold text-sm cursor-not-allowed"
              >
                Agotado
              </button>
            )}
          </div>
        </div>
      </section>

      {/* MODAL DE IMAGEN AMPLIADA */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-amber-500 text-3xl font-bold transition-colors"
            >
              ✕
            </button>
            <img
              src={imagenes[activeImage]}
              alt={product.nombre}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}