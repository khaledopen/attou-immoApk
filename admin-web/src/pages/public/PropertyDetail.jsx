import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  MapPin, Bed, Maximize, CheckCircle2, Phone, User, Calendar, 
  ShieldCheck, ArrowLeft, Smartphone, Building2, Share2, Sparkles, Check 
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://projet-attou-immo.onrender.com';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const realisticFallbacks = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
  ];

  useEffect(() => {
    fetchPropertyDetail();
  }, [id]);

  const fetchPropertyDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/properties/${id}`);
      setProperty(response.data);
    } catch (error) {
      console.error('Erreur chargement détails annonce:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (p) => {
    return new Intl.NumberFormat('fr-FR').format(p) + ' FCFA';
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-slate-500 font-semibold text-sm">Chargement des détails du bien en production...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-lg mx-auto px-4 py-32 text-center space-y-4">
        <Building2 className="w-16 h-16 text-slate-300 mx-auto" />
        <h2 className="text-2xl font-black text-slate-900">Bien indisponible</h2>
        <p className="text-slate-500 text-xs leading-relaxed">
          L'annonce immobilière demandée n'existe pas ou a été retirée du catalogue.
        </p>
        <Link 
          to="/annonces" 
          className="inline-flex items-center gap-2 bg-sky-600 text-white font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au catalogue
        </Link>
      </div>
    );
  }

  const {
    titre,
    description,
    prix,
    typeBien,
    surface,
    nombrePieces,
    datePublication,
    bien,
    photos,
    proprietaire
  } = property;

  const photoList = photos && photos.length > 0
    ? photos
    : realisticFallbacks.map((url) => ({ url }));

  const locationText = bien?.adresse 
    ? `${bien.adresse.rue}, ${bien.adresse.ville} (${bien.adresse.pays})` 
    : 'Abidjan, Côte d\'Ivoire';

  const equipements = bien?.equipements || ['Wifi', 'Climatisation', 'Parking Sécurisé', 'Sécurité 24h/7', 'Groupe Électrogène'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-10">
      
      {/* Navigation Retour */}
      <Link
        to="/annonces"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour à la liste des annonces
      </Link>

      {/* GALERIE PHOTOS ASYMETRIQUE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <div className="h-[420px] sm:h-[500px] w-full bg-slate-950 rounded-3xl overflow-hidden shadow-2xl relative border border-slate-800">
          <img
            src={photoList[activePhotoIndex]?.url}
            alt={titre}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = realisticFallbacks[0];
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

          {/* Badges */}
          <div className="absolute top-6 left-6 flex items-center gap-3">
            <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider border border-white/10">
              {typeBien}
            </span>
            <span className="bg-emerald-500/90 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              Bail Conforme CI
            </span>
          </div>

          {/* Prix */}
          <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-xl text-slate-900 px-6 py-3 rounded-2xl shadow-xl border border-white/50">
            <span className="text-2xl font-black">{formatPrice(prix)}</span>
            <span className="text-xs text-slate-500 font-semibold ml-1">/ mois</span>
          </div>
        </div>

        {/* Miniatures */}
        {photoList.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {photoList.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhotoIndex(idx)}
                className={`h-20 w-32 rounded-2xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activePhotoIndex === idx ? 'border-sky-600 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={p.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* CONTENU EN 2 COLONNES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Colonne Gauche : Détails du bien */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Entête & Localisation */}
          <div className="space-y-3 border-b border-slate-200/80 pb-8">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {titre}
            </h1>
            <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
              <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
              <span>{locationText}</span>
            </div>
          </div>

          {/* Fiche des Spécifications Clés */}
          <div className="grid grid-cols-3 gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs text-center">
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Chambres</div>
              <div className="text-xl font-black text-slate-900 flex items-center justify-center gap-1.5 mt-1">
                <Bed className="w-5 h-5 text-sky-600" />
                {bien?.nombreChambres || nombrePieces || 1}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Surface</div>
              <div className="text-xl font-black text-slate-900 flex items-center justify-center gap-1.5 mt-1">
                <Maximize className="w-5 h-5 text-sky-600" />
                {surface} m²
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Niveau</div>
              <div className="text-xl font-black text-slate-900 mt-1">
                {bien?.etage !== null && bien?.etage !== undefined ? `Étage ${bien.etage}` : 'Rez-de-chaussée'}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900">Description détaillée</h3>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line font-normal">
              {description || 'Superbe bien immobilier situé dans un quartier calme et sécurisé d\'Abidjan, offrant d\'excellentes prestations de standing.'}
            </p>
          </div>

          {/* Équipements */}
          <div className="space-y-4 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900">Équipements & Prestations</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {equipements.map((eq, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{eq}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Colonne Droite : Carte Propriétaire & Visite */}
        <div className="lg:col-span-4 space-y-6 sticky top-28">
          
          {/* Card Propriétaire Certifié */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-lg space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-600 text-white font-black text-xl flex items-center justify-center shadow-md shadow-sky-600/20">
                {proprietaire?.prenom?.[0] || 'P'}
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-base">
                  {proprietaire ? `${proprietaire.prenom} ${proprietaire.nom}` : 'Bailleur Certifié'}
                </h4>
                <div className="flex items-center gap-1 text-xs text-emerald-600 font-bold mt-1">
                  <ShieldCheck className="w-4 h-4" />
                  Identité vérifiée par AttouHome
                </div>
              </div>
            </div>

            {proprietaire?.telephone && (
              <div className="flex items-center gap-3 text-slate-800 text-xs font-bold bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <Phone className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Contact Direct : {proprietaire.telephone}</span>
              </div>
            )}

            {/* Demande de Visite Mobile */}
            <div className="space-y-3 pt-2">
              <div className="bg-gradient-to-br from-sky-900 to-blue-950 text-white p-6 rounded-2xl space-y-3 text-center border border-sky-800/80">
                <Smartphone className="w-8 h-8 text-sky-400 mx-auto" />
                <div className="text-xs font-bold">Visitez ce bien en 1 clic</div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Téléchargez <strong>AttouHome Locataire</strong> sur votre smartphone pour réserver un créneau de visite direct.
                </p>
              </div>
            </div>
          </div>

          {/* Badge de Garantie Légale */}
          <div className="bg-slate-950 text-white p-6 rounded-3xl space-y-3 text-xs leading-relaxed border border-slate-800">
            <div className="font-bold text-sky-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Protection Locataire
            </div>
            <p className="text-slate-300">
              Chaque contrat de bail proposé respecte le barème réglementaire des loyers en Côte d'Ivoire. Aucun paiement en avance sans visite préalable.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default PropertyDetail;
