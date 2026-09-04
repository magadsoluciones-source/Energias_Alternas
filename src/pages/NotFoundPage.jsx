import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold display mb-3">Página no encontrada</h1>
      <p className="text-black/60 mb-6">La página que buscas no existe.</p>
      <Link to="/" className="px-6 py-3 rounded-full bg-ink text-white font-semibold hover:bg-orange transition-colors">
        Volver al inicio
      </Link>
    </div>
  );
}
