import { Link } from "react-router-dom";
import { Header } from "../../components/Header.jsx";
import { Footer } from "../../components/Footer.jsx";

export default function ServicioPage() {
  return (
    <>
      <Header />

      {/* Hero Banner */}
      <section className="relative w-full min-h-[380px] md:min-h-[440px] overflow-hidden">
        <img
          src="/casalogosolares.jpeg"
          alt="Devolución, Reembolso y Proceso de Reclamación"
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
          <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-2 text-teal">
            Políticas de Servicio
          </p>
          <h1 className="text-3xl md:text-5xl font-bold display text-white max-w-xl leading-tight">
            Devolución, Reembolso y Proceso de Reclamación
          </h1>
          <p className="text-white/80 text-sm md:text-base mt-3 max-w-md">
            Información completa sobre cancelaciones, reembolsos y soporte técnico
          </p>
        </div>

        <div className="absolute top-6 right-6 md:top-10 md:right-10 z-10 rounded-2xl px-5 py-4 text-white shadow-lg bg-teal">
          <span className="block text-2xl md:text-3xl font-bold display">BLUETTI</span>
          <span className="text-xs md:text-sm text-white/90">Garantia oficial</span>
        </div>
      </section>

      {/* Contenido Completo del PDF */}
      <section className="max-w-4xl mx-auto px-6 py-14 space-y-10">

        {/* SECCIÓN 1: Devolución y reembolso */}
        <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold display text-ink border-b pb-3">
            Devolución y reembolso
          </h2>
          
          <div className="space-y-4 text-black/70 text-sm md:text-base leading-relaxed">
            <div>
              <h3 className="font-semibold text-ink text-base md:text-lg mb-1">
                • Cancelación de pedido:
              </h3>
              <p className="pl-4">
                El cliente puede solicitar la cancelación del pedido dentro de las 48 horas posteriores a su realización por correo electrónico o teléfono en la tienda oficial de BLUETTI. Si el producto ya se ha enviado, se aplicará un cargo por interceptación.
              </p>
            </div>

            <div>
              <p className="font-medium text-black/80 pl-4">
                • La garantía de devolución de dinero de 30 días se acreditará automáticamente en su pedido.
              </p>
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: Proceso de reclamación */}
        <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold display text-ink border-b pb-3">
            Proceso de reclamación
          </h2>

          <ul className="space-y-4 text-black/70 text-sm md:text-base leading-relaxed list-disc list-inside">
            <li>
              <strong className="text-ink">Comuníquese con nosotros por correo electrónico:</strong>{" "}
              <span className="text-teal font-semibold">service@bluettipower.com</span>, de lunes a domingo, para cualquier asistencia con el producto.
            </li>
            
            <li>
              Para cualquier reclamo de garantía, el servicio lo realiza BLUETTI o un socio de servicio autorizado local, sujeto a las siguientes opciones:
              <ul className="pl-6 mt-2 space-y-1 list-circle list-inside text-black/80">
                <li>Reparado por el centro de servicio BLUETTI, o</li>
                <li>Intercambio por un producto de reemplazo con especificaciones equivalentes según modelo y vida útil.</li>
              </ul>
            </li>

            <li>
              En caso de reemplazo, se podrá proporcionar un modelo reacondicionado de igual valor y la entrega del reemplazo se organizará dentro de los 7 días hábiles (sujeto a cambios causados por fuerza mayor) después de confirmar que se ha recibido el artículo defectuoso en el almacén de BLUETTI.
            </li>

            <li>
              Un producto de intercambio asume la garantía restante del producto original o treinta (30) días a partir de la fecha de reemplazo, lo que sea mayor.
            </li>

            <li>
              Para cualquier reclamación fuera de garantía, póngase en contacto previamente con el servicio técnico de BLUETTI para obtener más detalles.
            </li>
          </ul>
        </div>

      </section>

      {/* CTA final */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="rounded-3xl px-8 py-10 md:py-14 text-center text-white bg-gradient-to-br from-teal/90 to-ink">
          <h2 className="text-2xl md:text-3xl font-bold display mb-3">
            ¿Necesitas ayuda con un pedido o garantía?
          </h2>
          <p className="text-white/85 mb-6 max-w-md mx-auto text-sm md:text-base">
            Estamos disponibles para asesorarte en cualquier momento.
          </p>
          <Link to="/#contacto" className="inline-block px-7 py-3 rounded-full bg-white text-ink font-semibold">
            Hablar con un asesor
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}