const axios = require('axios');
const nodemailer = require('nodemailer');

/**
 * Envoie un e-mail de réinitialisation de mot de passe.
 * En local: utilise Nodemailer avec les identifiants SMTP (ex: Gmail).
 * En production (Render): utilise l'API HTTP Mailjet pour éviter le blocage des ports SMTP.
 */
const sendResetEmail = async (toEmail, resetUrl) => {
  // ─── Toujours afficher le lien dans le terminal (utile en dev & debug prod) ───
  console.log('\n╔═══════════════════════════════════════════════════════╗');
  console.log('║          🔑 LIEN DE RÉINITIALISATION DU MOT DE PASSE          ║');
  console.log('╠═══════════════════════════════════════════════════════╣');
  console.log(`║  Destinataire : ${toEmail}`);
  console.log(`║  Lien         : ${resetUrl}`);
  console.log('╚═══════════════════════════════════════════════════════╝\n');

  const emailHtml = `
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
  `;

  // ─── 1. MODE LOCAL : Utilisation de SMTP classique (ex: Gmail) ───
  if (process.env.NODE_ENV !== 'production' && process.env.SMTP_HOST) {
    console.log(`[Mailer] Local : Envoi via SMTP ${process.env.SMTP_HOST} pour ${toEmail}...`);
    try {
      let transporterConfig;
      if (process.env.SMTP_HOST.includes('gmail.com')) {
        transporterConfig = {
          service: 'gmail',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        };
      } else {
        transporterConfig = {
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587', 10),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          connectionTimeout: 5000, // 5 secondes max pour se connecter
          greetingTimeout: 5000,
          socketTimeout: 5000,
          tls: {
            rejectUnauthorized: false // Évite les erreurs de certificat SSL locales
          }
        };
      }

      const transporter = nodemailer.createTransport(transporterConfig);

      await transporter.sendMail({
        from: `"AttouHome Support" <${process.env.SMTP_USER}>`,
        to: toEmail,
        subject: "Réinitialisation de votre mot de passe — AttouHome",
        html: emailHtml,
      });

      console.log(`[Mailer] ✅ E-mail envoyé avec succès via SMTP local.`);
      return true;
    } catch (err) {
      console.error(`[Mailer] ❌ Échec envoi via SMTP local : ${err.message}`);
      console.log(`[Mailer] Tentative de bascule vers l'API HTTP Mailjet...`);
    }
  }

  // ─── 2. MODE PRODUCTION : Envoi via l'API HTTP de Mailjet ───
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    console.log(`[Mailer] Production : Envoi via l'API HTTP Mailjet pour ${toEmail}...`);
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
                Name: "Support AttouHome"
              },
              To: [
                {
                  Email: toEmail,
                  Name: toEmail
                }
              ],
              Subject: "Réinitialisation de votre mot de passe — AttouHome",
              HTMLPart: emailHtml
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

  console.log('[Mailer] ⚠️ Configurations de messagerie manquantes.');
  return false;
};

module.exports = { sendResetEmail };



