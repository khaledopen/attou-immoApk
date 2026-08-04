import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, MapPin, Building2, Shield, Smartphone, ArrowRight, Sparkles, CheckCircle, Users, KeyRound } from 'lucide-react';
import PropertyCard from '../../components/public/PropertyCard';

const API_URL = import.meta.env.VITE_API_URL || 'https://projet-attou-immo.onrender.com';

const Home = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtres de recherche rapide
  const [searchVille, setSearchVille] = useState('');
  const [searchType, setSearchType] = useState('');

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/properties`);
      const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
      setProperties(data.slice(0, 6)); // Prendre les 6 premières annonces
    } catch (error) {
      console.error('Erreur chargement annonces:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchVille) query.append('ville', searchVille);
    if (searchType) query.append('type', searchType);
    navigate(`/annonces?${query.toString()}`);
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-sky-950 text-white overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
        {/* Cercles Flous d'Arrière-Plan */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Plateforme N°1 en Côte d'Ivoire
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Trouvez votre futur logement en toute <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">sérénité</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Découvrez des appartements, villas et studios vérifiés à Abidjan et partout en Côte d'Ivoire. Mettez en location vos biens rapidement et en sécurité.
            </p>

            {/* BARRE DE RECHERCHE HERO */}
            <form 
              onSubmit={handleSearch}
              className="mt-8 bg-white p-3 rounded-2xl sm:rounded-full shadow-2xl border border-white/20 flex flex-col sm:flex-row items-center gap-3 text-slate-900 max-w-3xl mx-auto"
            >
              <div className="flex-1 flex items-center gap-3 px-4 w-full border-b sm:border-b-0 sm:border-r border-slate-100 py-2 sm:py-0">
                <MapPin className="w-5 h-5 text-sky-600 shrink-0" />
                <input
                  type="text"
                  placeholder="Ville ou commune (ex: Abidjan, Cocody...)"
                  value={searchVille}
                  onChange={(e) => setSearchVille(e.target.value)}
                  className="w-full text-sm focus:outline-none bg-transparent font-medium"
                />
              </div>

              <div className="flex-1 flex items-center gap-3 px-4 w-full py-2 sm:py-0">
                <Building2 className="w-5 h-5 text-sky-600 shrink-0" />
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full text-sm focus:outline-none bg-transparent font-medium text-slate-700 cursor-pointer"
                >
                  <option value="">Tous types de biens</option>
                  <option value="APPARTEMENT">Appartement</option>
                  <option value="MAISON">Maison</option>
                  <option value="VILLA">Villa</option>
                  <option value="STUDIO">Studio</option>
                  <option value="CHAMBRE">Chambre</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white font-bold px-8 py-3.5 rounded-xl sm:rounded-full shadow-lg shadow-sky-600/30 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                Rechercher
              </button>
            </form>
          </div>

          {/* KPI STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-slate-800/80 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-3xl font-black text-white">500+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Biens Référencés</div>
            </div>
            <div>
              <div className="text-3xl font-black text-sky-400">100%</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Annonces Vérifiées</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">10k+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Utilisateurs Actifs</div>
            </div>
            <div>
              <div className="text-3xl font-black text-sky-400">24/7</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Support & Visites</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. ANNONCES VEDETTES ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">Opportunités Récentes</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Derniers biens disponibles
            </h2>
          </div>
          <Link
            to="/annonces"
            className="flex items-center gap-2 text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors group"
          >
            Voir tout le catalogue
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white h-80 rounded-2xl animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-xs max-w-xl mx-auto">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">Aucune annonce disponible</h3>
            <p className="text-slate-500 text-sm mt-1">Revenez plus tard ou consultez le catalogue complet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}
      </section>

      {/* ─── 3. POUR LOCATAIRES ET PROPRIÉTAIRES ─── */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">Une solution sur-mesure</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Conçu pour chaque acteur de l'immobilier
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Carte Locataire */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center font-bold">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Espace Locataire</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Trouvez le logement idéal en quelques clics, planifiez vos visites directement en ligne et constituez votre dossier de location en toute simplicité.
                </p>
                <ul className="space-y-2.5 text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Recherche géographique par commune</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Prise de rendez-vous de visite intégrée</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Contact direct avec les propriétaires</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/locataire"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-xl text-center transition-colors text-sm flex items-center justify-center gap-2"
              >
                Découvrir l'Espace Locataire
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Carte Propriétaire */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center font-bold">
                  <KeyRound className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Espace Propriétaire</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Publiez vos annonces gratuitement, gérez vos demandes de visite et maximisez l'occupation de vos appartements et maisons.
                </p>
                <ul className="space-y-2.5 text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Publication rapide avec photos HD</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Filtrage des candidats locataires</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Gestion des visites & confirmations</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/proprietaire"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-xl text-center transition-colors text-sm flex items-center justify-center gap-2"
              >
                Découvrir l'Espace Propriétaire
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. BANNIÈRE APPLICATION MOBILE ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <span className="text-xs font-extrabold uppercase tracking-widest text-sky-200 bg-white/10 px-3 py-1 rounded-full">
              Mobile First
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Emportez AttouHome partout dans votre poche
            </h2>
            <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
              Téléchargez nos applications mobiles Android & iOS pour recevoir des notifications en temps réel pour vos visites et messages.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <div className="bg-slate-900/90 hover:bg-slate-900 text-white px-6 py-3.5 rounded-xl border border-white/20 flex items-center gap-3 cursor-pointer transition-transform hover:scale-105">
              <Smartphone className="w-6 h-6 text-sky-400" />
              <div className="text-left">
                <div className="text-[10px] text-slate-400 font-medium">Disponible sur</div>
                <div className="text-sm font-bold">Google Play Store</div>
              </div>
            </div>
            <div className="bg-slate-900/90 hover:bg-slate-900 text-white px-6 py-3.5 rounded-xl border border-white/20 flex items-center gap-3 cursor-pointer transition-transform hover:scale-105">
              <Smartphone className="w-6 h-6 text-sky-400" />
              <div className="text-left">
                <div className="text-[10px] text-slate-400 font-medium">Télécharger dans</div>
                <div className="text-sm font-bold">Apple App Store</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
