import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  Search, MapPin, Building2, Shield, Smartphone, ArrowRight, 
  Sparkles, CheckCircle, Users, KeyRound, Star, ChevronRight, 
  Award, ShieldCheck, HeartHandshake, Home as HomeIcon 
} from 'lucide-react';
import PropertyCard from '../../components/public/PropertyCard';

const API_URL = import.meta.env.VITE_API_URL || 'https://projet-attou-immo.onrender.com';

const Home = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtres rapides
  const [searchVille, setSearchVille] = useState('');
  const [searchType, setSearchType] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/properties`);
      const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
      setProperties(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des biens:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchVille) query.append('ville', searchVille);
    if (searchType) query.append('type', searchType);
    navigate(`/annonces?${query.toString()}`);
  };

  const popularLocations = [
    { name: 'Cocody Riviera 3', count: '14 biens' },
    { name: 'Deux Plateaux', count: '8 biens' },
    { name: 'Marcory Zone 4', count: '12 biens' },
    { name: 'Assinie-Mafia', count: '5 biens' },
    { name: 'Palmeraie', count: '9 biens' }
  ];

  return (
    <div className="space-y-24 pb-24 overflow-x-hidden">
      
      {/* ─── 1. HERO SECTION ASYMETRIQUE AVEC PHOTOGRAPHIE REALISTE ─── */}
      <section className="relative bg-slate-950 text-white pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
        {/* Motif d'arrière-plan discret */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-sky-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Colonne Gauche (Texte & Recherche) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-8 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-sky-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                L'immobilier Ivoirien sans intermédiaire opaque
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                Trouvez la maison idéale à <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300">Abidjan</span> en toute confiance.
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
                Des appartements haut standing aux studios équipés à Cocody, Marcory et Riviera. Découvrez des biens authentifiés, planifiez vos visites et louez en toute sérénité.
              </p>

              {/* Formulaire de Recherche Asymétrique */}
              <form
                onSubmit={handleSearchSubmit}
                className="bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-3xl shadow-2xl border border-white/20 text-slate-900 grid grid-cols-1 sm:grid-cols-12 gap-3"
              >
                <div className="sm:col-span-5 flex items-center gap-3 px-3 py-2 bg-slate-50 sm:bg-transparent rounded-2xl sm:rounded-none sm:border-r border-slate-200">
                  <MapPin className="w-5 h-5 text-sky-600 shrink-0" />
                  <input
                    type="text"
                    placeholder="Quartier (ex: Riviera 3, Zone 4)"
                    value={searchVille}
                    onChange={(e) => setSearchVille(e.target.value)}
                    className="w-full text-xs font-semibold focus:outline-none bg-transparent"
                  />
                </div>

                <div className="sm:col-span-4 flex items-center gap-3 px-3 py-2 bg-slate-50 sm:bg-transparent rounded-2xl sm:rounded-none">
                  <Building2 className="w-5 h-5 text-sky-600 shrink-0" />
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full text-xs font-semibold focus:outline-none bg-transparent text-slate-700 cursor-pointer"
                  >
                    <option value="">Tous les biens</option>
                    <option value="APPARTEMENT">Appartement</option>
                    <option value="MAISON">Maison</option>
                    <option value="VILLA">Villa</option>
                    <option value="STUDIO">Studio</option>
                    <option value="CHAMBRE">Chambre</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="sm:col-span-3 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-sky-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider"
                >
                  <Search className="w-4 h-4" />
                  Trouver
                </button>
              </form>

              {/* Badges de Quartiers */}
              <div className="pt-2 flex items-center gap-2 flex-wrap justify-center lg:justify-start text-xs">
                <span className="text-slate-400 font-medium">Communes populaires :</span>
                {popularLocations.map((loc, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSearchVille(loc.name);
                      navigate(`/annonces?ville=${encodeURIComponent(loc.name)}`);
                    }}
                    className="bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white px-3 py-1 rounded-full border border-white/10 transition-colors text-[11px] font-medium"
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Colonne Droite (Composition Photo Asymétrique) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Photo Principale */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800/80 h-96 sm:h-[460px] relative">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                    alt="Villa moderne à Cocody"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-white">
                      <div className="text-xs font-bold text-sky-400 uppercase tracking-widest">Résidence d'Exception</div>
                      <div className="text-base font-extrabold mt-0.5">Villa Duplex · Riviera 3 Golf</div>
                      <div className="text-xs text-slate-300 mt-1">4 Chambres · Piscine & Sécurité 24h/7</div>
                    </div>
                  </div>
                </div>

                {/* Badge Flottant Confiance */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -top-6 -left-6 bg-white text-slate-900 p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Bail Certifié Conforme</div>
                    <div className="text-[11px] text-slate-500">Loi Immobilière CI</div>
                  </div>
                </motion.div>

                {/* Badge Flottant Stats */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-4 rounded-2xl shadow-xl border border-slate-800 hidden sm:flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
                    <HomeIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-white">{properties.length || 15}+ Annonces</div>
                    <div className="text-[11px] text-slate-400">Mis à jour en temps réel</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── 2. BENTO GRID & CATALOGUE DES BIENS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">Dernières Offres</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Biens disponibles à Abidjan
            </h2>
          </div>

          <Link
            to="/annonces"
            className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 hover:text-sky-700 uppercase tracking-wider group"
          >
            Explorer tout le catalogue
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-slate-100 h-80 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-slate-200/80 shadow-xs max-w-md mx-auto space-y-3">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">Aucune annonce trouvée</h3>
            <p className="text-xs text-slate-500">Revenez un peu plus tard pour voir les nouveaux logements.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.slice(0, 6).map((prop, idx) => (
              <PropertyCard 
                key={prop.id} 
                property={prop} 
                index={idx}
                variant={idx === 0 ? 'featured' : 'standard'}
              />
            ))}
          </div>
        )}
      </section>

      {/* ─── 3. ENGAGEMENTS & VALEURS ATTOUHOME ─── */}
      <section className="bg-slate-100/80 py-20 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">Rigueur & Transparence</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Une expérience immobilière réinventée
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Nous avons supprimé les tracas traditionnels pour offrir aux familles, cadres et étudiants une recherche fluide et sécurisée.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Annonces 100% Vérifiées</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Chaque propriété fait l'objet d'une vérification physique de la localisation et des titres de propriété par nos équipes.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Contact Direct Propriétaire</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Échangez directement avec le bailleur certifié sans commission d'intermédiaire dissimulée.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Visites sur Rendez-Vous</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Réservez votre créneau de visite en 1 clic via l'application mobile et recevez votre confirmation instantanée.
              </p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ─── 4. ESPACES DÉDIÉS : LOCATAIRES & PROPRIÉTAIRES ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Espace Locataire */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col justify-between space-y-8 border border-slate-800">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold border border-sky-500/30">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black">Vous cherchez un logement ?</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Parcourez des centaines d'appartements et maisons certifiés, demandez des visites et emménagez en toute quiétude.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
                  Filtres précis par commune et budget
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
                  Prise de rendez-vous de visite gratuite
                </li>
              </ul>
            </div>

            <Link
              to="/locataire"
              className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold py-3.5 px-6 rounded-2xl text-xs uppercase tracking-wider transition-colors"
            >
              Découvrir l'Espace Locataire
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Espace Propriétaire */}
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col justify-between space-y-8 border border-blue-800/80">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black">Vous êtes propriétaire ?</h3>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                Publiez gratuitement vos appartements et villas, gérez les visites et sélectionnez les meilleurs dossiers locatifs.
              </p>
              <ul className="space-y-2 text-xs text-slate-200 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  Publication simple avec photos HD
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  Sélection et validation des candidats
                </li>
              </ul>
            </div>

            <Link
              to="/proprietaire"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl text-xs uppercase tracking-wider transition-colors"
            >
              Découvrir l'Espace Propriétaire
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ─── 5. TEMOIGNAGES CLIENTS REELS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">Témoignages</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Ils nous font confiance à Abidjan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-slate-700 text-sm italic leading-relaxed">
              "J'ai trouvé mon appartement 3 pièces à Cocody Riviera 3 en moins de 48h. La visite s'est faite sur rendez-vous très simplement. Aucune mauvaise surprise !"
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">Mme Touré A.</span>
              <span className="text-slate-500">Locataire à Riviera 3</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-slate-700 text-sm italic leading-relaxed">
              "En tant que propriétaire d'un immeuble à Marcory Zone 4, la plateforme m'a permis de trouver des locataires sérieux sans passer par des démarcheurs douteux."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">M. Kouassi B.</span>
              <span className="text-slate-500">Bailleur à Marcory</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
