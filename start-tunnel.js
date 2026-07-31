// start-tunnel.js – lance un tunnel ultra-stable (Serveo ou Localtunnel) et met à jour .env
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');
const os = require('os');

const pidFile = path.join(__dirname, 'localtunnel.pid');

// Détection si le point d'accès mobile de Windows est actif
let hasHotspot = false;
const interfaces = os.networkInterfaces();
for (const name of Object.keys(interfaces)) {
  for (const net of interfaces[name]) {
    if (net.family === 'IPv4' && !net.internal && net.address.startsWith('192.168.137.')) {
      hasHotspot = true;
      break;
    }
  }
  if (hasHotspot) break;
}

// Fonction pour écrire les variables d'environnement dans les .env des deux apps
function updateEnvFiles(url) {
  const useTunnel = !hasHotspot;
  const envLines = `EXPO_PUBLIC_TUNNEL_URL=${url}\nEXPO_PUBLIC_USE_TUNNEL=${useTunnel}\nTUNNEL_URL=${url}\nUSE_TUNNEL=${useTunnel}\n`;
  const apps = ['owner-app', 'tenant-app'];
  apps.forEach(app => {
    const envPath = path.join(__dirname, app, '.env');
    fs.writeFileSync(envPath, envLines, { encoding: 'utf8' });
    console.log(`[tunnel] .env mis à jour pour ${app}: ${envPath} (useTunnel: ${useTunnel})`);
  });
}

// Fonction pour vérifier si le tunnel enregistré est toujours actif et fonctionnel
function checkActiveTunnel(callback) {
  // 1. Vérifier si le processus local du tunnel est toujours en cours d'exécution
  if (!fs.existsSync(pidFile)) {
    return callback(false);
  }
  try {
    const pid = parseInt(fs.readFileSync(pidFile, 'utf8').trim(), 10);
    if (!pid) return callback(false);
    process.kill(pid, 0); // Lève une erreur si le processus n'existe pas
    
    console.log(`[tunnel] Un processus de tunnel est déjà actif (PID: ${pid}). Réutilisation.`);
    return callback(true);
  } catch (e) {
    console.log("[tunnel] L'ancien processus de tunnel local n'existe plus.");
    return callback(false);
  }
}

function cleanupPid() {
  if (fs.existsSync(pidFile)) {
    try {
      fs.unlinkSync(pidFile);
    } catch (e) {}
  }
}

function startNewTunnel() {
  // ─── Singleton : Nettoyage d'une ancienne instance de tunnel si présente ───
  if (fs.existsSync(pidFile)) {
    try {
      const oldPid = parseInt(fs.readFileSync(pidFile, 'utf8').trim(), 10);
      if (oldPid) {
        console.log(`[tunnel] Fermeture de l'ancien tunnel obsolète (PID: ${oldPid})...`);
        process.kill(oldPid, 'SIGINT');
      }
    } catch (err) {
      // Le processus était déjà fermé ou n'existait plus
    }
  }

  // ─── Optionnel : Support de Ngrok permanent si tunnel-config.json présent ───
  const configPath = path.join(__dirname, 'tunnel-config.json');
  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      if (config.useNgrok && config.ngrokToken && config.ngrokDomain) {
        console.log(`[tunnel] Démarrage du tunnel permanent avec Ngrok (Domaine: ${config.ngrokDomain})...`);
        const { execSync } = require('child_process');
        try {
          execSync(`npx ngrok config add-authtoken ${config.ngrokToken}`, { stdio: 'ignore' });
        } catch (e) {
          console.log(`[tunnel] Erreur configuration token Ngrok: ${e.message}`);
        }

        const tunnelProcess = spawn('npx', ['-y', 'ngrok', 'http', '5000', '--url', config.ngrokDomain], {
          stdio: 'ignore',
          shell: true
        });

        fs.writeFileSync(pidFile, String(tunnelProcess.pid), { encoding: 'utf8' });
        const url = `https://${config.ngrokDomain}`;
        
        setTimeout(() => {
          console.log(`[tunnel Ngrok] URL permanente activée : ${url}`);
          updateEnvFiles(url);
        }, 2000);

        tunnelProcess.on('close', code => {
          console.log(`[tunnel Ngrok] Tunnel fermé avec le code ${code}`);
          cleanupPid();
        });
        return;
      }
    } catch (e) {
      console.log(`[tunnel] Erreur lors du chargement de tunnel-config.json: ${e.message}`);
    }
  }

  // Engine 1 : Localtunnel (Moteur principal pour avoir le sous-domaine fixe attouhome-sory-api)
  console.log('[tunnel] Tentative de démarrage du tunnel principal Localtunnel...');
  let tunnelProcess = spawn('npx', ['localtunnel', '--port', '5000', '--local-host', '127.0.0.1', '--subdomain', 'attouhome-sory-api'], {
    stdio: ['ignore', 'pipe', 'inherit'],
    shell: true
  });

  // Enregistre le PID du processus actuel
  fs.writeFileSync(pidFile, String(tunnelProcess.pid), { encoding: 'utf8' });

  let ltOutput = '';
  let gotUrl = false;

  // Timeout de fallback : si Localtunnel ne répond pas sous 6 secondes, on passe à Serveo
  const fallbackTimeout = setTimeout(() => {
    if (!gotUrl) {
      console.log('[tunnel] Localtunnel ne répond pas ou est saturé. Bascule automatique vers le moteur de secours Serveo (SSH)...');
      try {
        tunnelProcess.kill();
      } catch (e) {}

      // Engine 2 : Serveo (Moteur de secours)
      tunnelProcess = spawn('ssh', [
        '-o', 'StrictHostKeyChecking=no',
        '-o', 'ServerAliveInterval=60',
        '-o', 'ServerAliveCountMax=3',
        '-R', 'attouhome-sory-api:80:127.0.0.1:5000',
        'serveo.net'
      ], {
        stdio: ['ignore', 'pipe', 'inherit'],
        shell: true
      });
      fs.writeFileSync(pidFile, String(tunnelProcess.pid), { encoding: 'utf8' });

      let serveoOutput = '';
      tunnelProcess.stdout.on('data', data => {
        serveoOutput += data.toString();
        const match = serveoOutput.match(/Forwarding HTTP traffic from (https:\/\/[^\s]+)/i) || 
                      serveoOutput.match(/https:\/\/[a-zA-Z0-9.-]+\.serveousercontent\.com/i) || 
                      serveoOutput.match(/https:\/\/(?!console\.)[a-zA-Z0-9.-]+\.serveo\.net/i);
        if (match) {
          gotUrl = true;
          const url = match[1] || match[0];
          console.log(`[tunnel de secours] URL obtenue via Serveo: ${url}`);
          updateEnvFiles(url);
        }
      });

      tunnelProcess.on('close', code => {
        console.log(`[tunnel de secours] Serveo terminé avec le code ${code}`);
        cleanupPid();
      });
    }
  }, 6000);

  tunnelProcess.stdout.on('data', data => {
    if (gotUrl) return;
    ltOutput += data.toString();
    const match = ltOutput.match(/your url is: (https:\/\/[^\s]+)/i);
    if (match) {
      gotUrl = true;
      clearTimeout(fallbackTimeout);
      const url = match[1];
      console.log(`[tunnel principal] URL obtenue via Localtunnel: ${url}`);
      updateEnvFiles(url);
    }
  });

  tunnelProcess.on('close', code => {
    if (!gotUrl) {
      console.log(`[tunnel principal] Localtunnel s'est arrêté avec le code ${code}`);
    } else {
      console.log('[tunnel principal] Fermeture du tunnel Localtunnel.');
      cleanupPid();
    }
  });
}

// Lancement avec vérification de l'état du tunnel existant
checkActiveTunnel((isActive) => {
  if (isActive) {
    // Si le tunnel est actif, on conserve l'instance actuelle et on quitte proprement
    process.exit(0);
  } else {
    // Sinon, on recrée un nouveau tunnel
    startNewTunnel();
  }
});
  