import { Link } from "react-router-dom";
import { Header } from "../../components/Header.jsx";
import { Footer } from "../../components/Footer.jsx";

export default function PanelesPage() {
  return (
    <>
      <Header />

      {/* Hero Banner */}
      <section className="relative w-full min-h-[380px] md:min-h-[440px] overflow-hidden">
        <img
          src="/casalogosolares.jpeg"
          alt="Declaración y Exclusiones de la Garantía"
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
          <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-2 text-orange">
            Políticas de Garantía
          </p>
          <h1 className="text-3xl md:text-5xl font-bold display text-white max-w-xl leading-tight">
            Declaración y Exclusiones de la Garantía
          </h1>
          <p className="text-white/80 text-sm md:text-base mt-3 max-w-md">
            Términos, requisitos de compra y limitaciones de cobertura
          </p>
        </div>

        <div className="absolute top-6 right-6 md:top-10 md:right-10 z-10 rounded-2xl px-5 py-4 text-white shadow-lg bg-orange">
          <span className="block text-2xl md:text-3xl font-bold display">BLUETTI</span>
          <span className="text-xs md:text-sm text-white/90">Garantia Oficial</span>
        </div>
      </section>

      {/* Contenido Principal con todo el texto del PDF */}
      <section className="max-w-4xl mx-auto px-6 py-14 space-y-10">

        {/* SECCIÓN 1: Declaración de garantía */}
        <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold display text-ink border-b pb-3">
            Declaración de garantía
          </h2>
          
          <p className="text-black/70 text-sm md:text-base leading-relaxed">
            Cualquier defecto de material o fabricación de su producto estará cubierto una vez que presente un comprobante de compra válido e información como, entre otros:
          </p>

          <ul className="list-disc list-inside text-black/70 text-sm md:text-base space-y-2 pl-2">
            <li>
              Un número de pedido comprado realizado a través de las tiendas oficiales de BLUETTI.
            </li>
            <li>
              Factura de venta o correo electrónico de confirmación de pedido que muestra claramente la descripción del producto, su precio y canal de venta.
            </li>
          </ul>

          <div className="mt-4 p-4 rounded-2xl bg-orange/10 border border-orange/20 text-sm text-black/80">
            <p>
              <strong>Nota:</strong> La garantía limitada se limita al país de compra. La garantía perderá su validez una vez que los artículos se lleven o envíen a otros países.
            </p>
          </div>
        </div>

        {/* SECCIÓN 2: Exclusiones de la garantía */}
        <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold display text-ink border-b pb-3">
            Exclusiones de la garantía
          </h2>

          <ol className="list-decimal list-inside text-black/70 text-sm md:text-base space-y-3 leading-relaxed">
            <li>
              Mal uso, abuso, daños accidentales o por fuerza mayor (p. ej., rayos, tornados, huracanes, etc.);
            </li>
            <li>
              Modificación, reparación, desmontaje u operación no autorizada que no se ajuste a las instrucciones o manuales oficiales;
            </li>
            <li>
              Compra a revendedores no autorizados;
            </li>
            <li>
              Uso para fines especiales distintos del uso normal del consumidor;
            </li>
            <li>
              Producto perdido, robado o con reembolso completo;
            </li>
            <li>
              Cualquier defecto o daño causado por la exposición a calor, frío o líquidos excesivos u otras causas externas;
            </li>
            <li>
              Comprobante de compra no válido;
            </li>
            <li>
              Período de garantía vencido;
            </li>
            <li>
              El modelo de batería del certificado de garantía no coincide con el artículo real;
            </li>
            <li>
              Alteración no autorizada del certificado de garantía;
            </li>
            <li>
              Desgaste del producto por el uso.
            </li>
          </ol>
        </div>

      </section>

      {/* CTA final */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="rounded-3xl px-8 py-10 md:py-14 text-center text-white bg-gradient-to-br from-orange/90 to-ink">
          <h2 className="text-2xl md:text-3xl font-bold display mb-3">
            ¿Tienes alguna consulta ?
          </h2>
          <p className="text-white/85 mb-6 max-w-md mx-auto text-sm md:text-base">
            Estamos listos para ayudarte.
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