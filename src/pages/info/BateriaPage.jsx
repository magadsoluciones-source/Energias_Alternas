import { Link } from "react-router-dom";
import { Header } from "../../components/Header.jsx";
import { Footer } from "../../components/Footer.jsx";

export default function BateriaPage() {
  return (
    <>
      <Header />

      {/* Hero Banner */}
      <section className="relative w-full min-h-[380px] md:min-h-[440px] overflow-hidden">
        <img
          src="/casalogosolares.jpeg"
          alt="Extensión de Garantía y Términos Legales"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/10" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 h-full flex flex-col justify-end pb-14 pt-24 min-h-[380px] md:min-h-[440px]">
          <Link
            to="/"
            className="text-sm font-semibold text-ink bg-white/95 hover:bg-white px-4 py-2 rounded-full mb-6 inline-flex items-center gap-1.5 w-fit shadow-md"
          >
            &larr; Volver al inicio
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-2 text-purple">
            Términos Legales y Garantía
          </p>
          <h1 className="text-3xl md:text-5xl font-bold display text-white max-w-xl leading-tight">
            Extensión de Garantía y Descargo de Responsabilidad
          </h1>
          <p className="text-white/80 text-sm md:text-base mt-3 max-w-md">
            Información oficial sobre garantías extendidas y limitaciones legales
          </p>
        </div>

        <div className="absolute top-6 right-6 md:top-10 md:right-10 z-10 rounded-2xl px-5 py-4 text-white shadow-lg bg-purple">
          <span className="block text-2xl md:text-3xl font-bold display">BLUETTI</span>
          <span className="text-xs md:text-sm text-white/90">Garantía Oficial</span>
        </div>
      </section>

      {/* Contenido Principal con todo el texto del PDF */}
      <section className="max-w-4xl mx-auto px-6 py-14 space-y-10">

        {/* SECCIÓN 1: Extensión de garantía */}
        <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold display text-ink border-b pb-3">
            Extensión de garantía
          </h2>

          <ul className="space-y-4 text-black/70 text-sm md:text-base leading-relaxed list-disc list-inside">
            <li>
              La extensión de garantía ahora solo se aplica a los modelos AC200MAX, AC200P o B230 adquiridos en el sitio web oficial de BLUETTI con protección contra daños sin cargo por servicio.
            </li>
            <li>
              Cualquier compra de los cuatro modelos desde otras plataformas requiere enviar la solicitud de garantía extendida mediante el siguiente enlace:{" "}
              <a
                href="https://www.bluettipower.com/pages/warranty-extend"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple font-semibold underline break-all hover:text-purple/80"
              >
                https://www.bluettipower.com/pages/warranty-extend
              </a>
            </li>
          </ul>
        </div>

        {/* SECCIÓN 2: Descargo de responsabilidad de garantías implícitas */}
        <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold display text-ink border-b pb-3">
            Descargo de responsabilidad de garantías implícitas
          </h2>

          <div className="space-y-4 text-black/70 text-sm md:text-base leading-relaxed">
            <p>
              Esta garantía limitada sustituye a cualquier otra garantía, expresa o implícita, incluyendo cualquier garantía de idoneidad para un fin o uso particular y cualquier garantía implícita de comerciabilidad aplicable a los generadores solares portátiles BLUETTI. BLUETTI y sus empresas afiliadas no serán responsables de ningún daño especial, incidental o consecuente, incluyendo el lucro cesante. No se extienden garantías distintas a las aquí estipuladas.
            </p>
            <p>
              Esta garantía limitada solo puede ser modificada por BLUETTI. Cualquier garantía implícita permitida por ley tendrá una duración limitada a los términos de la garantía expresa aquí estipulada. Algunos estados no permiten limitaciones a la duración de una garantía implícita, por lo que la limitación anterior podría no aplicarse en su caso.
            </p>
            <p>
              Esta garantía le otorga derechos legales específicos. También tiene otros derechos según el estado. La única responsabilidad de BLUETTI será la reparación o el reemplazo, como se indica anteriormente.
            </p>
          </div>
        </div>

      </section>

      {/* CTA final original */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="rounded-3xl px-8 py-10 md:py-14 text-center text-white bg-gradient-to-br from-purple/90 to-ink">
          <h2 className="text-2xl md:text-3xl font-bold display mb-3">¿Tienes alguna consulta ?</h2>
          <p className="text-white/85 mb-6 max-w-md mx-auto text-sm md:text-base">
            Estamos listos para ayudarte a elegir .
          </p>
          <Link to="/#catalogo" className="inline-block px-7 py-3 rounded-full bg-white text-ink font-semibold">
            Ver catálogo de productos
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}