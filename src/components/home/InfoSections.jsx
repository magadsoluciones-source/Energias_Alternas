// src/components/home/InfoSections.jsx

const infoSections = [
  {
    id: "paneles",
    color: "orange",
    label: "Paneles solares",
    title: "Paneles y Accesorios",
    text: "Para el producto de panel solar y accesorios como cable, cargador, etc., se proporciona 12 meses de servicio de garantía.",
    cta: { label: "Ver paneles en el catalogo", href: "#catalogo" },
  },
  {
    id: "bateria",
    color: "purple",
    label: "Estacion / bateria",
    title: "Centrales Portátiles y Respaldo",
    text: "Para el producto de la central eléctrica portátil, el período de garantía varía de 24 meses a 72 meses. Para el producto del sistema de respaldo para el hogar, el período de garantía varía de 48 meses a 60 meses.",
    cta: { label: "Ver baterias en el catalogo", href: "#catalogo" },
  },
  {
    id: "servicio",
    color: "teal",
    label: "Servicio de instalacion",
    title: "Condiciones Generales",
    text: "No se garantiza el producto de regalo. El período de garantía puede variar según el país, sujeto a las leyes y normativas locales.",
    cta: { label: "Hablar con un asesor", href: "#contacto" },
  },
];

const infoAccent = {
  orange: { text: "text-orange", bg: "bg-orange", bgSoft: "bg-orange/10" },
  purple: { text: "text-purple", bg: "bg-purple", bgSoft: "bg-purple/10" },
  teal: { text: "text-teal", bg: "bg-teal", bgSoft: "bg-teal/10" },
};

export default function InfoSections({ alHacerClicVerPuntos }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div className="max-w-lg">
          <p className="uppercase tracking-[0.2em] text-xs font-semibold mb-3 text-purple">
            Garantía de tu sistema
          </p>
          <h2 className="text-3xl md:text-4xl font-bold display mb-3">
            Términos de Garantia
          </h2>
          <p className="text-black/60 text-sm mb-2">
            BLUETTI garantiza al comprador original que el producto estará libre de
            defectos de fabricación y materiales.
          </p>
          <p className="text-black/60 text-sm">
            El período de garantía comienza en la fecha de compra por parte del
            comprador original.
          </p>
        </div>

        <div className="shrink-0 pb-1">
          <button
            onClick={alHacerClicVerPuntos}
            className="group inline-flex items-center justify-between gap-4 px-7 py-4 rounded-2xl bg-ink text-white font-bold text-base md:text-lg shadow-lg hover:bg-ink/90 hover:shadow-xl transition-all active:scale-[0.98] border border-black/10"
          >
            <span className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-purple animate-ping" />
              <span>Ver mas detalles de Garantia</span>
            </span>
            <span className="text-xl transition-transform group-hover:-translate-y-1">
              &uarr;
            </span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {infoSections.map((s) => {
          const c = infoAccent[s.color];
          return (
            <div
              key={s.id}
              id={s.id}
              className="scroll-mt-28 card-lift bg-white rounded-3xl border border-black/5 shadow-sm p-8 flex flex-col"
            >
              <div className={"w-10 h-10 rounded-full flex items-center justify-center mb-5 " + c.bgSoft}>
                <span className={"w-3 h-3 rounded-full " + c.bg} />
              </div>
              <p className={"text-xs font-semibold uppercase tracking-wide mb-2 " + c.text}>
                {s.label}
              </p>
              <h3 className="text-lg font-bold display mb-3">{s.title}</h3>
              <p className="text-sm text-black/60 mb-6 flex-1">{s.text}</p>
              <a href={s.cta.href} className={"text-sm font-semibold " + c.text}>
                {s.cta.label} &rarr;
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}