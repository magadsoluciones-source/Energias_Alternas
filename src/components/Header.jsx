import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../cart/Cart.jsx";

export function Header() {
  const { count, openCart } = useCart();
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      <div className="w-full flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="pointer-events-auto flex items-center gap-2 bg-cream pl-3 pr-6 sm:pr-10 py-3 rounded-br-[60px] shadow-sm shrink-0"
        >
          <img
            src="/logo.png"
            alt="Energías Alternas"
            width={283}
            height={170}
            className="h-12 sm:h-19 w-auto object-contain"
          />
          <span className="text-lg font-bold display tracking-tight hidden sm:inline">
            Energías <span className="text-orange">Alternas</span>
          </span>
        </Link>

        {/* Contenedor de botones */}
        <div className="pointer-events-auto flex items-center gap-3 sm:gap-5 pr-4 sm:pr-6 py-4">
          <nav className="hidden md:flex items-center gap-8 text-base font-semibold text-ink">
            <a href="/#catalogo" className="transition-colors hover:text-orange">Catálogo</a>
            <a href="/#mapa" className="transition-colors hover:text-orange">Cómo funciona</a>
            <a href="/#como-elegir" className="transition-colors hover:text-orange">Cómo elegir</a>
          </nav>

          <button
            onClick={openCart}
            aria-label="Ver carrito"
            className="relative p-2 rounded-full hover:bg-black/5 transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          <a
            href="/#contacto"
            className="hidden sm:inline-block px-4 py-2 rounded-full text-white text-sm font-semibold bg-ink transition-colors hover:bg-orange"
          >
            Mas detalles
          </a>

          {/* Botón Hamburguesa */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="md:hidden p-2 rounded-lg text-ink hover:bg-black/5 focus:outline-none active:scale-95 transition-transform"
            aria-label="Abrir menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuAbierto ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Tarjeta flotante compacta con animación suave */}
      {menuAbierto && (
        <div 
          style={{ position: 'fixed', top: '72px', right: '16px', width: '210px' }}
          className="pointer-events-auto md:hidden menu-floating-anim bg-cream border border-black/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-2.5 text-sm font-semibold text-ink z-50 origin-top-right"
        >
          <a
            href="/#catalogo"
            onClick={() => setMenuAbierto(false)}
            className="py-1.5 px-3 rounded-lg hover:bg-black/5 hover:text-orange transition-colors"
          >
            Catálogo
          </a>
          <a
            href="/#mapa"
            onClick={() => setMenuAbierto(false)}
            className="py-1.5 px-3 rounded-lg hover:bg-black/5 hover:text-orange transition-colors"
          >
            Cómo funciona
          </a>
          <a
            href="/#como-elegir"
            onClick={() => setMenuAbierto(false)}
            className="py-1.5 px-3 rounded-lg hover:bg-black/5 hover:text-orange transition-colors"
          >
            Cómo elegir
          </a>
          <a
            href="/#contacto"
            onClick={() => setMenuAbierto(false)}
            className="py-2 text-center rounded-full text-white text-xs bg-ink hover:bg-orange transition-colors mt-1 shadow-sm"
          >
            Más detalles
          </a>
        </div>
      )}
    </header>
  );
}