import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Smartphone, ShieldCheck, CheckCircle2, ArrowRight, Home as HomeIcon, Sparkles } from 'lucide-react';

const TenantPortal = () => {
  return (
    <div className="space-y-24 pt-28 pb-24 overflow-x-hidden">
      
      {/* HERO SECTION LOCATAIRE ASYMETRIQUE */}
      <section className="relative bg-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-b-3xl">
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider">
              <HomeIcon className="w-4 h-4" />
              Espace Locataire & Chercheur de Logement
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Trouvez votre logement idéal à Abidjan sans <span className="text-sky-400">aucun faux frais</span>.
            </h1>

            <p className="text-slate-300 text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              AttouHome vous permet de consulter des appartements et maisons vérifiés, de fixer des créneaux de visite en direct et de constituer votre dossier de location en ligne.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/annonces"
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-sky-600/30 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
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
            <div className="bg-slate-900/90 p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
              <h3 className="text-xl font-bold text-white">
                Les engagements AttouHome
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  <Search className="w-6 h-6 text-sky-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Filtres par commune & budget</h4>
                    <p className="text-xs text-slate-400 mt-1">Recherchez précisément à Riviera 3, Les Deux Plateaux, Zone 4 ou Yopougon.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  <Calendar className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Visites programmées en 1 clic</h4>
                    <p className="text-xs text-slate-400 mt-1">Choisissez une date et recevez la confirmation du bailleur sur votre téléphone.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  <ShieldCheck className="w-6 h-6 text-purple-400 shrink-0 mt-1" />
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
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">Guide de recherche</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Comment trouver votre appartement ?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs text-center space-y-4">
            <div className="w-12 h-12 bg-sky-600 text-white rounded-2xl font-black text-xl flex items-center justify-center mx-auto shadow-md">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900">Consultez les annonces</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Explorez les photos HD, les équipements et la géolocalisation des logements disponibles.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs text-center space-y-4">
            <div className="w-12 h-12 bg-sky-600 text-white rounded-2xl font-black text-xl flex items-center justify-center mx-auto shadow-md">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900">Demandez une visite</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Sélectionnez un créneau horaire sur l'application **AttouHome Locataire**.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs text-center space-y-4">
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

    </div>
  );
};

export default TenantPortal;
