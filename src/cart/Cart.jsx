// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ============ CONTEXTO / ESTADO DEL CARRITO ============ */
const CartContext = createContext(null);

export function CartProvider({ children }) {
  // 1. Inicializamos el estado leyendo el localStorage
  const [items, setItems] = useState(() => {
    const savedCart = localStorage.getItem("energias_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [isOpen, setIsOpen] = useState(false);

  // 2. Cada vez que 'items' cambia, lo guardamos en el localStorage
  useEffect(() => {
    localStorage.setItem("energias_cart", JSON.stringify(items));
  }, [items]);

  function addToCart(item) {
    setItems((prev) => {
      const existing = prev.find((p) => p.slug === item.slug);
      if (existing) {
        return prev.map((p) => (p.slug === item.slug ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setIsOpen(true);
  }

  function removeFromCart(slug) {
    setItems((prev) => prev.filter((p) => p.slug !== slug));
  }

  function updateQuantity(slug, newQty) {
    if (newQty <= 0) {
      removeFromCart(slug);
      return;
    }
    setItems((prev) =>
      prev.map((p) => (p.slug === slug ? { ...p, qty: newQty } : p))
    );
  }

  // 3. Función vital para vaciar el carrito después de comprar
  function clearCart() {
    setItems([]);
  }

  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        count,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}

/* ============ PANEL VISUAL DEL CARRITO (drawer) ============ */
function parsePrice(price) {
  if (typeof price === "number") return price;
  const digits = price?.replace(/[^0-9]/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

export function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, count } = useCart();
  const navigate = useNavigate();

  const total = items.reduce((sum, i) => sum + parsePrice(i.price) * i.qty, 0);

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-50 bg-black/40" onClick={closeCart} />}

      <aside
        className={
          "fixed top-0 right-0 h-full w-full max-w-sm bg-white text-black z-50 shadow-2xl transition-transform duration-300 flex flex-col " +
          (isOpen ? "translate-x-0" : "translate-x-full")
        }
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
          <h2 className="font-bold display text-lg">Tu carrito ({count})</h2>
          <button
            onClick={closeCart}
            className="text-black/50 hover:text-black text-2xl leading-none cursor-pointer"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="text-black/50 text-sm mt-8 text-center">
              Aún no has agregado productos.
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => {
                // CALCULAMOS EL SUBTOTAL POR PRODUCTO (Precio unitario x Cantidad)
                const itemSubtotal = parsePrice(item.price) * item.qty;

                return (
                  <li key={item.slug} className="flex items-center gap-3 border-b border-black/5 pb-4">
                    
                    {/* Imagen real del producto */}
                    <div className="w-12 h-12 rounded-lg bg-black/5 flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden">
                      {item.imagen_url ? (
                        <img src={item.imagen_url} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        item.emoji || "⚡"
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate text-black">{item.name}</p>
                      
                      {/* Controles + y - */}
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => updateQuantity(item.slug, item.qty - 1)}
                          className="w-5 h-5 rounded bg-black/5 text-xs font-bold text-black hover:bg-black/10 cursor-pointer flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="text-xs text-black/70 font-medium">{item.qty}</span>
                        <button
                          onClick={() => updateQuantity(item.slug, item.qty + 1)}
                          className="w-5 h-5 rounded bg-black/5 text-xs font-bold text-black hover:bg-black/10 cursor-pointer flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* MOSTRAR EL SUBTOTAL MULTIPLICADO POR LA CANTIDAD */}
                    <div className="text-right">
                      <p className="text-sm font-semibold whitespace-nowrap text-black">
                        Q {itemSubtotal.toLocaleString("es-GT")}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.slug)}
                        className="text-xs text-black/40 hover:text-orange cursor-pointer transition-colors"
                      >
                        Quitar
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-black/10">
            <div className="flex items-center justify-between mb-4 text-sm font-semibold">
              <span>Total estimado</span>
              <span>Q {total.toLocaleString("es-GT")}</span>
            </div>
            
            <button
              onClick={() => {
                closeCart();
                navigate("/checkout");
              }}
              className="w-full text-center px-6 py-3.5 rounded-full text-white font-semibold bg-ink hover:bg-orange transition-colors cursor-pointer shadow-md"
            >
              Proceder al Pago
            </button>
          </div>
        )}
      </aside>
    </>
  );
}