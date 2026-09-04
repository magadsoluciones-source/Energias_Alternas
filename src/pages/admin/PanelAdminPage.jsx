// src/pages/admin/PanelAdminPage.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { getProducts, updateDisponibilidad } from '../../services/productsService';
import { Header } from '../../components/Header.jsx';
import { Footer } from '../../components/Footer.jsx';

// Agrega el manifest, el ícono y el service worker SOLO mientras el usuario
// está en esta ruta. Al salir de la página, se quitan las etiquetas del <head>.
function usePanelPWA() {
  useEffect(() => {
    const tags = [];

    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/panel-manifest.json';
    document.head.appendChild(manifestLink);
    tags.push(manifestLink);

    const appleIcon = document.createElement('link');
    appleIcon.rel = 'apple-touch-icon';
    appleIcon.href = '/icons/panel/apple-touch-icon.png';
    document.head.appendChild(appleIcon);
    tags.push(appleIcon);

    const themeColor = document.createElement('meta');
    themeColor.name = 'theme-color';
    themeColor.content = '#0a0a0a';
    document.head.appendChild(themeColor);
    tags.push(themeColor);

    const appleCapable = document.createElement('meta');
    appleCapable.name = 'apple-mobile-web-app-capable';
    appleCapable.content = 'yes';
    document.head.appendChild(appleCapable);
    tags.push(appleCapable);

    const appleStatusBar = document.createElement('meta');
    appleStatusBar.name = 'apple-mobile-web-app-status-bar-style';
    appleStatusBar.content = 'black-translucent';
    document.head.appendChild(appleStatusBar);
    tags.push(appleStatusBar);

    const appleTitle = document.createElement('meta');
    appleTitle.name = 'apple-mobile-web-app-title';
    appleTitle.content = 'Energías Alternas';
    document.head.appendChild(appleTitle);
    tags.push(appleTitle);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw-panel.js', { scope: '/panel-control-9821' })
        .catch((err) => console.error('Error registrando service worker del panel:', err));
    }

    return () => {
      tags.forEach((tag) => tag.remove());
    };
  }, []);
}

export default function PanelAdminPage() {
  usePanelPWA();

  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingSession(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 text-sm">
        Cargando panel...
      </div>
    );
  }

  return session ? <ListaProductos /> : <LoginForm />;
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setEnviando(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) setError('Credenciales incorrectas');
    setEnviando(false);
  }

  return (
    <>
      <Header />
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
          <div className="text-center mb-8">
            <span className="text-3xl">🔐</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">Panel Admin</h2>
            <p className="text-xs text-slate-500 mt-1">Ingresa tus credenciales para gestionar el inventario</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                placeholder="admin@energiasalternas.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-center font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={enviando}
              className="w-full bg-ink hover:bg-orange text-white font-semibold py-3.5 rounded-xl text-sm transition-colors cursor-pointer shadow-md mt-2"
            >
              {enviando ? 'Entrando...' : 'Entrar al Panel'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargar();
  }, []);

  async function cargar() {
    setLoading(true);
    const data = await getProducts();
    setProductos(data);
    setLoading(false);
  }

  async function handleToggle(id, valorActual) {
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, disponible: !valorActual } : p))
    );
    try {
      await updateDisponibilidad(id, !valorActual);
    } catch (err) {
      setProductos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, disponible: valorActual } : p))
      );
      alert('Error al actualizar. Intenta de nuevo.');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 text-sm">
        Cargando productos del inventario...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Barra superior de control */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚡</span>
            <h1 className="text-lg font-bold text-slate-900">Panel Admin — Existencias y Catálogo</h1>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 pt-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Gestión de Stock de Productos</h2>
            <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">
              Total: {productos.length} productos
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Producto</th>
                  <th className="px-6 py-3.5">Categoría</th>
                  <th className="px-6 py-3.5 text-center">Disponible en Tienda</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {productos.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {p.imagenes?.[0] ? (
                          <img src={p.imagenes[0]} alt="" className="w-full h-full object-cover" />
                        ) : (
                          "☀️"
                        )}
                      </div>
                      <span className="truncate max-w-xs">{p.nombre}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md font-medium">
                        {p.categoria}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={p.disponible}
                        onChange={() => handleToggle(p.id, p.disponible)}
                        className="w-4 h-4 accent-amber-500 cursor-pointer rounded"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}