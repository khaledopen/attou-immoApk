import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { Menu } from 'lucide-react';

// Layouts & Guards
import PublicLayout from './layouts/PublicLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/public/Home';
import PublicProperties from './pages/public/PublicProperties';
import PropertyDetail from './pages/public/PropertyDetail';
import LandlordPortal from './pages/public/LandlordPortal';
import TenantPortal from './pages/public/TenantPortal';

// Admin Pages & Components
import Sidebar from './components/Sidebar';
import AdminDashboard from './pages/AdminDashboard';
import Properties from './pages/Properties';
import Moderation from './pages/Moderation';
import Users from './pages/Users';
import Visits from './pages/Visits';
import Settings from './pages/Settings';
import Login from './pages/Login';

// Configurer l'intercepteur de requête pour injecter le token JWT
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('admin_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const handleLoginSuccess = (newToken, user) => {
    localStorage.setItem('admin_token', newToken);
    localStorage.setItem('admin_user', JSON.stringify(user));
    setToken(newToken);
    setAdminUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setToken(null);
    setAdminUser(null);
  };

  // Layout pour l'espace d'Administration avec Sidebar
  const AdminLayout = () => {
    return (
      <div className="flex min-h-screen bg-slate-50 text-slate-900 relative">
        {/* Header mobile admin */}
        <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-40 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-slate-900">
              Attou<span className="text-sky-600 font-bold">Nest Admin</span>
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600 cursor-pointer"
          >
            <Menu size={24} />
          </button>
        </header>

        <Sidebar 
          onLogout={handleLogout} 
          user={adminUser} 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        <main className="flex-1 lg:ml-72 min-h-screen pt-16 lg:pt-0 w-full overflow-hidden">
          <Outlet />
        </main>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        
        {/* ─── 1. ROUTES PUBLIQUES (Locataires & Propriétaires) ─── */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/annonces" element={<PublicProperties />} />
          <Route path="/annonces/:id" element={<PropertyDetail />} />
          <Route path="/proprietaire" element={<LandlordPortal />} />
          <Route path="/locataire" element={<TenantPortal />} />
        </Route>

        {/* ─── 2. CONNEXION ADMIN ─── */}
        <Route 
          path="/login" 
          element={
            token ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          } 
        />

        {/* ─── 3. ROUTES ADMINISTRATEUR PROTÉGÉES (/admin/*) ─── */}
        <Route element={<ProtectedRoute token={token} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="properties" element={<Properties />} />
            <Route path="moderation" element={<Moderation />} />
            <Route path="users" element={<Users />} />
            <Route path="visits" element={<Visits />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Catch-all redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
};

export default App;
