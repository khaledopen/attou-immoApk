import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Phone, Mail, Shield, Smartphone, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-slate-800">
          
          {/* Colonne 1 : Branding & Présentation */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center text-white font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Attou<span className="text-primary-500">Home</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              La plateforme immobilière moderne en Côte d'Ivoire. Nous simplifions la recherche, la mise en location et la gestion immobilière pour locataires et propriétaires.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-full w-fit">
              <Shield className="w-3.5 h-3.5" />
              Annonces vérifiées & sécurisées
            </div>
          </div>

          {/* Colonne 2 : Liens Rapides */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base tracking-wide uppercase text-xs text-primary-400">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/annonces" className="hover:text-white transition-colors">
                  Toutes les Annonces
                </Link>
              </li>
              <li>
                <Link to="/proprietaire" className="hover:text-white transition-colors">
                  Espace Propriétaire
                </Link>
              </li>
              <li>
                <Link to="/locataire" className="hover:text-white transition-colors">
                  Espace Locataire
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white text-slate-400 text-xs transition-colors flex items-center gap-1 mt-2">
                  → Accès Administration
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base tracking-wide uppercase text-xs text-primary-400">
              Contact & Siège
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                <span>Abidjan, Côte d'Ivoire</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-500 shrink-0" />
                <span>+225 07 12 29 64 41</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500 shrink-0" />
                <span>contact@attouhome.ci</span>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Mobile Apps */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base tracking-wide uppercase text-xs text-primary-400">
              Applications Mobile
            </h3>
            <p className="text-slate-400 text-sm">
              Téléchargez nos applications mobiles dédiées pour une expérience optimisée sur iOS & Android.
            </p>
            <div className="space-y-4">
              <div>
                <div className="text-xs font-bold text-white mb-2 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-primary-400" />
                  AttouHome Locataire
                </div>
                <div className="flex gap-2">
                  <a href="#" className="flex items-center gap-1.5 bg-black text-white px-2 py-1 rounded-md border border-slate-700 hover:bg-slate-800 transition-colors w-1/2 justify-center">
                    <svg viewBox="0 0 384 512" className="w-3.5 h-3.5 fill-white">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-48.7-22.7-77.9-22c-39.3 .6-75.3 22.8-95.6 57.8-41.3 71-10.5 174.6 29.3 231.8 19.5 28.1 42.4 59.4 72.8 58.2 28.9-1.2 39.6-18.6 74.4-18.6 34.6 0 44.7 18.6 74.9 18C330.6 504 351 476 370 448c21.9-31.9 31-63.5 31.5-65.1-.7-.3-60.4-23.2-60.8-92.2zM292 86.8c15.8-19.1 26.4-45.7 23.5-72.3-22.9 1-50.7 15.3-67.1 34.5-14.2 16.4-26.6 43.4-23.7 69.6 25.5 2 51.6-12.7 67.3-31.8z"/>
                    </svg>
                    <div className="text-[7px] text-left leading-none">
                      <span className="text-[5px] block text-slate-400">Download on</span>
                      <strong>App Store</strong>
                    </div>
                  </a>
                  <a href="#" className="flex items-center gap-1.5 bg-black text-white px-2 py-1 rounded-md border border-slate-700 hover:bg-slate-800 transition-colors w-1/2 justify-center">
                    <svg viewBox="0 0 512 512" className="w-3.5 h-3.5 fill-white">
                      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58 33.2-60.1-60.1L472.2 35.3c7.9 4.5 13.5 12.3 13.5 21.8v336.5c0 9.5-5.6 17.3-13.5 21.8zm-91.1 62.4L104.6 499l220.7-126.7 60.1-60.1z"/>
                    </svg>
                    <div className="text-[7px] text-left leading-none">
                      <span className="text-[5px] block text-slate-400">GET IT ON</span>
                      <strong>Google Play</strong>
                    </div>
                  </a>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-white mb-2 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  AttouHome Propriétaire
                </div>
                <div className="flex gap-2">
                  <a href="#" className="flex items-center gap-1.5 bg-black text-white px-2 py-1 rounded-md border border-slate-700 hover:bg-slate-800 transition-colors w-1/2 justify-center">
                    <svg viewBox="0 0 384 512" className="w-3.5 h-3.5 fill-white">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-48.7-22.7-77.9-22c-39.3 .6-75.3 22.8-95.6 57.8-41.3 71-10.5 174.6 29.3 231.8 19.5 28.1 42.4 59.4 72.8 58.2 28.9-1.2 39.6-18.6 74.4-18.6 34.6 0 44.7 18.6 74.9 18C330.6 504 351 476 370 448c21.9-31.9 31-63.5 31.5-65.1-.7-.3-60.4-23.2-60.8-92.2zM292 86.8c15.8-19.1 26.4-45.7 23.5-72.3-22.9 1-50.7 15.3-67.1 34.5-14.2 16.4-26.6 43.4-23.7 69.6 25.5 2 51.6-12.7 67.3-31.8z"/>
                    </svg>
                    <div className="text-[7px] text-left leading-none">
                      <span className="text-[5px] block text-slate-400">Download on</span>
                      <strong>App Store</strong>
                    </div>
                  </a>
                  <a href="#" className="flex items-center gap-1.5 bg-black text-white px-2 py-1 rounded-md border border-slate-700 hover:bg-slate-800 transition-colors w-1/2 justify-center">
                    <svg viewBox="0 0 512 512" className="w-3.5 h-3.5 fill-white">
                      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58 33.2-60.1-60.1L472.2 35.3c7.9 4.5 13.5 12.3 13.5 21.8v336.5c0 9.5-5.6 17.3-13.5 21.8zm-91.1 62.4L104.6 499l220.7-126.7 60.1-60.1z"/>
                    </svg>
                    <div className="text-[7px] text-left leading-none">
                      <span className="text-[5px] block text-slate-400">GET IT ON</span>
                      <strong>Google Play</strong>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} AttouHome. Tous droits réservés.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            Conçu avec <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> pour l'immobilier en Côte d'Ivoire.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
