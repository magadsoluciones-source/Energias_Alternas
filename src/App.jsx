// src/App.jsx
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { CartDrawer } from "./cart/Cart.jsx";

import HomePage from "./pages/HomePage.jsx";

const CatalogPage = lazy(() => import("./pages/CatalogPage.jsx"));
const CheckoutPage = lazy(() => import("./cart/CheckoutPage.jsx"));
const PanelesPage = lazy(() => import("./pages/info/PanelesPage.jsx"));
const BateriaPage = lazy(() => import("./pages/info/BateriaPage.jsx"));
const ServicioPage = lazy(() => import("./pages/info/ServicioPage.jsx"));
const PanelAdminPage = lazy(() => import("./pages/admin/PanelAdminPage.jsx"));
const ProductPage = lazy(() => import("./pages/ProductPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

export default function App() {
  return (
    <>
      <Suspense fallback={<div className="h-screen flex items-center justify-center font-bold">Cargando...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/informacion/paneles" element={<PanelesPage />} />
          <Route path="/informacion/bateria" element={<BateriaPage />} />
          <Route path="/informacion/servicio" element={<ServicioPage />} />
          <Route path="/panel-control-9821" element={<PanelAdminPage />} />
          <Route path="/producto/:id" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <CartDrawer />
    </>
  );
}