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
            <div className="space-y-2">
              <div className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                <Smartphone className="w-6 h-6 text-primary-400" />
                <div>
                  <div className="text-xs font-bold text-white">AttouHome Locataire</div>
                  <div className="text-[11px] text-slate-400">Recherche & Visites</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                <Smartphone className="w-6 h-6 text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-white">AttouHome Propriétaire</div>
                  <div className="text-[11px] text-slate-400">Gestion & Publication</div>
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
