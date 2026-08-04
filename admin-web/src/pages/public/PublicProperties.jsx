import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Search, Filter, Building2, SlidersHorizontal, RefreshCw, ArrowUpDown } from 'lucide-react';
import PropertyCard from '../../components/public/PropertyCard';

const API_URL = import.meta.env.VITE_API_URL || 'https://projet-attou-immo.onrender.com';

const PublicProperties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // État des filtres
  const [searchQuery, setSearchQuery] = useState(searchParams.get('ville') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [properties, searchQuery, selectedType, maxPrice, sortBy]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/properties`);
      const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
      setProperties(data);
      setFilteredProperties(data);
    } catch (error) {
      console.error('Erreur chargement annonces:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let result = [...properties];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((p) => {
        const titreMatch = p.titre?.toLowerCase().includes(query);
        const villeMatch = p.bien?.adresse?.ville?.toLowerCase().includes(query);
        const rueMatch = p.bien?.adresse?.rue?.toLowerCase().includes(query);
        return titreMatch || villeMatch || rueMatch;
      });
    }

    if (selectedType) {
      result = result.filter((p) => p.typeBien === selectedType);
    }

    if (maxPrice) {
      result = result.filter((p) => p.prix <= parseFloat(maxPrice));
    }

    // Tri
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.prix - b.prix);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.prix - a.prix);
    } else {
      // récent par défaut
      result.sort((a, b) => new Date(b.datePublication || 0) - new Date(a.datePublication || 0));
    }

    setFilteredProperties(result);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('');
    setMaxPrice('');
    setSortBy('recent');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-10">
      
      {/* Entête */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">Recherche & Catalogue</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Tous les Biens Immobiliers Vérifiés
        </h1>
        <p className="text-slate-500 text-sm max-w-xl">
          Trouvez facilement votre logement à Abidjan et partout en Côte d'Ivoire.
        </p>
      </motion.div>

      {/* BARRE DE FILTRES ET TRI */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Recherche par mot-clé / ville */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Commune, quartier, titre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            />
          </div>

          {/* Type de bien */}
          <div className="relative">
            <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-700 cursor-pointer"
            >
              <option value="">Tous les types</option>
              <option value="APPARTEMENT">Appartements</option>
              <option value="MAISON">Maisons</option>
              <option value="VILLA">Villas</option>
              <option value="STUDIO">Studios</option>
              <option value="CHAMBRE">Chambres</option>
            </select>
          </div>

          {/* Prix Max */}
          <div className="relative">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-700 cursor-pointer"
            >
              <option value="">Budget Maximum</option>
              <option value="150000">Jusqu'à 150 000 FCFA</option>
              <option value="300000">Jusqu'à 300 000 FCFA</option>
              <option value="500000">Jusqu'à 500 000 FCFA</option>
              <option value="1000000">Jusqu'à 1 000 000 FCFA</option>
            </select>
          </div>

          {/* Tri par ordre */}
          <div className="relative">
            <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-700 cursor-pointer"
            >
              <option value="recent">Plus récents</option>
              <option value="price-asc">Prix : croissant</option>
              <option value="price-desc">Prix : décroissant</option>
            </select>
          </div>

        </div>

        {/* Status Bar & Reset */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
          <div>
            Affichage de <strong>{filteredProperties.length}</strong> bien(s)
          </div>
          {(searchQuery || selectedType || maxPrice || sortBy !== 'recent') && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 font-bold text-red-600 hover:text-red-700 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Effacer les filtres
            </button>
          )}
        </div>
      </div>

      {/* GRILLE DES ANNONCES */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-slate-100 h-80 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filteredProperties.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-16 text-center border border-slate-200/80 shadow-xs max-w-lg mx-auto space-y-4"
        >
          <Building2 className="w-16 h-16 text-slate-300 mx-auto" />
          <h3 className="text-xl font-bold text-slate-900">Aucun résultat trouvé</h3>
          <p className="text-slate-500 text-xs leading-relaxed">
            Aucun bien immobilier ne correspond à vos critères actuels. Essayez d'élargir votre recherche.
          </p>
          <button
            onClick={handleResetFilters}
            className="bg-primary-500 text-white font-bold px-6 py-2.5 rounded-full text-xs hover:bg-primary-600 transition-colors cursor-pointer"
          >
            Réinitialiser les filtres
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((prop, idx) => (
            <PropertyCard key={prop.id} property={prop} index={idx} />
          ))}
        </div>
      )}

    </div>
  );
};

export default PublicProperties;
