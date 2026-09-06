const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

console.log('[App Startup] Démarrage automatique du tunnel de l\'API backend...');

// Garantir la présence des assets internes requis par react-native LogBox
try {
  const logBoxDir = path.join(__dirname, '../node_modules/react-native/Libraries/LogBox/UI/LogBoxImages');
  if (!fs.existsSync(logBoxDir)) {
    fs.mkdirSync(logBoxDir, { recursive: true });
  }
  const base64Png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  const buffer = Buffer.from(base64Png, 'base64');
  ['chevron-left.png', 'chevron-right.png', 'alert-triangle.png', 'loader.png', 'close.png'].forEach(img => {
    const filePath = path.join(logBoxDir, img);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, buffer);
    }
  });
} catch (e) {}

// Détection de l'IP du Point d'accès mobile de Windows (généralement 192.168.137.1)
let packagerHostname = undefined;
const interfaces = os.networkInterfaces();
for (const name of Object.keys(interfaces)) {
  for (const net of interfaces[name]) {
    if (net.family === 'IPv4' && !net.internal && net.address.startsWith('192.168.137.')) {
      packagerHostname = net.address;
      break;
    }
  }
  if (packagerHostname) break;
}

// Lance le script start-tunnel.js situé à la racine du projet
const tunnel = spawn('node', [path.join(__dirname, '../../start-tunnel.js')], {
  stdio: 'inherit',
  shell: true
});

// Attendre 4 secondes pour que le tunnel obtienne l'URL publique et mette à jour le fichier .env
setTimeout(() => {
  if (packagerHostname) {
    console.log(`[App Startup] Point d'accès mobile Windows détecté. Utilisation forcée de l'IP : ${packagerHostname}`);
  }
  console.log('[App Startup] Démarrage d\'Expo Go...');
  
  // Transfère tous les arguments additionnels (comme --clear, --android, --ios)
  const expoArgs = process.argv.slice(2);
  
  const expoEnv = { ...process.env };
  if (packagerHostname) {
    expoEnv.REACT_NATIVE_PACKAGER_HOSTNAME = packagerHostname;
    expoEnv.EXPO_DEV_CLIENT_HOST_ADDR = packagerHostname;
  }

  const expo = spawn('npx', ['expo', 'start', ...expoArgs], {
    stdio: 'inherit',
    shell: true,
    env: expoEnv
  });

  expo.on('close', (code) => {
    // Tue le tunnel si le serveur Expo s'arrête
    tunnel.kill();
    process.exit(code);
  });
}, 4000);
