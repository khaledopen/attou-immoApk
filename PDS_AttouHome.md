# PRODUCT DESIGN SPECIFICATION (PDS)
## Projet AttouHome — Plateforme de Location Immobilière Assistée

---

## 📖 1. Introduction & Objectifs du Projet
**AttouHome** est une plateforme mobile et web de mise en relation directe entre propriétaires bailleurs (owners) et locataires (tenants) en Côte d'Ivoire (principalement à Abidjan). 

L'objectif principal du projet est de simplifier et de sécuriser la recherche de logements en apportant des fonctionnalités innovantes :
- **Cartographie interactive** avec calcul d'itinéraire routier en temps réel.
- **Messagerie instantanée sécurisée** et liée à des demandes de visite préalables.
- **Autocomplétion intelligente d'adresses** pour les propriétaires.
- **Automatisation backend** (expiration des demandes de visite sous 72h, modération sous 24h).

---

## 🛠️ 2. Architecture Technique & Tech Stack

La plateforme repose sur une architecture moderne à trois tiers (Client, Serveur API, Base de données).

```
   ┌─────────────────────────────────────────────────────────┐
   │                     CLIENT LAYERS                       │
   │                                                         │
   │  ┌──────────────────┐ ┌──────────────────┐ ┌─────────┐  │
   │  │    Owner App     │ │    Tenant App    │ │  Admin  │  │
   │  │  (React Native)  │ │  (React Native)  │ │  (Web)  │  │
   │  └────────┬─────────┘ └────────┬─────────┘ └────┬────┘  │
   └───────────┼────────────────────┼────────────────┼───────┘
               │                    │                │
               │ (HTTP / WebSockets)│                │ (HTTP)
               ▼                    ▼                ▼
   ┌─────────────────────────────────────────────────────────┐
   │                     BACKEND LAYER                       │
   │                                                         │
   │               Node.js + Express API                     │
   │     ┌─────────────────────────────────────────────┐     │
   │     │ - Socket.io (Temps Réel)                    │     │
   │     │ - Prisma ORM (Modélisation de données)      │     │
   │     │ - Nodemailer (Mails d'authentification)     │     │
   │     │ - Cron Jobs / Interval-based worker         │     │
   │     └─────────────────────────────────────────────┘     │
   └───────────────────────────┬─────────────────────────────┘
                               │ (Prisma Client)
                               ▼
   ┌─────────────────────────────────────────────────────────┐
   │                     DATABASE LAYER                      │
   │                                                         │
   │                 PostgreSQL Database                     │
   └─────────────────────────────────────────────────────────┘
```

### 2.1 Technologies Employées
- **Frontend Mobile :** React Native (Expo SDK 54, TypeScript, Expo Router).
  - Gestion audio : `expo-av` pour les notifications sonores.
  - Positionnement : `expo-location` pour l'accès aux permissions GPS.
  - Cartographie : `react-native-maps` (Apple Maps sur iOS, Google Maps sur Android). Afin d'éviter l'importation de modules natifs incompatibles sur le Web, les composants ont été séparés à l'aide de wrappers de plateforme spécifiques (`MapComponents.tsx` pour mobile, et `MapComponents.web.tsx` exportant des valeurs `null` pour le navigateur).
- **Backend API :** Node.js, Express, TypeScript, Socket.io, Nodemailer, Prisma ORM.
- **Base de données :** PostgreSQL (persistance et intégrité relationnelle).
- **APIs Tierces (Gratuites & Open-source) :**
  - **OSRM (Open Source Routing Machine) :** Calcul d'itinéraire routier en temps réel.
  - **Nominatim (OpenStreetMap) :** Autocomplétion d'adresses géographiques limitées à la Côte d'Ivoire.

---

## 🗄️ 3. Modèle de Données & Schéma Prisma (Base de Données)

Le schéma relationnel est géré par **Prisma ORM**. Les entités clés sont les suivantes :

1. **Utilisateur (User) :** Stocke les profils (nom, prénom, e-mail, téléphone, mot de passe haché) et le rôle (`PROPRIETAIRE` ou `LOCATAIRE`).
2. **Bien (Property/Bien) :** Contient la surface, le nombre de chambres, de pièces, les équipements et l'adresse.
3. **Annonce (Annonce) :** L'offre de location avec le titre, la description, le prix mensuel, le statut (`PUBLIEE`, `SUSPENDUE`, `BROUILLON`) et les photos associées.
4. **Visite (Visit) :** Représente une demande de rendez-vous avec une date, une heure, un statut (`EN_ATTENTE`, `ACCEPTEE`, `REFUSEE`, `EXPIREE`).
5. **Message / Discussion (Chat) :** Gère l'historique des discussions instantanées associées à un bien.

---

## ⚙️ 4. Spécifications Fonctionnelles & Flux Métiers

### 4.1 Authentification & Réinitialisation de mot de passe
- Inscription et connexion sécurisées par jeton JWT.
- Envoi d'un e-mail formaté en HTML avec **Nodemailer** pour réinitialiser le mot de passe via un lien sécurisé d'une durée de validité de 1 heure.

### 4.2 Module Cartographique & Itinéraire en Temps Réel (Locataire)
- **Permissions :** Demande automatique de la localisation utilisateur à l'ouverture de l'onglet Carte.
- **Positionnement automatique :** Si les coordonnées GPS d'un bien en base de données sont manquantes, l'application les positionne selon sa commune avec un décalage (Jitter) pour éviter les superpositions d'épingles.
- **Tracé de l'itinéraire :** Au clic sur une épingle de prix (ex: `150k` avec icône 🏠) :
  1. Requête vers l'API OSRM : `https://router.project-osrm.org/route/v1/driving/...`
  2. Traitement des données et dessin d'une ligne de route (Polyline) sur la carte.
  3. Formatage de la distance et de la durée (ex : `🚗 4.2 km (8 min)`) affiché dans un badge vert.
  4. En cas d'erreur de réseau ou d'API, calcul géométrique direct via la **formule de Haversine** avec indicateur `(direct)`.

```
                    ┌─────────────────────────┐
                    │ Clic sur une annonce    │
                    │      sur la carte       │
                    └────────────┬────────────┘
                                 │
                                 ▼
                     /───────────────────────\
                    <   GPS actif et OSRM?    >
                     \───────────────────────/
                                 │
                    ┌────────────┴────────────┐
             Oui    │                         │  Non
      ┌─────────────▼─────────────┐     ┌─────▼─────────────────────┐
      │ Appel API OSRM            │     │ Calcul mathématique       │
      │ (Itinéraire routier réel) │     │ Formule de Haversine      │
      └─────────────┬─────────────┘     └───────────┬───────────────┘
                    │                               │
                    ▼                               ▼
      ┌───────────────────────────┐     ┌───────────────────────────┐
      │ Tracé route réelle        │     │ Tracé ligne directe       │
      │ Badge: 4.2 km (8 min)     │     │ Badge: 5.1 km (direct)    │
      └───────────────────────────┘     └───────────────────────────┘
```

### 4.3 Redirection Directe "Voir sur la carte"
- Sur la page de détails du logement (`property/[id].tsx`), un bouton premium `"Voir sur la carte"` redirige vers l'onglet Carte en passant le paramètre `?focus=id`.
- La carte intercepte ce paramètre, cible le bien, s'y positionne avec un zoom de précision et affiche immédiatement son aperçu d'itinéraire.

### 4.4 Tchat & Validation Sonore avec Sécurisation
- **Condition de contact :** Un locataire ne peut pas directement ouvrir un salon de discussion avec le propriétaire. Il doit d'abord soumettre une demande de visite (date + heure). Une fois acceptée par le propriétaire, le canal de discussion s'ouvre.
- **Temps Réel Ngrok-Bypass :** Configuration de Socket.io avec fallback de transport HTTP Polling + WebSockets pour contourner les limitations de pare-feu des tunnels Ngrok en développement.
- **Notifications Sonores (`expo-av`) :** Lecture instantanée d'un fichier audio (ding doux) à la réception d'un nouveau message, et déchargement de la mémoire au runtime.
- **Architecture de Notifications :** Les alertes instantanées et sonores s'appuient sur Socket.io en premier plan (foreground). L'architecture est conçue pour être étendue en production avec le module native `expo-notifications` (requérant l'enregistrement du projet cloud Expo avec son `projectId` et la liaison avec Apple APNs et Google FCM pour le support en tâche de fond/background).

### 4.5 Expiration Automatique sous 72h (Backend Task)
- Une tâche de fond tourne toutes les 60 secondes sur le serveur.
- Si une demande de visite en statut `EN_ATTENTE` dépasse 72h sans réponse du propriétaire, elle passe à `REFUSEE` (ou `EXPIREE`).
- Une notification en base est créée et envoyée en Socket.io au locataire (déclenchant une alerte sonore et visuelle instantanée).

### 4.6 Signalement & Modération sous 24h
- Un locataire peut signaler une annonce suspecte.
- L'annonce est alors suspendue (`SUSPENDUE`) et masquée des recherches.
- **Blocage de messagerie :** Le propriétaire voit sa messagerie bloquée pour cette annonce avec un bandeau rouge explicatif de l'administration. Il a 24 heures pour corriger son annonce depuis son espace afin de la soumettre à nouveau à la validation (limitée à 20 annonces max).

---

## 🔒 5. Sécurité, Performance & Fiabilité
- **Hachage des mots de passe :** Bcrypt.
- **Sécurisation des requêtes :** JWT Headers.
- **Gestion de la mémoire mobile :** Libération des ressources de lecture audio d'expo-av après chaque bip de notification pour éviter les fuites de mémoire.
- **Qualité du typage :** Typage complet en TypeScript. La commande `npx tsc --noEmit` a validé le typage robuste de nos composants.
