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
  
  // Estado para manejar la cantidad seleccionada (inicia en 1)
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setQuantity(1); // Resetea la cantidad si cambia de producto
      })
      .catch((error) => console.error("Error al cargar el producto:", error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <p className="max-w-6xl mx-auto px-6 pt-32 text-center text-slate-500">Cargando producto...</p>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <p className="max-w-6xl mx-auto px-6 pt-32 text-center text-slate-500">Producto no encontrado.</p>
        <Footer />
      </>
    );
  }

  const imagenes = product.imagenes?.length ? product.imagenes : [];
  const precioUnitario = Number(product.precio_venta) || 0;
  const subtotal = precioUnitario * quantity;

  // Funciones para incrementar y decrementar la cantidad con límite mínimo de 1
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleIncrement = () => setQuantity((prev) => prev + 1);

  const handleAddToCartWithQty = () => {
    // Si tu función addToCart en el context soporta agregar varias unidades de un golpe, 
    // o bien lo ejecutamos en un bucle / modificamos el context. 
    // Como tu addToCart actual suma de 1 en 1 por cada llamada, lo ejecutamos 'quantity' veces 
    // o mandamos la cantidad si tu context lo soporta. Para asegurarnos con tu CartContext actual:
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
        <Link to="/#catalogo" className="text-sm text-black/50 hover:text-black mb-6 inline-block">
          ← Volver al catálogo
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <div className="w-full h-80 rounded-2xl overflow-hidden bg-black/5 mb-3">
              {imagenes.length > 0 ? (
                <img
                  src={imagenes[activeImage]}
                  alt={product.nombre}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">☀️</div>
              )}
            </div>
            {imagenes.length > 1 && (
              <div className="flex gap-2">
                {imagenes.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      i === activeImage ? "border-orange" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-teal">
                {product.categoria}
              </span>

              {/* Indicador de stock en vivo */}
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

            <h1 className="text-3xl font-bold mb-3">{product.nombre}</h1>
            <p className="text-2xl font-bold mb-5">{formatPrice(product.precio_venta)}</p>
            <p className="text-black/70 mb-6">{product.descripcion}</p>

            {product.caracteristicas?.length > 0 && (
              <>
                <h3 className="font-semibold mb-2">Características</h3>
                <ul className="text-sm text-black/70 space-y-1 mb-8 list-disc list-inside">
                  {product.caracteristicas.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </>
            )}

            {/* SECCIÓN DE CANTIDADES Y BOTÓN DE COMPRA */}
            {product.disponible ? (
              <div className="space-y-5">
                {/* Selector de cantidad y subtotal dinámico */}
                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-4 rounded-2xl max-w-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-600">Cantidad:</span>
                    <div className="flex items-center bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm">
                      <button
                        onClick={handleDecrement}
                        className="w-9 h-9 flex items-center justify-center text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-xs font-bold text-slate-900">{quantity}</span>
                      <button
                        onClick={handleIncrement}
                        className="w-9 h-9 flex items-center justify-center text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Subtotal</span>
                    <span className="text-sm font-bold text-amber-600">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                <button
                  onClick={handleAddToCartWithQty}
                  className="w-full md:w-auto px-8 py-3.5 rounded-full bg-ink text-white font-semibold hover:bg-orange transition-colors cursor-pointer shadow-md"
                >
                  Agregar {quantity} al carrito
                </button>
              </div>
            ) : (
              <button
                disabled
                className="w-full md:w-auto px-8 py-3.5 rounded-full bg-slate-200 text-slate-400 font-semibold cursor-not-allowed"
              >
                Producto Agotado Temporalmente
              </button>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}