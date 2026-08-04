import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, Building2, SlidersHorizontal, RefreshCw } from 'lucide-react';
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

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [properties, searchQuery, selectedType, maxPrice]);

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

  const applyFilters = () => {
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

    setFilteredProperties(result);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('');
    setMaxPrice('');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Entête */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Catalogue des Biens Immobiliers
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Explorez l'ensemble des annonces d'appartements, maisons et studios vérifiés.
        </p>
      </div>

      {/* BARRE DE FILTRES ET RECHERCHE */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Recherche par mot-clé / ville */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Rechercher ville, quartier, titre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
            />
          </div>

          {/* Type de bien */}
          <div className="relative">
            <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all text-slate-700 cursor-pointer"
            >
              <option value="">Tous les types de biens</option>
              <option value="APPARTEMENT">Appartement</option>
              <option value="MAISON">Maison</option>
              <option value="VILLA">Villa</option>
              <option value="STUDIO">Studio</option>
              <option value="CHAMBRE">Chambre</option>
            </select>
          </div>

          {/* Prix Max */}
          <div className="relative">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all text-slate-700 cursor-pointer"
            >
              <option value="">Budget Max (FCFA)</option>
              <option value="100000">100 000 FCFA</option>
              <option value="250000">250 000 FCFA</option>
              <option value="500000">500 000 FCFA</option>
              <option value="1000000">1 000 000 FCFA</option>
              <option value="5000000">5 000 000 FCFA</option>
            </select>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
          <div>
            <strong>{filteredProperties.length}</strong> annonce(s) correspondante(s)
          </div>
          {(searchQuery || selectedType || maxPrice) && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 font-bold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Réinitialiser les filtres
            </button>
          )}
        </div>
      </div>

      {/* GRILLE DES ANNONCES */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-white h-80 rounded-2xl animate-pulse border border-slate-100" />
          ))}
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200/80 shadow-xs max-w-lg mx-auto space-y-4">
          <Building2 className="w-16 h-16 text-slate-300 mx-auto" />
          <h3 className="text-xl font-bold text-slate-800">Aucun bien trouvé</h3>
          <p className="text-slate-500 text-sm">
            Aucune annonce ne correspond à vos critères de recherche actuels. Essayez de modifier ou de réinitialiser vos filtres.
          </p>
          <button
            onClick={handleResetFilters}
            className="bg-sky-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-sky-700 transition-colors"
          >
            Réinitialiser la recherche
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      )}

    </div>
  );
};

export default PublicProperties;
