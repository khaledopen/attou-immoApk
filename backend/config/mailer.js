const axios = require('axios');

/**
 * Envoie un e-mail de réinitialisation de mot de passe via l'API HTTP de Brevo.
 * Cela évite les blocages de ports SMTP (587/465) imposés par l'infrastructure Render.
 */
const sendResetEmail = async (toEmail, resetUrl) => {
  // ─── Toujours afficher le lien dans le terminal (utile en dev & debug prod) ───
  console.log('\n╔═══════════════════════════════════════════════════════╗');
  console.log('║          🔑 LIEN DE RÉINITIALISATION DU MOT DE PASSE          ║');
  console.log('╠═══════════════════════════════════════════════════════╣');
  console.log(`║  Destinataire : ${toEmail}`);
  console.log(`║  Lien         : ${resetUrl}`);
  console.log('╚═══════════════════════════════════════════════════════╝\n');

  // Si on a la clé API Brevo (stockée dans SMTP_PASS)
  if (process.env.SMTP_PASS && process.env.SMTP_USER) {
    console.log(`[Mailer] Envoi via l'API HTTP Brevo pour ${toEmail}...`);
    try {
      const response = await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        {
          sender: { name: 'AttouHome Support', email: 'no-reply@attouhome.com' },
          to: [{ email: toEmail }],
          subject: 'Réinitialisation de votre mot de passe — AttouHome',
          htmlContent: `
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
        },
        {
          headers: {
            'accept': 'application/json',
            'api-key': process.env.SMTP_PASS, // La clé API Brevo (xsmtpsib-...)
            'content-type': 'application/json'
          }
        }
      );

      console.log(`[Mailer] ✅ E-mail envoyé via API HTTP Brevo avec succès. ID Message: ${response.data.messageId}`);
      return true;
    } catch (err) {
      console.error(`[Mailer] ❌ Échec envoi via API Brevo: ${err.message}`);
      if (err.response) {
        console.error(`[Mailer] ❌ Réponse API Brevo:`, JSON.stringify(err.response.data));
      }
      return false;
    }
  }

  console.log('[Mailer] ⚠️ SMTP_PASS manquant. Impossible d\'appeler l\'API Brevo.');
  return false;
};

module.exports = { sendResetEmail };

