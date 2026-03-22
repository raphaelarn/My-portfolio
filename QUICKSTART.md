# 🚀 Guide de Démarrage Rapide

## Installation en 2 minutes

### 1️⃣ Lancer le serveur web

Depuis le dossier du projet :

```bash
# Option 1 : Python (recommandé)
python3 -m http.server 8000

# Option 2 : Node.js
npx http-server -p 8000
```

### 2️⃣ Ouvrir le portfolio

Dans votre navigateur :
- **Portfolio** : http://localhost:8000/
- **Admin** : http://localhost:8000/admin.html

---

## � Fonctionnalités

- ✅ Portfolio frontend sans backend
- ✅ Affichage des projets depuis `data/projects.json`
- ✅ Admin panel avec stockage localStorage
- ✅ Ajouter/modifier/supprimer des projets en local
- ✅ Responsive design
- ✅ Prêt pour déploiement statique (Netlify, Vercel, GitHub Pages)

---

## ⚡ Commandes principales

```bash
python3 -m http.server 8000     # Démarrer le serveur Python
npx http-server -p 8000         # Démarrer avec http-server
```

---

## 📝 Checklist de personnalisation

- [ ] Modifier les informations dans `index.html`
- [ ] Ajouter votre photo dans `images/profile.jpg`
- [ ] Changer les couleurs dans `css/style.css`
- [ ] Ajouter vos liens sociaux
- [ ] Ajouter/modifier vos projets dans l'admin (`admin.html`)
- [ ] Personnaliser le README.md
- [ ] Tester avant déploiement

---

## 🐛 Troubleshooting

### Port 8000 déjà utilisé ?
Utilisez un autre port :
```bash
python3 -m http.server 8080
# ou
npx http-server -p 8080
```

### Projets ne s'affichent pas ?
1. Vérifiez que `data/projects.json` existe
2. Ouvrez la console navigateur (F12) pour voir les erreurs
3. Les projets modifiés dans l'admin sont sauvegardés en localStorage

---

## 📚 Prochaines étapes

1. Lisez le [README.md](README.md) complet
2. Consultez le [DEPLOIEMENT.md](DEPLOIEMENT.md) pour déployer
3. Personnalisez votre portfolio
4. Partagez-le avec le monde ! 🌍

**Besoin d'aide ?** Ouvrez une issue sur GitHub !
