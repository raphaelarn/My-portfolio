# 🚀 Portfolio de Développeur - Guide de Déploiement

Ce guide vous explique comment déployer votre portfolio en utilisant les services **gratuits** du **GitHub Student Developer Pack**.

## 📦 Ce qui est inclus

- **Frontend** : Site web portfolio (HTML/CSS/JavaScript)
- **Backend** : API REST (Node.js + Express + MongoDB)
- **Admin Panel** : Interface d'administration pour gérer vos projets

---

## 🎓 GitHub Student Developer Pack

Le GitHub Student Developer Pack offre des crédits et accès gratuits à de nombreux services :

- **$200 de crédit DigitalOcean** (24 mois)
- **Heroku Eco Dyno gratuit** (avec GitHub Student Pack)
- **MongoDB Atlas gratuit** (512MB de stockage)
- **Namecheap** : Domaine .me gratuit (1 an)
- **SSL gratuit** avec Let's Encrypt
- Et bien plus...

👉 **Inscrivez-vous sur : https://education.github.com/pack**

---

## 🛠️ Prérequis

1. Compte GitHub avec Student Pack activé
2. Node.js installé localement (v18+)
3. MongoDB installé ou compte MongoDB Atlas
4. Git installé

---

## 📋 Étape 1 : Préparation du code

### 1.1 Initialiser Git

```bash
cd portfolio
git init
git add .
git commit -m "Initial commit - Portfolio"
```

### 1.2 Créer un dépôt GitHub

1. Allez sur https://github.com
2. Créez un nouveau repository **public** nommé `portfolio`
3. Liez votre dépôt local :

```bash
git remote add origin https://github.com/VOTRE-USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

---

## 🗄️ Étape 2 : Configurer MongoDB Atlas (Gratuit)

### 2.1 Créer un cluster MongoDB

1. Allez sur https://www.mongodb.com/cloud/atlas
2. Créez un compte (gratuit avec Student Pack)
3. Créez un cluster **M0 Sandbox** (gratuit)
4. Choisissez une région proche de vous

### 2.2 Configurer l'accès

1. **Database Access** : Créez un utilisateur avec mot de passe
2. **Network Access** : Ajoutez `0.0.0.0/0` (permettre toutes les IPs)

### 2.3 Obtenir l'URI de connexion

1. Cliquez sur "Connect" > "Connect your application"
2. Copiez l'URI de connexion (format : `mongodb+srv://...`)
3. Remplacez `<password>` par votre mot de passe

---

## ☁️ Étape 3 : Déployer le Backend

### Option A : Heroku (Recommandé avec Student Pack)

#### 3.1 Installer Heroku CLI

```bash
# Ubuntu/Debian
curl https://cli-assets.heroku.com/install.sh | sh

# macOS
brew tap heroku/brew && brew install heroku

# Windows
# Télécharger depuis : https://devcenter.heroku.com/articles/heroku-cli
```

#### 3.2 Se connecter et créer l'application

```bash
heroku login
heroku create mon-portfolio-api
```

#### 3.3 Configurer les variables d'environnement

```bash
heroku config:set MONGODB_URI="votre-uri-mongodb-atlas"
heroku config:set JWT_SECRET="votre_secret_jwt_tres_securise"
heroku config:set NODE_ENV="production"
```

#### 3.4 Déployer

```bash
git push heroku main
```

#### 3.5 Initialiser la base de données

```bash
heroku run npm run seed
```

Votre API est maintenant accessible sur : `https://mon-portfolio-api.herokuapp.com`

---

### Option B : DigitalOcean App Platform (avec crédit Student Pack)

#### 3.1 Créer une App

1. Allez sur https://cloud.digitalocean.com
2. Utilisez votre crédit étudiant ($200)
3. Créez une nouvelle App depuis votre dépôt GitHub

#### 3.2 Configuration

- **Type** : Node.js
- **Build Command** : `npm install`
- **Run Command** : `npm start`
- **Environment Variables** :
  - `MONGODB_URI` : votre URI MongoDB
  - `JWT_SECRET` : votre secret JWT
  - `NODE_ENV` : production

#### 3.3 Déployer

DigitalOcean déploie automatiquement à chaque push sur GitHub !

---

### Option C : Render (100% Gratuit, sans crédit requis)

#### 3.1 Créer un compte sur Render

1. Allez sur https://render.com
2. Connectez-vous avec GitHub

#### 3.2 Créer un nouveau Web Service

1. Cliquez sur "New +" > "Web Service"
2. Connectez votre repository GitHub
3. Configuration :
   - **Name** : mon-portfolio-api
   - **Environment** : Node
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
   - **Plan** : Free

#### 3.3 Variables d'environnement

Dans l'onglet "Environment", ajoutez :
- `MONGODB_URI`
- `JWT_SECRET`
- `NODE_ENV=production`

Render déploie automatiquement !

---

## 🌐 Étape 4 : Déployer le Frontend

### Option A : GitHub Pages (100% Gratuit)

#### 4.1 Modifier `js/script.js`

Remplacez l'URL de l'API :

```javascript
const API_URL = 'https://mon-portfolio-api.herokuapp.com/api';
```

#### 4.2 Modifier `js/admin.js`

```javascript
const API_URL = 'https://mon-portfolio-api.herokuapp.com/api';
```

#### 4.3 Activer GitHub Pages

1. Allez dans les Settings de votre repository
2. Section "Pages"
3. Source : "Deploy from a branch"
4. Branch : `main` / Folder : `/ (root)`
5. Cliquez sur "Save"

Votre site sera accessible sur : `https://VOTRE-USERNAME.github.io/portfolio/`

---

### Option B : Netlify (Gratuit + CDN)

#### 4.1 Créer un fichier `netlify.toml`

```toml
[build]
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 4.2 Déployer

1. Allez sur https://netlify.com
2. Connectez-vous avec GitHub
3. "New site from Git" > Sélectionnez votre repository
4. Deploy!

Netlify vous donne un domaine gratuit : `mon-portfolio.netlify.app`

---

### Option C : Vercel (Gratuit + Ultra rapide)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Production
vercel --prod
```

---

## 🔒 Étape 5 : Configurer CORS

Dans `server/server.js`, mettez à jour CORS pour autoriser votre frontend :

```javascript
app.use(cors({
    origin: [
        'https://VOTRE-USERNAME.github.io',
        'https://votre-domaine.netlify.app',
        'http://localhost:3000'
    ],
    credentials: true
}));
```

Redéployez le backend après modification.

---

## 🌍 Étape 6 : Domaine personnalisé (Optionnel)

### Avec Namecheap (Gratuit via Student Pack)

1. Réclamez votre domaine .me gratuit sur Namecheap
2. Configurez les DNS selon votre hébergeur :

#### Pour Netlify :
- Type : `A` / Host : `@` / Value : `75.2.60.5`
- Type : `CNAME` / Host : `www` / Value : `votre-site.netlify.app`

#### Pour Vercel :
- Type : `A` / Host : `@` / Value : `76.76.21.21`
- Type : `CNAME` / Host : `www` / Value : `cname.vercel-dns.com`

---

## 📝 Étape 7 : Configuration initiale

### 7.1 Créer le premier compte admin

1. Accédez à votre backend : `https://votre-api.herokuapp.com/api`
2. Créez un compte admin via l'endpoint `/api/auth/register`

Ou utilisez le script seed :

```bash
# Local
npm run seed

# Heroku
heroku run npm run seed

# DigitalOcean
Utilisez la console de l'app
```

### 7.2 Se connecter à l'admin

1. Allez sur `https://votre-site.com/admin.html`
2. Connectez-vous avec :
   - Email : `admin@portfolio.com`
   - Mot de passe : `admin123`
3. **Changez immédiatement le mot de passe dans la base de données !**

---

## 📊 Récapitulatif des coûts

| Service | Coût avec Student Pack |
|---------|----------------------|
| MongoDB Atlas (M0) | **Gratuit** |
| Heroku (avec Student) | **Gratuit** |
| DigitalOcean | **$200 de crédit** |
| Render | **Gratuit** |
| GitHub Pages | **Gratuit** |
| Netlify | **Gratuit** |
| Vercel | **Gratuit** |
| Domaine .me (Namecheap) | **Gratuit 1 an** |
| SSL (Let's Encrypt) | **Gratuit** |

**Total : 0€** avec le Student Pack ! 🎉

---

## 🔧 Maintenance et mises à jour

### Mettre à jour le site

```bash
# Modifier vos fichiers
git add .
git commit -m "Mise à jour du portfolio"
git push origin main

# Le déploiement est automatique sur la plupart des plateformes !
```

### Mettre à jour le backend

```bash
# Même processus
git push heroku main  # Pour Heroku
# OU simplement push sur main pour DigitalOcean/Render/Netlify
```

---

## 🐛 Dépannage

### Le backend ne démarre pas

```bash
# Vérifier les logs
heroku logs --tail  # Pour Heroku

# Vérifier les variables d'environnement
heroku config
```

### Erreur CORS

Assurez-vous que l'URL du frontend est dans la liste CORS du backend.

### Base de données vide

Exécutez le script seed :
```bash
npm run seed
```

---

## 📚 Ressources utiles

- [GitHub Student Pack](https://education.github.com/pack)
- [Documentation Heroku](https://devcenter.heroku.com/)
- [MongoDB Atlas](https://docs.atlas.mongodb.com/)
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)

---

## 🎯 Prochaines étapes

- [ ] Ajouter Google Analytics
- [ ] Implémenter un système de blog
- [ ] Ajouter des animations avancées
- [ ] Configurer des emails automatiques (SendGrid - gratuit avec Student Pack)
- [ ] Ajouter un système de newsletter
- [ ] Optimiser les images (Cloudinary - gratuit)

---

## 📞 Support

Si vous rencontrez des problèmes, consultez :
- La documentation de chaque service
- Stack Overflow
- Les issues GitHub du projet

**Bon déploiement ! 🚀**
