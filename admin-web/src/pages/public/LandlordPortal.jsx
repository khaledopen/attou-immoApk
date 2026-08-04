import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyRound, ShieldCheck, TrendingUp, Users, ArrowRight, Building2, ChevronDown } from 'lucide-react';

const LandlordPortal = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      question: "Combien coûte la publication d'une annonce sur AttouHome ?",
      answer: "La publication des annonces de base est 100% gratuite pour les propriétaires particuliers. Nous proposons également des options de mise en avant Premium si vous souhaitez louer plus rapidement."
    },
    {
      question: "Comment vérifiez-vous la solvabilité des locataires ?",
      answer: "Lorsqu'un locataire formule une demande de visite ou de location, notre système vérifie ses pièces d'identité et ses justificatifs de revenus avant de vous transmettre le dossier."
    },
    {
      question: "Comment se déroule la signature du bail de location ?",
      answer: "AttouHome met à votre disposition un modèle de contrat de bail d'habitation certifié conforme à la législation ivoirienne (Loi portant Code de la Construction et de l'Habitat)."
    }
  ];

  return (
    <div className="space-y-24 pt-28 pb-24 overflow-x-hidden">
      
      {/* HERO SECTION PROPRIETAIRE ASYMETRIQUE */}
      <section className="relative bg-primary-800 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-b-[28px]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <KeyRound className="w-4 h-4" />
              Espace Propriétaire & Bailleur
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Louez vos biens immobiliers à Abidjan avec une <span className="text-emerald-400">sérénité totale</span>.
            </h1>

            <p className="text-slate-300 text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              Rejoignez plus de 500 propriétaires et agences en Côte d'Ivoire qui gèrent leurs annonces, valident les visites et sélectionnent des candidats locataires certifiés.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/annonces"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-emerald-600/30 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                Explorer la plateforme
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
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Garanties de la plateforme
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-black/20 p-4 rounded-xl">
                  <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Locataires Certifiés ONECI</h4>
                    <p className="text-xs text-slate-400 mt-1">Dossiers de candidature vérifiés avant toute demande de visite.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-black/20 p-4 rounded-xl">
                  <Building2 className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Gestion des Créneaux de Visite</h4>
                    <p className="text-xs text-slate-400 mt-1">Confirmez ou déplacez les rendez-vous de visite en 1 clic depuis votre mobile.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-black/20 p-4 rounded-xl">
                  <Users className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Visibilité ciblée à Cocody & Marcory</h4>
                    <p className="text-xs text-slate-400 mt-1">Vos appartements présentés à des milliers de chercheurs de logement actifs.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* PROCESSUS ETAPES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Fonctionnement</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Comment publier votre annonce ?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl font-black text-xl flex items-center justify-center mx-auto shadow-md">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900">Créez votre compte bailleur</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Téléchargez l'application mobile **AttouHome Propriétaire** et renseignez votre profil.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl font-black text-xl flex items-center justify-center mx-auto shadow-md">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900">Ajoutez les détails du bien</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Importez des photos de qualité, fixez le loyer mensuel et les équipements disponibles.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl font-black text-xl flex items-center justify-center mx-auto shadow-md">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900">Validez les visites & concluez</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Recevez les demandes de visite sur votre smartphone et choisissez votre futur locataire.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION INTERACTIVE */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Questions Fréquentes</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Vos questions, nos réponses
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full p-6 text-left font-bold text-slate-900 flex items-center justify-between gap-4 cursor-pointer text-sm"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${
                  activeFaq === index ? 'rotate-180 text-emerald-600' : ''
                }`} />
              </button>

              <AnimatePresence>
                {activeFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default LandlordPortal;
