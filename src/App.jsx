import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // 👈 No necesitas "BrowserRouter" aquí
import Loader from "./components/Loader";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";
import { Analytics } from "@vercel/analytics/react"
import Productos from "./pages/Productos"

function App() { // 👈 Ahora App es el componente principal
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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
    <> {/* 👈 Fragmento para envolver */}
      <Routes>
        {/* Layout público */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Productos" element={<Productos/>}/>

        </Route>

        {/* Layout admin */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
      <Analytics />
    </>
  );
}

export default App;