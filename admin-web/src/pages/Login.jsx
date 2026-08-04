import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Building2, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../api/config';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (user.role !== 'ADMIN') {
        setError("Adresse e-mail ou mot de passe incorrect.");
        setLoading(false);
        return;
      }

      onLoginSuccess(token, user);
    } catch (err) {
      console.error('Erreur connexion:', err);
      setError('Adresse e-mail ou mot de passe incorrect.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans">
      {/* Image d'arrière-plan immobilière */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/login-bg.png')" }}
      ></div>
      {/* Overlay sombre pour la lisibilité */}
      <div className="absolute inset-0 bg-primary-900/85"></div>

      <div className="w-full max-w-md p-8 relative z-10">
        {/* Conteneur principal */}
        <div className="bg-primary-900 rounded-[28px] p-8 shadow-2xl">

          {/* Logo & En-tête */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-primary-500 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/25 mb-4">
              <Building2 className="text-white" size={28} />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white mb-1">
              Attou<span className="text-primary-400">Home</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest text-primary-400/80">Portail d'administration</p>
          </div>

          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold text-slate-100">Connexion requise</h2>
            <p className="text-slate-400 text-sm mt-1">Entrez vos identifiants administrateur pour continuer</p>
          </div>

          {/* Alertes d'erreur */}
          {error && (
            <div className="mb-6 flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm">
              <AlertCircle size={20} className="shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Adresse E-mail
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Mail size={20} />
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="admin@attouhome.ci"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="block w-full pl-12 pr-4 py-4 bg-slate-950/60 border border-slate-800 text-slate-100 placeholder-slate-600 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Mot de Passe
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Lock size={20} />
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="block w-full pl-12 pr-12 py-4 bg-slate-950/60 border border-slate-800 text-slate-100 placeholder-slate-600 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-4 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/20 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Pied de page */}
        <p className="text-center text-slate-600 text-xs mt-8">
          © {new Date().getFullYear()} AttouHome. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};

export default Login;
