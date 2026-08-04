import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Bed, Maximize, CheckCircle2, ArrowUpRight } from 'lucide-react';

const PropertyCard = ({ property, index = 0, variant = 'standard' }) => {
  if (!property) return null;

  const {
    id,
    titre,
    prix,
    typeBien,
    surface,
    nombrePieces,
    bien,
    photos,
    statut
  } = property;

  // Images d'architecture et de biens immobiliers réelles et réalistes de haute qualité
  const realisticFallbacks = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
  ];

  const photoUrl = photos && photos.length > 0 && photos[0].url
    ? photos[0].url
    : realisticFallbacks[index % realisticFallbacks.length];

  const locationText = bien?.adresse 
    ? `${bien.adresse.rue}, ${bien.adresse.ville}` 
    : 'Abidjan, Côte d\'Ivoire';

  const chambres = bien?.nombreChambres || nombrePieces || 1;

  const formatPrice = (p) => {
    return new Intl.NumberFormat('fr-FR').format(p) + ' FCFA';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`group bg-white rounded-2xl border border-slate-200/70 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between ${
        variant === 'featured' ? 'md:col-span-2 md:flex-row' : ''
      }`}
    >
      {/* Container Photo */}
      <div className={`relative overflow-hidden bg-slate-100 ${
        variant === 'featured' ? 'md:w-1/2 h-72 md:h-auto' : 'h-64 w-full'
      }`}>
        <img
          src={photoUrl}
          alt={titre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.target.src = realisticFallbacks[0];
          }}
        />

        {/* Overlay pour lisibilité du prix */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-transparent to-transparent opacity-80" />

        {/* Badges en haut */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <span className="bg-primary-900 text-white text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            {typeBien}
          </span>
          {statut === 'PUBLIEE' && (
            <span className="bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Vérifié
            </span>
          )}
        </div>

        {/* Prix ancré en bas de photo */}
        <div className="absolute bottom-4 left-4">
          <div className="text-white font-black text-xl tracking-tight drop-shadow-md">
            {formatPrice(prix)}
            <span className="text-slate-300 text-xs font-normal ml-1">/ mois</span>
          </div>
        </div>
      </div>

      {/* Détails du Bien */}
      <div className={`p-6 flex-1 flex flex-col justify-between space-y-4 ${
        variant === 'featured' ? 'md:w-1/2 p-8' : ''
      }`}>
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-primary-600 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{locationText}</span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-primary-600 transition-colors">
            {titre}
          </h3>
        </div>

        {/* Caractéristiques */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg">
              <Bed className="w-4 h-4 text-slate-500" />
              <span>{chambres} ch.</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg">
              <Maximize className="w-4 h-4 text-slate-500" />
              <span>{surface} m²</span>
            </div>
          </div>

          <Link
            to={`/annonces/${id}`}
            className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-primary-500 text-slate-700 group-hover:text-white flex items-center justify-center transition-all duration-300"
            aria-label="Voir le bien"
          >
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
