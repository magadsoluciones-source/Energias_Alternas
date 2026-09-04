// src/components/home/HowToChoose.jsx
import { useState } from "react";

const HEAVY_APPLIANCES = [
  { id: "ac", label: "Aire Acondicionado" },
  { id: "secadora", label: "Secadora de ropa" },
  { id: "estufa", label: "Estufa eléctrica" },
  { id: "calentador", label: "Calentador de agua" },
];

// TODO: reemplaza esto con tu número real de WhatsApp (código de país + número, sin + ni espacios)
const WHATSAPP_NUMBER = "50239238333";

// Ojo: Se exporta como "export function" (no default) para coincidir con cómo lo importaste en HomePage.
export function HowToChoose({ onCalculate }) {
  const [formData, setFormData] = useState({
    tipoPropiedad: "casa",
    tipoSistema: "respaldo",
    aparatosAltos: [],
    montoRecibo: "",
  });

  const handleCheckboxChange = (id) => {
    setFormData((prev) => {
      const exists = prev.aparatosAltos.includes(id);
      return {
        ...prev,
        aparatosAltos: exists
          ? prev.aparatosAltos.filter((item) => item !== id)
          : [...prev.aparatosAltos, id],
      };
    });
  };

  const hasAC = formData.aparatosAltos.includes("ac");

  // Arma el texto que se enviará por WhatsApp con la info seleccionada
  const buildWhatsAppMessage = (data) => {
    const propiedad = data.tipoPropiedad === "casa" ? "Casa" : "Negocio";
    const sistema =
      data.tipoSistema === "respaldo"
        ? "Respaldo + Ahorro"
        : "Aislado 24/7 (Off-Grid)";
    const aparatos =
      data.aparatosAltos.length > 0
        ? data.aparatosAltos
            .map((id) => HEAVY_APPLIANCES.find((a) => a.id === id)?.label)
            .filter(Boolean)
            .join(", ")
        : "Ninguno";
    const recibo = data.montoRecibo
      ? `Q${data.montoRecibo}`
      : "No especificado";

    return (
      `Hola, quiero solicitar una asesoría para dimensionar mi sistema solar.\n\n` +
      `*Lugar de instalación:* ${propiedad}\n` +
      `*Objetivo del sistema:* ${sistema}\n` +
      `*Aparatos de alto consumo:* ${aparatos}\n` +
      `*Promedio recibo de luz:* ${recibo}`
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onCalculate) {
      onCalculate(formData);
    }

    const mensaje = buildWhatsAppMessage(formData);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="como-elegir" className="py-20 bg-ink">
      <div className="max-w-6xl mx-auto px-6 text-white">
        <p className="uppercase tracking-[0.2em] text-xs font-semibold mb-3 text-gold">
          Asesor Técnico
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 max-w-xl">
          Dimensiona tu sistema solar ideal
        </h2>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Paso 1 */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-4xl font-bold display mb-3 text-orange">01</p>
                <h3 className="font-semibold mb-1 text-lg">Uso y Consumo Mensual</h3>
                <p className="text-white/60 text-xs mb-4">
                  Define el perfil de tu propiedad y tu gasto energético.
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-xs text-white/80 font-medium">Lugar de instalación:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tipoPropiedad: "casa" })}
                    className={`p-3 rounded-xl border text-xs text-center transition-all ${
                      formData.tipoPropiedad === "casa"
                        ? "bg-white/10 border-white text-white font-medium"
                        : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    Casa
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tipoPropiedad: "negocio" })}
                    className={`p-3 rounded-xl border text-xs text-center transition-all ${
                      formData.tipoPropiedad === "negocio"
                        ? "bg-white/10 border-white text-white font-medium"
                        : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    Negocio
                  </button>
                </div>

                <div className="pt-2">
                  <label className="block text-xs text-white/80 font-medium mb-1.5">
                    Promedio en tu recibo de luz (Q):
                  </label>
                  <input
                    type="number"
                    placeholder="Ej. 1500"
                    value={formData.montoRecibo}
                    onChange={(e) => setFormData({ ...formData, montoRecibo: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-orange-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Paso 2 */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-4xl font-bold display mb-3 text-purple">02</p>
                <h3 className="font-semibold mb-1 text-lg">Cargas Altas o Constantes</h3>
                <p className="text-white/60 text-xs mb-4">
                  Selecciona los aparatos de alto consumo en tu propiedad.
                </p>
              </div>

              <div className="space-y-2">
                {HEAVY_APPLIANCES.map((appliance) => {
                  const isChecked = formData.aparatosAltos.includes(appliance.id);
                  return (
                    <label
                      key={appliance.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        isChecked
                          ? "bg-white/10 border-purple-400 text-white font-medium"
                          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckboxChange(appliance.id)}
                        className="rounded bg-white/10 border-white/20 text-purple-500 focus:ring-0 focus:ring-offset-0"
                      />
                      {appliance.label}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Paso 3 */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-4xl font-bold display mb-3 text-teal">03</p>
                <h3 className="font-semibold mb-1 text-lg">Objetivo del Sistema</h3>
                <p className="text-white/60 text-xs mb-4">
                  ¿Cómo planeas operar tu sistema solar?
                </p>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, tipoSistema: "respaldo" })}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all ${
                    formData.tipoSistema === "respaldo"
                      ? "bg-white/10 border-teal-400 text-white font-medium"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                  }`}
                >
                  <p className="font-semibold mb-0.5">Respaldo + Ahorro</p>
                  <p className="text-white/50 text-[11px]">Bajar consumo y protegerse ante cortes.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, tipoSistema: "offgrid" })}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all ${
                    formData.tipoSistema === "offgrid"
                      ? "bg-white/10 border-teal-400 text-white font-medium"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                  }`}
                >
                  <p className="font-semibold mb-0.5">Aislado 24/7 (Off-Grid)</p>
                  <p className="text-white/50 text-[11px]">Dependencia total de baterías y paneles.</p>
                </button>
              </div>
            </div>
          </div>

          {hasAC && (
            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 text-xs text-orange-200/90 leading-relaxed">
              <p className="font-semibold text-orange-400 mb-1">
                💡 Nota técnica sobre Aire Acondicionado (12,000 BTU):
              </p>
              Un A/C consume ~1,300W continuos (equivalente a 26 ventiladores encendidos a la vez). Recomendamos dejar los A/C atados a la red eléctrica y respaldar todo el resto de la carga de la propiedad con el generador solar para optimizar la rentabilidad de las baterías.
            </div>
          )}

          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              className="bg-gold text-ink font-semibold px-8 py-3.5 rounded-xl text-sm hover:opacity-90 transition-all shadow-lg cursor-pointer"
            >
              Solicitar Asesoría y Dimensionamiento
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}