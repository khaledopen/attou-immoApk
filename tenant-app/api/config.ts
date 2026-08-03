// ─── Configuration API Production ───
// Toutes les requêtes pointent vers le serveur Render hébergé

const RENDER_PROD_URL = 'https://projet-attou-immo.onrender.com';

export const BASE_URL = `${RENDER_PROD_URL}/api`;
export const SOCKET_URL = RENDER_PROD_URL;

// ✅ URL de callback Google pour la production
export const GOOGLE_CALLBACK_URL = `${RENDER_PROD_URL}/api/auth/google/callback`;