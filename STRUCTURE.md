# 📂 Structure du Projet Portfolio

```
portfolio/
│
├── 📄 index.html                    # Page principale du portfolio
├── 📄 admin.html                    # Interface d'administration
│
├── 📁 css/
│   ├── style.css                    # Styles du portfolio
│   └── admin.css                    # Styles de l'admin
│
├── 📁 js/
│   ├── script.js                    # JavaScript du portfolio
│   └── admin.js                     # JavaScript de l'admin
│
├── 📁 images/                       # Dossier pour vos images
│   └── (ajoutez vos images ici)
│
├── 📁 server/                       # Backend Node.js
│   │
│   ├── 📄 server.js                 # Point d'entrée du serveur
│   ├── 📄 seed.js                   # Script d'initialisation de la BDD
│   │
│   ├── 📁 models/                   # Modèles MongoDB
│   │   ├── Project.js               # Modèle Projet
│   │   ├── Contact.js               # Modèle Contact
│   │   └── User.js                  # Modèle Utilisateur
│   │
│   ├── 📁 routes/                   # Routes de l'API
│   │   ├── projects.js              # Routes des projets
│   │   ├── contact.js               # Routes des contacts
│   │   └── auth.js                  # Routes d'authentification
│   │
│   └── 📁 middleware/               # Middleware
│       └── auth.js                  # Middleware d'authentification JWT
│
├── 📄 package.json                  # Dépendances et scripts npm
├── 📄 .env.example                  # Template des variables d'environnement
├── 📄 .gitignore                    # Fichiers à ignorer par Git
│
├── 📄 Procfile                      # Configuration Heroku
├── 📄 netlify.toml                  # Configuration Netlify
├── 📄 vercel.json                   # Configuration Vercel
│
├── 📄 deploy.sh                     # Script de déploiement automatisé
├── 📄 test-install.sh               # Script de test de l'installation
│
├── 📚 README.md                     # Documentation principale
├── 📚 QUICKSTART.md                 # Guide de démarrage rapide
├── 📚 DEPLOIEMENT.md                # Guide de déploiement complet
├── 📚 PERSONNALISATION.md           # Guide de personnalisation
├── 📚 CHANGELOG.md                  # Notes de version
└── 📚 STRUCTURE.md                  # Ce fichier
```

---

## 📋 Description des fichiers

### 🎨 Frontend (Interface utilisateur)

#### **index.html**
- Page d'accueil du portfolio
- Sections : Hero, About, Skills, Projects, Contact
- Chargement dynamique des projets depuis l'API

#### **admin.html**
- Interface d'administration
- Gestion des projets (CRUD)
- Consultation des messages de contact

#### **css/style.css**
- Styles du portfolio
- Design responsive
- Variables CSS pour la personnalisation
- Animations et transitions

#### **css/admin.css**
- Styles du panel admin
- Layout avec sidebar
- Thème sombre professionnel

#### **js/script.js**
- Navigation et menu mobile
- Animation du texte tapé
- Chargement des projets depuis l'API
- Gestion du formulaire de contact
- Animations au scroll

#### **js/admin.js**
- Authentification JWT
- Gestion des projets (ajouter, modifier, supprimer)
- Gestion des messages
- Interface de paramètres

---

### ⚙️ Backend (Serveur et API)

#### **server/server.js**
- Point d'entrée du serveur Express
- Configuration des middleware
- Connexion à MongoDB
- Gestion des routes
- Gestion des erreurs

#### **server/seed.js**
- Script d'initialisation de la base de données
- Création d'un utilisateur admin par défaut
- Insertion de projets de démonstration

#### **server/models/**
Modèles de données MongoDB avec Mongoose

- **Project.js** : Schéma des projets
  - Titre, description, image
  - Technologies utilisées
  - Liens GitHub et démo
  - Featured, order, dates

- **Contact.js** : Schéma des messages de contact
  - Nom, email, message
  - Statut lu/non lu
  - Date de création

- **User.js** : Schéma des utilisateurs
  - Username, email, password (hashé)
  - Rôle (admin/user)
  - Méthodes de validation

#### **server/routes/**
Endpoints de l'API REST

- **projects.js** : CRUD des projets
  - `GET /api/projects` - Liste des projets
  - `GET /api/projects/:id` - Détails d'un projet
  - `POST /api/projects` - Créer un projet (admin)
  - `PUT /api/projects/:id` - Modifier un projet (admin)
  - `DELETE /api/projects/:id` - Supprimer un projet (admin)

- **contact.js** : Gestion des messages
  - `POST /api/contact` - Envoyer un message
  - `GET /api/contact` - Liste des messages (admin)
  - `GET /api/contact/:id` - Détails d'un message (admin)
  - `PATCH /api/contact/:id/read` - Marquer comme lu (admin)
  - `DELETE /api/contact/:id` - Supprimer un message (admin)

- **auth.js** : Authentification
  - `POST /api/auth/register` - Créer un compte
  - `POST /api/auth/login` - Se connecter
  - `GET /api/auth/verify` - Vérifier le token

#### **server/middleware/auth.js**
- `authenticateToken` : Vérifier le token JWT
- `isAdmin` : Vérifier les droits admin

---

### 📦 Configuration

#### **package.json**
- Dépendances du projet
- Scripts npm :
  - `npm start` : Démarrer le serveur
  - `npm run dev` : Mode développement (auto-reload)
  - `npm run seed` : Initialiser la base de données

#### **.env.example**
Template des variables d'environnement :
- `PORT` : Port du serveur
- `MONGODB_URI` : URI de connexion MongoDB
- `JWT_SECRET` : Secret pour les tokens JWT
- `NODE_ENV` : Environnement (development/production)

#### **.gitignore**
Fichiers à ne pas versionner :
- `node_modules/`
- `.env`
- Logs et fichiers système

---

### 🚀 Déploiement

#### **Procfile**
Configuration pour Heroku (backend)

#### **netlify.toml**
Configuration pour Netlify (frontend)
- Redirections API
- Headers de sécurité

#### **vercel.json**
Configuration pour Vercel (frontend)

#### **deploy.sh**
Script bash interactif pour déployer :
- Heroku (backend)
- GitHub Pages (frontend)
- Les deux simultanément

#### **test-install.sh**
Script de vérification de l'installation :
- Vérifier Node.js, npm, MongoDB
- Tester le serveur
- Vérifier la configuration

---

### 📚 Documentation

#### **README.md**
Documentation principale :
- Vue d'ensemble du projet
- Installation locale
- Utilisation
- API endpoints
- Déploiement

#### **QUICKSTART.md**
Guide de démarrage rapide :
- Installation en 5 minutes
- Commandes essentielles
- Problèmes courants

#### **DEPLOIEMENT.md**
Guide de déploiement complet :
- Utilisation du GitHub Student Pack
- Déploiement sur Heroku, DigitalOcean, Render
- Configuration MongoDB Atlas
- Domaines personnalisés
- Coût : 0€ avec le Student Pack

#### **PERSONNALISATION.md**
Guide de personnalisation :
- Modifier les informations personnelles
- Changer les couleurs
- Ajouter des images
- Configurer le formulaire
- SEO et Analytics
- Optimisations

#### **CHANGELOG.md**
Notes de version :
- Historique des versions
- Fonctionnalités ajoutées
- Améliorations prévues

#### **STRUCTURE.md** (ce fichier)
Description de la structure du projet

---

## 🔄 Flux de données

```
┌─────────────┐
│  Frontend   │
│ (HTML/CSS)  │
│             │
│ index.html  │
│ admin.html  │
└──────┬──────┘
       │
       │ HTTP Requests
       ↓
┌──────────────┐
│   Backend    │
│  (Express)   │
│              │
│  Routes API  │
└──────┬───────┘
       │
       │ Mongoose
       ↓
┌──────────────┐
│   MongoDB    │
│  (Database)  │
│              │
│  Collections │
└──────────────┘
```

---

## 🔐 Sécurité

### Authentification
1. Utilisateur envoie email + mot de passe
2. Backend vérifie avec bcrypt
3. Si valide, génère un JWT
4. Frontend stocke le token
5. Chaque requête protégée inclut le token

### Autorisation
- Routes publiques : GET projets, POST contact
- Routes protégées : Admin uniquement
- Middleware vérifie le rôle dans le token

---

## 📊 Technologies utilisées

### Frontend
- HTML5
- CSS3 (Variables, Flexbox, Grid)
- JavaScript ES6+ (Fetch API, Async/Await)
- Font Awesome (icônes)

### Backend
- Node.js v18+
- Express v4
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Bcrypt.js
- Helmet (sécurité)
- Express Rate Limit
- CORS

### Outils
- Git (versioning)
- npm (gestion des packages)
- Nodemon (développement)

---

## 🎯 Prochaines étapes

Après avoir installé le portfolio :

1. ✅ Personnalisez les informations (PERSONNALISATION.md)
2. ✅ Ajoutez vos projets via l'admin
3. ✅ Testez en local
4. ✅ Déployez sur Heroku + GitHub Pages (DEPLOIEMENT.md)
5. ✅ Configurez un domaine personnalisé
6. ✅ Ajoutez Google Analytics
7. ✅ Optimisez le SEO
8. ✅ Partagez votre portfolio ! 🎉

---

**Besoin d'aide ?** Consultez les autres fichiers de documentation ou ouvrez une issue ! 🚀
