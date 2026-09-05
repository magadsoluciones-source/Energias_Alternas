import { Link } from "react-router-dom";

/* ============ HERO (imagen grande de portada, con los puntitos que redirigen a las paginas de info) ============ */
const hotspots = [
  { top: "22%", left: "56%", color: "orange", title: "Declaración y Exclusiones de la Garantía", href: "/informacion/paneles" },
  { top: "48%", left: "68%", color: "purple", title: "Extensión de Garantía y Descargo de Responsabilidad", href: "/informacion/bateria" },
  { top: "70%", left: "40%", color: "teal", title: "Devolucion,Rembolso y Reclamacion", href: "/informacion/servicio" },
];

const dotColor = {
  orange: "border-orange text-orange",
  purple: "border-purple text-purple",
  teal: "border-teal text-teal",
};


/* ============ HERO (con puntos brillantes + cartelito de señalización) ============ */
export default function Hero({ esSeñalado }) {
  return (
    <>
      <section id="portada-hero" className="relative w-full min-h-[480px] md:min-h-[600px]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/casalogosolares.jpeg"
            alt="Casa con panel solar, bateria y carga vehicular - Energias Alternas"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/5" />
        </div>



        {/* Cartelito flotante de señalización que aparece al presionar el botón */}
        {esSeñalado && (
          <div className="absolute top-[32%] left-[25%] md:left-[35%] z-30 flex items-center gap-3 bg-black/75 backdrop-blur-md px-5 py-2.5 rounded-full shadow-2xl border border-white/30 animate-bounce transition-all">
            <span className="text-white font-bold text-xs md:text-sm tracking-wide">
              ¡Toca los puntos de la imagen!
            </span>
            <svg
              className="w-6 h-5 text-white animate-pulse"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        )}

        {/* Hotspots / Puntos interactivos con efecto de brillo */}
        <div className="absolute inset-0 z-20">
          {hotspots.map((h) => (
            <div key={h.title} className="hotspot-wrap absolute" style={{ top: h.top, left: h.left }}>
              <div className="relative flex items-center justify-center">
                {/* Anillo de brillo/expansión */}
                {esSeñalado && (
                  <span className="absolute w-8 h-8 rounded-full bg-white animate-ping opacity-75" />
                )}

                <Link
                  to={h.href}
                  className={
                    "hotspot w-5 h-5 rounded-full bg-white border-2 block transition-all duration-300 relative z-10 " +
                    dotColor[h.color] +
                    (esSeñalado ? " scale-150 ring-4 ring-white shadow-[0_0_20px_rgba(255,255,255,1)]" : "")
                  }
                  aria-label={h.title}
                />
              </div>

              <div className="tooltip absolute left-7 -top-2 w-44 bg-white rounded-xl p-3 shadow-lg text-xs">
                <p className={"font-semibold " + dotColor[h.color]}>{h.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 w-full h-full flex flex-col pl-2 pr-4 md:pl-4 md:pr-10 pt-20 md:pt-28 pb-10 md:pb-16 min-h-[480px] md:min-h-[600px] justify-center pointer-events-none">
          <div className="max-w-[260px] sm:max-w-xs md:max-w-md pointer-events-none text-left">
            <p className="uppercase tracking-[0.15em] text-[10px] sm:text-xs font-semibold mb-3 text-gold">
              Energia que no depende de nadie
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-6xl font-bold leading-[1.15] mb-3 md:mb-6 text-white display">
              Independencia <span className="text-gold">energetica,</span>
              <br />
              lista para instalar.
            </h1>
            <p className="hidden sm:block text-sm md:text-base text-white font-medium leading-relaxed drop-shadow-md">
              Sin ningún tipo de <span className="font-semibold text-white">mantenimiento, servicios, lubricantes u aceites</span>. Tienen una garantía de{" "}
              <span className="font-bold text-gold">10 años o 3,500 ciclos</span> de carga y descarga continua. Al llegar a los 10 años únicamente pierden el 20% y siguen funcionando al{" "}
              <span className="font-bold text-gold">80% de su capacidad</span>. Se cargan desde la red, vehículo, baterías o paneles.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="flex flex-wrap gap-6 md:gap-10 bg-white rounded-2xl px-6 py-5 w-fit shadow-lg text-sm">
          <div>
            <span className="block text-2xl font-bold display">10 años</span>
            <span className="text-black/60">o 3,500 ciclos de carga</span>
          </div>
          <div>
            <span className="block text-2xl font-bold display">80%</span>
            <span className="text-black/60">vida útil tras 10 años</span>
          </div>
          <div>
            <span className="block text-2xl font-bold display">0 mantenimiento</span>
            <span className="text-black/60">mantenimiento o gas</span>
          </div>
        </div>
      </div>
    </>
  );
}