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

/* ============ Iconitos de redes sociales ============
   Se centran horizontalmente en el espacio vacío entre el logo y el menú/carrito.
   Como viven dentro de Hero (no del Header), se van con el scroll normal:
   solo se ven en la parte de arriba de la página de inicio.
   Si al probarlo se ven un poco arriba o abajo de más, ajusta el valor de "top" de abajo. */
const socialLinks = {
  instagram: "https://www.instagram.com/energialterna",
  facebook: "https://facebook.com/energialterna",
};

function SocialIcons() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[20px] sm:top-[24px] md:top-[28px] z-30 flex items-center gap-4">
      <a
        href={socialLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="transition-transform hover:scale-110 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
      >
        <svg width="34" height="34" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="igGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#feda75" />
              <stop offset="25%" stopColor="#fa7e1e" />
              <stop offset="50%" stopColor="#d62976" />
              <stop offset="75%" stopColor="#962fbf" />
              <stop offset="100%" stopColor="#4f5bd5" />
            </linearGradient>
          </defs>
          <path
            fill="url(#igGradient)"
            d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.795.646-1.439 1.44-1.439.793-.001 1.44.644 1.44 1.439z"
          />
        </svg>
      </a>

      <a
        href={socialLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="transition-transform hover:scale-110 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
      >
        <svg width="34" height="34" viewBox="0 0 24 24">
          <path
            fill="#0a2540"
            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          />
        </svg>
      </a>
    </div>
  );
}

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

        <SocialIcons />

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