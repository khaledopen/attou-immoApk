import React from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, ShieldCheck, TrendingUp, Users, Smartphone, CheckCircle, ArrowRight, Building2, HelpCircle } from 'lucide-react';

const LandlordPortal = () => {
  return (
    <div className="space-y-20 pb-20">
      
      {/* HERO SECTION PROPRIÉTAIRE */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <KeyRound className="w-4 h-4" />
              Espace Propriétaire & Bailleur
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Maximisez vos revenus locatifs en toute <span className="text-sky-400">sécurité</span>
            </h1>

            <p className="text-slate-300 text-base leading-relaxed">
              AttouHome offre aux propriétaires et agences immobilières en Côte d'Ivoire les meilleurs outils pour publier, gérer les demandes de visite et trouver des locataires solvables.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/annonces"
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-sky-600/30 text-center transition-all flex items-center justify-center gap-2"
              >
                Explorer la plateforme
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-slate-800/80 p-8 rounded-3xl border border-slate-700/60 shadow-2xl space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Pourquoi choisir AttouHome Propriétaire ?
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-700/40">
                <ShieldCheck className="w-6 h-6 text-sky-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white text-sm">Locataires Solvables & Vérifiés</h4>
                  <p className="text-xs text-slate-400 mt-1">Dossiers de candidature complets et pièces d'identité validées.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-700/40">
                <Building2 className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white text-sm">Gestion Simplifiée des Visites</h4>
                  <p className="text-xs text-slate-400 mt-1">Acceptez ou refusez les créneaux de visite directement depuis votre smartphone.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-700/40">
                <Users className="w-6 h-6 text-purple-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white text-sm">Visibilité Maximale à Abidjan</h4>
                  <p className="text-xs text-slate-400 mt-1">Mettez en avant vos appartements auprès de milliers de candidats locataires actifs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESSUS EN 3 ÉTAPES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">Fonctionnement</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
            Mettez votre bien en location en 3 étapes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs relative text-center space-y-4">
            <div className="w-12 h-12 bg-sky-600 text-white rounded-2xl font-black text-xl flex items-center justify-center mx-auto shadow-md shadow-sky-600/20">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900">Créez votre compte</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Téléchargez l'application **AttouHome Propriétaire** et renseignez vos informations d'identité.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs relative text-center space-y-4">
            <div className="w-12 h-12 bg-sky-600 text-white rounded-2xl font-black text-xl flex items-center justify-center mx-auto shadow-md shadow-sky-600/20">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900">Publiez votre annonce</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Ajoutez des photos de qualité, fixez le loyer et décrivez les caractéristiques de votre appartement ou villa.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs relative text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl font-black text-xl flex items-center justify-center mx-auto shadow-md shadow-emerald-600/20">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900">Recevez des visites</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Confirmez les demandes de visite des locataires et concluez votre contrat de bail sereinement.
            </p>
          </div>
        </div>
      </section>

      {/* BANNIÈRE APPLICATION PROPRIÉTAIRE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
          <div className="space-y-3 max-w-lg text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-black">
              Prêt à mettre votre bien en location ?
            </h2>
            <p className="text-slate-400 text-sm">
              Téléchargez gratuitement l'application **AttouHome Propriétaire** disponible sur Android et iOS.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-sky-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-sky-700 transition-colors shadow-lg cursor-pointer shrink-0">
            <Smartphone className="w-6 h-6" />
            <span>Télécharger l'App Propriétaire</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandlordPortal;
