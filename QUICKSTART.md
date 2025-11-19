# 🚀 Guide de Démarrage Rapide

## Installation en 5 minutes

### 1️⃣ Installer les dépendances

```bash
npm install
```

### 2️⃣ Configurer l'environnement

```bash
cp .env.example .env
```

### 3️⃣ Démarrer MongoDB

**Ubuntu/Debian :**
```bash
sudo systemctl start mongodb
```

**macOS :**
```bash
brew services start mongodb-community
```

**Windows :**
Lancez MongoDB Compass ou le service MongoDB

### 4️⃣ Initialiser la base de données

```bash
npm run seed
```

### 5️⃣ Démarrer le serveur

```bash
npm run dev
```

### 6️⃣ Ouvrir le portfolio

Dans un nouveau terminal :

```bash
# Option 1 : Python
python3 -m http.server 8000

# Option 2 : Node.js
npx http-server -p 8000
```

Ouvrez votre navigateur :
- **Portfolio** : http://localhost:8000/
- **Admin** : http://localhost:8000/admin.html

### 🔐 Identifiants par défaut

- **Email** : admin@portfolio.com
- **Mot de passe** : admin123

---

## ⚡ Commandes principales

```bash
npm install          # Installer les dépendances
npm run dev          # Démarrer en mode développement
npm start            # Démarrer en mode production
npm run seed         # Réinitialiser la base de données
```

---

## 📝 Checklist de personnalisation

- [ ] Modifier les informations dans `index.html`
- [ ] Ajouter votre photo dans `images/profile.jpg`
- [ ] Changer les couleurs dans `css/style.css`
- [ ] Ajouter vos liens sociaux
- [ ] Créer vos projets via l'admin
- [ ] Personnaliser le README.md
- [ ] Changer le mot de passe admin

---

## 🐛 Problèmes courants

### MongoDB ne démarre pas
```bash
# Vérifier le statut
sudo systemctl status mongodb

# Redémarrer
sudo systemctl restart mongodb
```

### Port déjà utilisé
Changez le port dans `.env` :
```env
PORT=5001
```

### Erreur de connexion à l'API
Vérifiez que l'URL dans `js/script.js` et `js/admin.js` correspond à votre serveur.

---

## 📚 Prochaines étapes

1. Lisez le [README.md](README.md) complet
2. Consultez le [DEPLOIEMENT.md](DEPLOIEMENT.md) pour déployer
3. Personnalisez votre portfolio
4. Partagez-le avec le monde ! 🌍

**Besoin d'aide ?** Ouvrez une issue sur GitHub !
