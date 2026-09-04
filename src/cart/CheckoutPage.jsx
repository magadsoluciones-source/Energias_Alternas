// src/cart/CheckoutPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./Cart.jsx";

export default function CheckoutPage() {
  const navigate = useNavigate();
  // Agregamos clearCart aquí
  const { items, removeFromCart, clearCart } = useCart(); 
  
  // ¡Aquí está el estado que marcaba error!
  const [metodoPago, setMetodoPago] = useState("contraentrega");
  
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    departamento: "Guatemala",
    notas: "",
  });

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    const digits = price?.replace(/[^0-9]/g, "");
    return digits ? parseInt(digits, 10) : 0;
  };

  const total = items.reduce((sum, i) => sum + parsePrice(i.price) * i.qty, 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleFinalizarCompra = (e) => {
    e.preventDefault();

    if (items.length === 0) return;

    // Resumen del pedido formateado para WhatsApp
    let mensaje = `*¡NUEVO PEDIDO DESDE LA WEB!* 🛒\n\n`;
    mensaje += `*DATOS DEL CLIENTE:*\n`;
    mensaje += `• *Nombre:* ${formData.nombre}\n`;
    mensaje += `• *Teléfono:* ${formData.telefono}\n`;
    mensaje += `• *Dirección:* ${formData.direccion}, ${formData.departamento}\n`;
    if (formData.notas) mensaje += `• *Notas:* ${formData.notas}\n`;
    
    mensaje += `\n*MÉTODO DE PAGO:* ${
      metodoPago === "contraentrega"
        ? "🚚 Pago Contra Entrega"
        : "🏦 Transferencia / Depósito Bancario"
    }\n\n`;

    mensaje += `*DETALLE DEL PEDIDO:*\n`;
    items.forEach((item) => {
      mensaje += `• ${item.name} (x${item.qty}) - ${item.price}\n`;
    });

    mensaje += `\n*TOTAL ESTIMADO:* Q ${total.toLocaleString("es-GT")}\n`;

    // FIX: Usar la API oficial completa de WhatsApp en lugar de wa.me
    const numeroWhatsApp = "50239238333";
    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensaje)}`;
    
    window.open(url, "_blank");
    
    // Vaciamos el carrito y regresamos al inicio
    clearCart();
    navigate("/");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-3">Tu carrito está vacío ⚡</h2>
        <p className="text-slate-500 mb-6 text-sm">Agrega algunos productos antes de procesar tu pedido.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-6 py-3 rounded-xl text-sm transition-all cursor-pointer shadow-sm"
        >
          Volver al Catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Botón de retorno usando React Router */}
        <button
          onClick={() => navigate("/")}
          className="text-slate-500 hover:text-slate-900 flex items-center gap-2 mb-8 text-sm transition-colors cursor-pointer font-medium"
        >
          ← Volver a la tienda
        </button>

        <h1 className="text-3xl font-bold mb-8 tracking-tight text-slate-900">Finalizar Pedido</h1>

        <div className="grid md:grid-cols-12 gap-8">
          
          {/* Formulario de Datos y Pago (Columna izquierda) */}
          <form onSubmit={handleFinalizarCompra} className="md:col-span-7 space-y-8">
            
            {/* Sección 1: Datos de Entrega */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-amber-600 flex items-center gap-2">
                <span>📍</span> Datos de Entrega y Contacto
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-600 mb-1 font-medium">Nombre Completo *</label>
                  <input
                    required
                    type="text"
                    name="nombre"
                    placeholder="Ej. Juan Pérez"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1 font-medium">Teléfono / WhatsApp *</label>
                  <input
                    required
                    type="tel"
                    name="telefono"
                    placeholder="Ej. 55554444"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1 font-medium">Dirección de Entrega *</label>
                <input
                  required
                  type="text"
                  name="direccion"
                  placeholder="Calle, avenida, número de casa, zona..."
                  value={formData.direccion}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-600 mb-1 font-medium">Departamento</label>
                  <select
                    name="departamento"
                    value={formData.departamento}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                  >
                    <option value="Guatemala">Guatemala</option>
                    <option value="Alta Verapaz">Alta Verapaz</option>
                    <option value="Quetzaltenango">Quetzaltenango</option>
                    <option value="Escuintla">Escuintla</option>
                    <option value="Otros">Otro Departamento</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1 font-medium">Notas adicionales (opcional)</label>
                  <input
                    type="text"
                    name="notas"
                    placeholder="Ej. Entregar en garita, referencia..."
                    value={formData.notas}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Sección 2: Método de Pago */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-amber-600 flex items-center gap-2">
                <span>💳</span> Selección de Método de Pago
              </h2>

              <div className="space-y-3">
                <label
                  onClick={() => setMetodoPago("contraentrega")}
                  className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    metodoPago === "contraentrega"
                      ? "bg-amber-50/60 border-amber-500 text-slate-900"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/80"
                  }`}
                >
                  <input
                    type="radio"
                    name="metodoPago"
                    checked={metodoPago === "contraentrega"}
                    onChange={() => setMetodoPago("contraentrega")}
                    className="mt-1 accent-amber-500"
                  />
                  <div>
                    <p className="font-semibold text-sm text-slate-900">Pago Contra Entrega (Efectivo)</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Pagas en efectivo al momento de recibir tu pedido.
                    </p>
                  </div>
                </label>

                <label
                  onClick={() => setMetodoPago("transferencia")}
                  className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    metodoPago === "transferencia"
                      ? "bg-amber-50/60 border-amber-500 text-slate-900"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/80"
                  }`}
                >
                  <input
                    type="radio"
                    name="metodoPago"
                    checked={metodoPago === "transferencia"}
                    onChange={() => setMetodoPago("transferencia")}
                    className="mt-1 accent-amber-500"
                  />
                  <div>
                    <p className="font-semibold text-sm text-slate-900">Transferencia o Depósito Bancario</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Te proporcionaremos las cuentas bancarias para realizar tu depósito antes del envío.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Confirmar y Enviar Pedido por WhatsApp</span>
            </button>
          </form>

          {/* Resumen del Carrito (Columna derecha) */}
          <div className="md:col-span-5">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm sticky top-8 space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
                Resumen de la Orden
              </h2>

              <ul className="space-y-4 max-h-80 overflow-y-auto pr-1">
                {items.map((item) => (
                  <li key={item.slug} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      
                      {/* Aquí también mostramos la imagen si la hay */}
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-lg flex-shrink-0 overflow-hidden">
                        {item.imagen_url ? (
                          <img src={item.imagen_url} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          item.emoji || "⚡"
                        )}
                      </div>
                      
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 truncate">{item.name}</p>
                        <p className="text-slate-500">Cantidad: {item.qty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-amber-600 whitespace-nowrap">{item.price}</p>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.slug)}
                        className="text-[10px] text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Envío</span>
                  <span className="text-teal-600 font-medium">A coordinar con asesor</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total</span>
                  <span className="text-amber-600">Q {total.toLocaleString("es-GT")}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}