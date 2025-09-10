import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";
import { Analytics } from "@vercel/analytics/react"


function AppContent() {
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // ✅ ahora sí funciona

  // Loader al entrar por primera vez
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Loader cada vez que cambias de página
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [location]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Loader />
      </div>
    );
  }

  return (
    <Routes>
      {/* Layout público */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        {/* más páginas públicas aquí */}
      </Route>

      {/* Layout admin */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
      <Analytics />
    </Router>
  );
}
