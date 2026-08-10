import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Search, ShieldCheck, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Catalogue', path: '/annonces' },
    { name: 'Propriétaires', path: '/proprietaire' },
    { name: 'Locataires', path: '/locataire' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/70 shadow-sm py-3.5'
          : 'bg-primary-800/70 backdrop-blur-md py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/favicon.png" className="w-10 h-10 rounded-xl shadow-md shadow-primary-500/20 group-hover:scale-105 transition-all object-cover" alt="Logo" />
            <div>
              <span className={`text-xl font-black tracking-tight transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
                Attou<span className="text-primary-500">Home</span>
              </span>
              <span className={`block text-[9px] font-bold uppercase tracking-widest -mt-1 transition-colors ${isScrolled ? 'text-slate-400' : 'text-slate-300'}`}>
                Côte d'Ivoire
              </span>
            </div>
          </Link>

          {/* Nav Desktop */}
          <nav className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all ${
            isScrolled
              ? 'bg-slate-100/80 border-slate-200/80'
              : 'bg-white/10 border-white/20 text-white backdrop-blur-md'
          }`}>
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    active
                      ? isScrolled
                        ? 'text-primary-700 font-bold'
                        : 'text-white font-bold'
                      : isScrolled
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-slate-200 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activePill"
                      className={`absolute inset-0 rounded-full shadow-xs ${
                        isScrolled ? 'bg-white' : 'bg-white/20'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions Right */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-all ${
                isScrolled
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-primary-500" />
              Espace Admin
            </Link>

            <Link
              to="/annonces"
              className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md shadow-primary-500/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Search className="w-3.5 h-3.5" />
              Trouver un bien
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors ${
              isScrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 px-5 pt-3 pb-6 shadow-xl"
          >
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors ${
                    isActive(link.path)
                      ? 'bg-primary-50 text-primary-600 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
              <Link
                to="/annonces"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-primary-500 text-white font-bold py-3 rounded-xl shadow-xs text-sm"
              >
                <Search className="w-4 h-4" />
                Trouver un bien
              </Link>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-slate-100 text-slate-700 font-semibold py-2.5 rounded-xl hover:bg-slate-200 transition-colors text-xs"
              >
                <ShieldCheck className="w-4 h-4 text-primary-600" />
                Accès Administrateur
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
