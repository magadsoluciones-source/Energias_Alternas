/* Pie de pagina, se usa igual en todas las paginas */
export function Footer() {
  return (
    <footer className="border-t border-black/10 py-8 text-center text-xs text-black/50">
      © {new Date().getFullYear()} Energías Alternas · Guatemala
    </footer>
  );
}
