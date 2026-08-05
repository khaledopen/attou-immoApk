const axios = require('axios');

/**
 * Envoie un e-mail de réinitialisation de mot de passe via l'API HTTP de Mailjet.
 * Évite les blocages de ports SMTP (587/465) par Render.
 */
const sendResetEmail = async (toEmail, resetUrl) => {
  // ─── Toujours afficher le lien dans le terminal (utile en dev & debug prod) ───
  console.log('\n╔═══════════════════════════════════════════════════════╗');
  console.log('║          🔑 LIEN DE RÉINITIALISATION DU MOT DE PASSE          ║');
  console.log('╠═══════════════════════════════════════════════════════╣');
  console.log(`║  Destinataire : ${toEmail}`);
  console.log(`║  Lien         : ${resetUrl}`);
  console.log('╚═══════════════════════════════════════════════════════╝\n');

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    console.log(`[Mailer] Envoi via l'API HTTP Mailjet pour ${toEmail}...`);
    try {
      // Authentification Basic Base64 (API_KEY:SECRET_KEY) pour Mailjet
      const authHeader = Buffer.from(`${process.env.SMTP_USER}:${process.env.SMTP_PASS}`).toString('base64');

      const response = await axios.post(
        'https://api.mailjet.com/v3.1/send',
        {
          Messages: [
            {
              From: {
                Email: "konesory321@gmail.com", // Votre adresse d'envoi vérifiée sur Mailjet
                Name: "AttouHome Support"
              },
              To: [
                {
                  Email: toEmail,
                  Name: toEmail
                }
              ],
              Subject: "Réinitialisation de votre mot de passe — AttouHome",
              HTMLPart: `
                <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:30px;border-radius:16px;">
                  <div style="background:linear-gradient(135deg,#0ea5e9,#0284c7);padding:30px;border-radius:12px;text-align:center;margin-bottom:30px;">
                    <h1 style="color:#fff;margin:0;font-size:28px;">🏠 AttouHome</h1>
                  </div>
                  <div style="background:#fff;padding:30px;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,0.05);">
                    <h2 style="color:#1e293b;margin-top:0;">Réinitialisation du mot de passe</h2>
                    <p style="color:#64748b;line-height:1.6;">Bonjour,</p>
                    <p style="color:#64748b;line-height:1.6;">Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :</p>
                    <div style="text-align:center;margin:35px 0;">
                      <a href="${resetUrl}" style="background:#0ea5e9;color:#fff;padding:14px 32px;text-decoration:none;border-radius:10px;font-weight:bold;font-size:16px;display:inline-block;">
                        Réinitialiser mon mot de passe
                      </a>
                    </div>
                    <p style="color:#94a3b8;font-size:13px;">⏰ Ce lien expire dans <strong>30 minutes</strong>.</p>
                    <p style="color:#94a3b8;font-size:13px;">Si vous n'avez pas fait cette demande, ignorez cet e-mail.</p>
                  </div>
                  <p style="color:#cbd5e1;font-size:12px;text-align:center;margin-top:20px;">© 2026 AttouHome · Tous droits réservés</p>
                </div>
              `
            }
          ]
        },
        {
          headers: {
            'Authorization': `Basic ${authHeader}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log(`[Mailer] ✅ E-mail envoyé avec succès via API Mailjet. ID: ${response.data.Messages[0].To[0].MessageID}`);
      return true;
    } catch (err) {
      console.error(`[Mailer] ❌ Échec envoi via API Mailjet: ${err.message}`);
      if (err.response) {
        console.error(`[Mailer] ❌ Réponse API Mailjet:`, JSON.stringify(err.response.data));
      }
      return false;
    }
  }

  console.log('[Mailer] ⚠️ Configurations de clé Mailjet (SMTP_USER/SMTP_PASS) manquantes.');
  return false;
};

module.exports = { sendResetEmail };



