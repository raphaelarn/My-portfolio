# 💼 Portfolio de Développeur

Un portfolio moderne et responsive pour exposer vos projets. Frontend-only, simple à personnaliser et déployer.

## ✨ Fonctionnalités

- 🎨 Design moderne et responsive
- 🔐 Panel d'administration sécurisé
- 📊 Gestion des projets (CRUD complet)
- 📧 Formulaire de contact
- 🚀 API REST complète
- 🔒 Authentification JWT
- 📱 Mobile-first design

## 🛠️ Technologies utilisées

### Frontend
- HTML5, CSS3, JavaScript
- Design responsive
- Animations CSS

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT pour l'authentification
- Bcrypt pour le hashage des mots de passe
- Helmet pour la sécurité
- Rate limiting

## 📁 Structure du projet

```
portfolio/
├── index.html              # Page principale du portfolio
├── admin.html              # Interface d'administration
├── css/
│   ├── style.css          # Styles du portfolio
│   └── admin.css          # Styles de l'admin
├── js/
│   ├── script.js          # JavaScript du portfolio
│   └── admin.js           # JavaScript de l'admin
├── images/                 # Vos images
├── server/
│   ├── server.js          # Point d'entrée du serveur
│   ├── models/            # Modèles MongoDB
│   ├── routes/            # Routes de l'API
│   ├── middleware/        # Middleware d'authentification
│   └── seed.js            # Script d'initialisation
├── package.json
├── .env.example
├── .gitignore
├── README.md
└── DEPLOIEMENT.md         # Guide de déploiement complet
```

## 🚀 Installation locale

### 1. Cloner le projet

```bash
git clone https://github.com/VOTRE-USERNAME/portfolio.git
cd portfolio
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

```bash
cp .env.example .env
```

Modifiez le fichier `.env` avec vos informations :

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=votre_secret_jwt_tres_securise
NODE_ENV=development
```

### 4. Installer et démarrer MongoDB

**Ubuntu/Debian :**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**macOS :**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Windows :**
Téléchargez depuis https://www.mongodb.com/try/download/community

### 5. Initialiser la base de données

```bash
npm run seed
```

Cela créera :
- Un compte admin (email: admin@portfolio.com, mot de passe: admin123)
- 4 projets de démonstration

### 6. Démarrer le serveur

```bash
# Mode développement (avec auto-reload)
npm run dev

# Mode production
npm start
```

Le serveur démarre sur http://localhost:5000

### 7. Ouvrir le portfolio

Ouvrez `index.html` dans votre navigateur ou utilisez un serveur local :

```bash
# Avec Python
python3 -m http.server 8000

# Avec Node.js (http-server)
npx http-server -p 8000
```

Accédez à :
- Portfolio : http://localhost:8000/
- Admin : http://localhost:8000/admin.html
- API : http://localhost:5000/api

## 🔐 Utilisation de l'admin

1. Allez sur `/admin.html`
2. Connectez-vous avec :
   - **Email** : admin@portfolio.com
   - **Mot de passe** : admin123
3. Gérez vos projets et messages depuis le dashboard

## 📡 API Endpoints

### Authentification
- `POST /api/auth/register` - Créer un compte
- `POST /api/auth/login` - Se connecter
- `GET /api/auth/verify` - Vérifier le token

### Projets
- `GET /api/projects` - Liste des projets (public)
- `GET /api/projects/:id` - Détails d'un projet (public)
- `POST /api/projects` - Créer un projet (admin)
- `PUT /api/projects/:id` - Modifier un projet (admin)
- `DELETE /api/projects/:id` - Supprimer un projet (admin)

### Contact
- `POST /api/contact` - Envoyer un message (public)
- `GET /api/contact` - Liste des messages (admin)
- `GET /api/contact/:id` - Détails d'un message (admin)
- `PATCH /api/contact/:id/read` - Marquer comme lu (admin)
- `DELETE /api/contact/:id` - Supprimer un message (admin)

## 🌐 Déploiement

Consultez le fichier **[DEPLOIEMENT.md](./DEPLOIEMENT.md)** pour un guide complet de déploiement avec les services gratuits du GitHub Student Developer Pack :

- Heroku (backend)
- MongoDB Atlas (base de données)
- GitHub Pages / Netlify / Vercel (frontend)
- Domaine gratuit .me

**Coût total : 0€** avec le Student Pack ! 🎉

## 🔒 Sécurité

- ✅ Mots de passe hashés avec bcrypt
- ✅ Authentification JWT
- ✅ Rate limiting sur l'API
- ✅ Helmet pour les headers de sécurité
- ✅ CORS configuré
- ✅ Validation des entrées

## 📝 Personnalisation

### Modifier les informations du portfolio

Éditez `index.html` :
- Changez le nom, la description
- Ajoutez vos liens sociaux
- Modifiez les informations de contact

### Modifier les couleurs

Éditez `css/style.css`, section `:root` :

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... */
}
```

### Ajouter des projets

Via l'interface admin ou directement dans la base de données.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit vos changements (`git commit -m 'Ajout d'une fonctionnalité'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer.

## 🆘 Support

Si vous rencontrez des problèmes :
1. Vérifiez que MongoDB est démarré
2. Vérifiez que les variables d'environnement sont correctes
3. Consultez les logs du serveur
4. Ouvrez une issue sur GitHub

## 📚 Ressources

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/)
- [GitHub Student Pack](https://education.github.com/pack)

---

Créé avec ❤️ pour les développeurs

**Bon codage ! 🚀**
