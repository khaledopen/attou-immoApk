import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Search, Smartphone, ShieldCheck, Menu, X, UserCheck } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900">
                Attou<span className="text-sky-600">Home</span>
              </span>
              <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider -mt-1">
                Immobilier en Côte d'Ivoire
              </span>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60">
            <Link
              to="/"
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                isActive('/') 
                  ? 'bg-white text-sky-600 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              Accueil
            </Link>
            <Link
              to="/annonces"
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                isActive('/annonces') 
                  ? 'bg-white text-sky-600 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              Catalogue
            </Link>
            <Link
              to="/proprietaire"
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                isActive('/proprietaire') 
                  ? 'bg-white text-sky-600 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              Espace Propriétaire
            </Link>
            <Link
              to="/locataire"
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                isActive('/locataire') 
                  ? 'bg-white text-sky-600 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              Espace Locataire
            </Link>
          </nav>

          {/* Boutons d'Action Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              Espace Admin
            </Link>
            <Link
              to="/annonces"
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-md shadow-sky-600/25 transition-all hover:scale-102"
            >
              <Search className="w-4 h-4" />
              Trouver un bien
            </Link>
          </div>

          {/* Bouton Hamburger Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Menu Mobile"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Dropped */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 px-4 font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            Accueil
          </Link>
          <Link
            to="/annonces"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 px-4 font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            Catalogue
          </Link>
          <Link
            to="/proprietaire"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 px-4 font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            Espace Propriétaire
          </Link>
          <Link
            to="/locataire"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 px-4 font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            Espace Locataire
          </Link>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/annonces"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-sky-600 text-white font-semibold py-3 rounded-xl shadow-xs"
            >
              <Search className="w-4 h-4" />
              Trouver un bien
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-slate-100 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-200 transition-colors text-sm"
            >
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              Connexion Administrateur
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
