import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Maximize, CheckCircle2, ArrowUpRight } from 'lucide-react';

const PropertyCard = ({ property }) => {
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

  const firstPhoto = photos && photos.length > 0 ? photos[0].url : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80';
  const locationText = bien?.adresse ? `${bien.adresse.rue}, ${bien.adresse.ville}` : 'Abidjan, Côte d\'Ivoire';
  const chambres = bien?.nombreChambres || nombrePieces || 1;

  const formatPrice = (p) => {
    return new Intl.NumberFormat('fr-FR').format(p) + ' FCFA';
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <img
          src={firstPhoto}
          alt={titre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80';
          }}
        />
        
        {/* Type Badge */}
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {typeBien}
        </div>

        {/* Statut Badge */}
        {statut === 'PUBLIEE' && (
          <div className="absolute top-3 right-3 bg-emerald-500/90 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Vérifié
          </div>
        )}

        {/* Price Tag */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-slate-900 font-black text-sm px-3.5 py-1.5 rounded-xl shadow-md border border-white/40">
          {formatPrice(prix)}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-sky-600 transition-colors">
            {titre}
          </h3>

          <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-2">
            <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span className="truncate">{locationText}</span>
          </div>
        </div>

        {/* Features Specs */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4 text-slate-400" />
            <span>{chambres} ch.</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4 text-slate-400" />
            <span>{surface} m²</span>
          </div>
          
          <Link
            to={`/annonces/${id}`}
            className="flex items-center gap-1 font-bold text-sky-600 hover:text-sky-700 transition-colors"
          >
            Détails
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
