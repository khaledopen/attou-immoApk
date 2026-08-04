import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Smartphone, ShieldCheck, CheckCircle, ArrowRight, Home } from 'lucide-react';

const TenantPortal = () => {
  return (
    <div className="space-y-20 pb-20">
      
      {/* HERO SECTION LOCATAIRE */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider">
              <Home className="w-4 h-4" />
              Espace Locataire & Chercheur de logement
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Trouvez le logement qui vous ressemble sans <span className="text-sky-400">frais cachés</span>
            </h1>

            <p className="text-slate-300 text-base leading-relaxed">
              AttouHome vous accompagne pour trouver votre appartement, villa ou studio idéal à Abidjan. Organisez vos visites et échangez directement avec les propriétaires.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/annonces"
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-sky-600/30 text-center transition-all flex items-center justify-center gap-2"
              >
                Rechercher un appartement
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-slate-800/80 p-8 rounded-3xl border border-slate-700/60 shadow-2xl space-y-6">
            <h3 className="text-xl font-bold text-white">
              Vos avantages sur AttouHome
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-700/40">
                <Search className="w-6 h-6 text-sky-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white text-sm">Filtres de recherche avancés</h4>
                  <p className="text-xs text-slate-400 mt-1">Filtrez par commune (Cocody, Yopougon, Marcory...), budget et type de bien.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-700/40">
                <Calendar className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white text-sm">Demande de visite directe</h4>
                  <p className="text-xs text-slate-400 mt-1">Réservez un créneau de visite en 1 clic et recevez la confirmation par notification.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-700/40">
                <ShieldCheck className="w-6 h-6 text-purple-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white text-sm">Annonces contrôlées & sécurisées</h4>
                  <p className="text-xs text-slate-400 mt-1">Chaque annonce est vérifiée par notre équipe de modération avant publication.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ÉTAPES LOCATAIRE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">Guide du locataire</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
            Comment louer avec AttouHome ?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs relative text-center space-y-4">
            <div className="w-12 h-12 bg-sky-600 text-white rounded-2xl font-black text-xl flex items-center justify-center mx-auto shadow-md shadow-sky-600/20">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900">Explorez le catalogue</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Consultez les photos HD, prix et détails des logements disponibles sur le site ou l'application.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs relative text-center space-y-4">
            <div className="w-12 h-12 bg-sky-600 text-white rounded-2xl font-black text-xl flex items-center justify-center mx-auto shadow-md shadow-sky-600/20">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900">Planifiez une visite</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Soumettez une demande de visite à la date de votre choix depuis l'application mobile.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs relative text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl font-black text-xl flex items-center justify-center mx-auto shadow-md shadow-emerald-600/20">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900">Emménagez sereinement</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Signez votre contrat de bail et prenez possession de votre nouveau chez-vous !
            </p>
          </div>
        </div>
      </section>

      {/* BANNIÈRE APPLICATION LOCATAIRE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-lg text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-black">
              Téléchargez l'application AttouHome Locataire
            </h2>
            <p className="text-sky-100 text-sm">
              Accédez à toutes les fonctionnalités et suivez le statut de vos visites en temps réel.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-colors shadow-lg cursor-pointer shrink-0">
            <Smartphone className="w-6 h-6 text-sky-400" />
            <span>Télécharger l'App Locataire</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default TenantPortal;
