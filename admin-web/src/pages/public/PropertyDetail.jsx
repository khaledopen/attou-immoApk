import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Bed, Maximize, CheckCircle2, Phone, User, Calendar, ShieldCheck, ArrowLeft, Smartphone, Building2, Check } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://projet-attou-immo.onrender.com';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

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
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500 font-medium">Chargement des détails du bien...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center space-y-4">
        <Building2 className="w-16 h-16 text-slate-300 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-900">Annonce non trouvée</h2>
        <p className="text-slate-500 text-sm">L'annonce demandée n'existe pas ou a été supprimée.</p>
        <Link to="/annonces" className="inline-flex items-center gap-2 bg-sky-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm">
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

  const photoList = photos && photos.length > 0 ? photos : [
    { url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80' }
  ];

  const locationText = bien?.adresse 
    ? `${bien.adresse.rue}, ${bien.adresse.ville} (${bien.adresse.pays})` 
    : 'Abidjan, Côte d\'Ivoire';

  const equipements = bien?.equipements || ['Wifi', 'Climatisation', 'Parking Sécurisé'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Bouton retour */}
      <Link
        to="/annonces"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour à la recherche
      </Link>

      {/* GALERIE PHOTOS */}
      <div className="space-y-4">
        <div className="h-[420px] w-full bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-200 relative">
          <img
            src={photoList[activePhotoIndex]?.url}
            alt={titre}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase">
            {typeBien}
          </div>
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-slate-900 text-xl font-black px-5 py-2 rounded-2xl shadow-lg">
            {formatPrice(prix)}
          </div>
        </div>

        {/* Miniatures */}
        {photoList.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {photoList.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhotoIndex(idx)}
                className={`h-20 w-28 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activePhotoIndex === idx ? 'border-sky-600 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={p.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Colonne Gauche : Détails */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Titre & Adresse */}
          <div className="space-y-3 border-b border-slate-200/80 pb-6">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{titre}</h1>
            <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
              <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
              <span>{locationText}</span>
            </div>
          </div>

          {/* Caractéristiques Clés */}
          <div className="grid grid-cols-3 gap-4 bg-slate-100/70 p-5 rounded-2xl border border-slate-200/60 text-center">
            <div>
              <div className="text-xs text-slate-500 font-semibold">Chambres</div>
              <div className="text-lg font-bold text-slate-900 flex items-center justify-center gap-1 mt-1">
                <Bed className="w-4 h-4 text-sky-600" />
                {bien?.nombreChambres || nombrePieces || 1}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-semibold">Surface</div>
              <div className="text-lg font-bold text-slate-900 flex items-center justify-center gap-1 mt-1">
                <Maximize className="w-4 h-4 text-sky-600" />
                {surface} m²
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-semibold">Étage</div>
              <div className="text-lg font-bold text-slate-900 mt-1">
                {bien?.etage !== null && bien?.etage !== undefined ? `Étage ${bien.etage}` : 'Rez-de-chaussée'}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900">Description du bien</h3>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {description || 'Aucune description détaillée fournie pour cette annonce.'}
            </p>
          </div>

          {/* Équipements */}
          <div className="space-y-3 border-t border-slate-200/80 pt-6">
            <h3 className="text-xl font-bold text-slate-900">Équipements & Commodités</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {equipements.map((eq, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/80 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{eq}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Colonne Droite : Propriétaire & Action Visite */}
        <div className="space-y-6">
          
          {/* Card Propriétaire */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-600 font-bold flex items-center justify-center text-lg">
                {proprietaire?.prenom?.[0] || 'P'}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">
                  {proprietaire ? `${proprietaire.prenom} ${proprietaire.nom}` : 'Propriétaire Vérifié'}
                </h4>
                <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Profil vérifié sur AttouHome
                </div>
              </div>
            </div>

            {/* Information Contact */}
            {proprietaire?.telephone && (
              <div className="flex items-center gap-3 text-slate-700 text-sm font-semibold bg-slate-50 p-3 rounded-xl">
                <Phone className="w-4 h-4 text-sky-600" />
                <span>{proprietaire.telephone}</span>
              </div>
            )}

            {/* CTA Planification Visite */}
            <div className="space-y-3">
              <div className="text-xs text-slate-500 font-medium">
                Vous souhaitez visiter ce bien ? Planifiez votre visite facilement via notre application mobile.
              </div>
              <div className="bg-sky-50 border border-sky-200/70 p-4 rounded-2xl text-center space-y-2">
                <Smartphone className="w-8 h-8 text-sky-600 mx-auto" />
                <div className="text-xs font-bold text-sky-900">Demande de visite via l'App Locataire</div>
                <p className="text-[11px] text-sky-700">
                  Téléchargez <strong>AttouHome Locataire</strong> pour réserver un créneau de visite en 1 clic.
                </p>
              </div>
            </div>
          </div>

          {/* Badge de Garantie */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-3 text-xs leading-relaxed">
            <div className="font-bold text-sm text-sky-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Garantie Sécurité AttouHome
            </div>
            <p className="text-slate-300">
              Ne payez jamais d'avance par transfert d'argent sans avoir visité le bien au préalable. Reportez toute annonce suspecte.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default PropertyDetail;
