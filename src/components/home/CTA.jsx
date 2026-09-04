// src/components/home/CTA.jsx

export default function CTA() {
  return (
    <section id="contacto" className="max-w-6xl mx-auto px-6 py-24">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="rounded-3xl overflow-hidden shadow-lg order-2 md:order-1">
          <img
            src="/carlogosolares.jpeg"
            alt="Casa con panel solar, batería y carro bajo cochera solar — Energías Alternas"
            width={600}
            height={450}
            className="w-full h-[280px] object-cover"
          />
        </div>
        <div className="order-1 md:order-2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Te ayudamos a dimensionar tu sistema
          </h2>
          <p className="text-black/60 mb-8 max-w-md mx-auto md:mx-0">
            Cuéntanos tu consumo aproximado y te recomendamos el equipo correcto —
            sin sobrevenderte.
          </p>
          <a
            href="https://wa.me/50200000000"
            className="inline-block px-8 py-4 rounded-full text-white font-semibold bg-orange"
          >
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}