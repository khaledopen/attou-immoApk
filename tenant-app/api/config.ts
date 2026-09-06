// ─── Configuration API Production ───
// Toutes les requêtes pointent vers le serveur Render hébergé

const RENDER_PROD_URL = 'https://projet-attou-immo.onrender.com';
const TUNNEL_URL = process.env.EXPO_PUBLIC_TUNNEL_URL;
const USE_TUNNEL = process.env.EXPO_PUBLIC_USE_TUNNEL === 'true';

const ACTIVE_URL = USE_TUNNEL && TUNNEL_URL ? TUNNEL_URL : RENDER_PROD_URL;

export const BASE_URL = `${ACTIVE_URL}/api`;
export const SOCKET_URL = ACTIVE_URL;

// ✅ URL de callback Google
export const GOOGLE_CALLBACK_URL = `${ACTIVE_URL}/api/auth/google/callback`;