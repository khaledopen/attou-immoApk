import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, ShieldCheck, ArrowRight, Home as HomeIcon } from 'lucide-react';

const TenantPortal = () => {
  return (
    <div className="space-y-24 pt-28 pb-24 overflow-x-hidden">

      {/* HERO SECTION LOCATAIRE ASYMETRIQUE */}
      <section className="relative bg-primary-800 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-b-[28px]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-primary-300 text-xs font-bold uppercase tracking-wider">
              <HomeIcon className="w-4 h-4" />
              Espace Locataire & Chercheur de Logement
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Trouvez votre logement idéal à Abidjan sans <span className="text-primary-300">aucun faux frais</span>.
            </h1>

            <p className="text-slate-300 text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              AttouHome vous permet de consulter des appartements et maisons vérifiés, de fixer des créneaux de visite en direct et de constituer votre dossier de location en ligne.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/annonces"
                className="bg-primary-500 hover:bg-primary-600 text-white font-bold px-8 py-3.5 rounded-full shadow-md shadow-primary-500/20 transition-colors text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                Rechercher une annonce
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-primary-900 p-8 rounded-2xl shadow-lg space-y-6">
              <h3 className="text-xl font-bold text-white">
                Les engagements AttouHome
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-black/20 p-4 rounded-xl">
                  <Search className="w-6 h-6 text-primary-300 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Filtres par commune & budget</h4>
                    <p className="text-xs text-slate-400 mt-1">Recherchez précisément à Riviera 3, Les Deux Plateaux, Zone 4 ou Yopougon.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-black/20 p-4 rounded-xl">
                  <Calendar className="w-6 h-6 text-primary-300 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Visites programmées en 1 clic</h4>
                    <p className="text-xs text-slate-400 mt-1">Choisissez une date et recevez la confirmation du bailleur sur votre téléphone.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-black/20 p-4 rounded-xl">
                  <ShieldCheck className="w-6 h-6 text-primary-300 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Protection contre la fraude</h4>
                    <p className="text-xs text-slate-400 mt-1">Toutes les annonces sont modérées physiquement avant leur mise en ligne.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ETAPES LOCATAIRE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">Guide de recherche</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Comment trouver votre appartement ?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs text-center space-y-4">
            <div className="w-12 h-12 bg-primary-500 text-white rounded-2xl font-black text-xl flex items-center justify-center mx-auto shadow-md">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900">Consultez les annonces</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Explorez les photos HD, les équipements et la géolocalisation des logements disponibles.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs text-center space-y-4">
            <div className="w-12 h-12 bg-primary-500 text-white rounded-2xl font-black text-xl flex items-center justify-center mx-auto shadow-md">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900">Demandez une visite</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Sélectionnez un créneau horaire sur l'application **AttouHome Locataire**.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl font-black text-xl flex items-center justify-center mx-auto shadow-md">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900">Emménagez en confiance</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Signez votre contrat de bail certifié et prenez les clés de votre nouveau logement !
            </p>
          </div>
        </div>
      </section>
      
      {/* SECTION TELECHARGEMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 bg-primary-900 text-white rounded-3xl relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-bold text-primary-300 uppercase tracking-widest">Application Mobile</span>
          <h2 className="text-3xl font-black tracking-tight">Téléchargez l'application AttouHome Locataire</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Trouvez votre futur chez-vous plus rapidement, planifiez vos visites directement sur le calendrier du propriétaire et restez informé en temps réel.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <a href="#" className="flex items-center gap-3 bg-black text-white px-5 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-900 transition-colors shadow-lg w-48 justify-center">
              <svg viewBox="0 0 384 512" className="w-5 h-5 fill-white">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-48.7-22.7-77.9-22c-39.3 .6-75.3 22.8-95.6 57.8-41.3 71-10.5 174.6 29.3 231.8 19.5 28.1 42.4 59.4 72.8 58.2 28.9-1.2 39.6-18.6 74.4-18.6 34.6 0 44.7 18.6 74.9 18C330.6 504 351 476 370 448c21.9-31.9 31-63.5 31.5-65.1-.7-.3-60.4-23.2-60.8-92.2zM292 86.8c15.8-19.1 26.4-45.7 23.5-72.3-22.9 1-50.7 15.3-67.1 34.5-14.2 16.4-26.6 43.4-23.7 69.6 25.5 2 51.6-12.7 67.3-31.8z"/>
              </svg>
              <div className="text-[11px] text-left leading-tight">
                <span className="text-[9px] block text-slate-400">Download on the</span>
                <strong>App Store</strong>
              </div>
            </a>
            <a href="#" className="flex items-center gap-3 bg-black text-white px-5 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-900 transition-colors shadow-lg w-48 justify-center">
              <svg viewBox="0 0 512 512" className="w-5 h-5 fill-white">
                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58 33.2-60.1-60.1L472.2 35.3c7.9 4.5 13.5 12.3 13.5 21.8v336.5c0 9.5-5.6 17.3-13.5 21.8zm-91.1 62.4L104.6 499l220.7-126.7 60.1-60.1z"/>
              </svg>
              <div className="text-[11px] text-left leading-tight">
                <span className="text-[9px] block text-slate-400">GET IT ON</span>
                <strong>Google Play</strong>
              </div>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default TenantPortal;
