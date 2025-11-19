# 🤝 Guide de Contribution

Merci de votre intérêt pour contribuer à ce projet ! Voici comment vous pouvez aider.

## 🎯 Comment contribuer

### 1. Reporter un bug 🐛

Si vous trouvez un bug :
1. Vérifiez qu'il n'a pas déjà été reporté dans les [Issues](../../issues)
2. Créez une nouvelle issue avec le template "Bug Report"
3. Incluez :
   - Description du bug
   - Étapes pour le reproduire
   - Comportement attendu vs comportement observé
   - Screenshots si pertinent
   - Environnement (OS, navigateur, version Node.js)

### 2. Suggérer une fonctionnalité ✨

Pour suggérer une amélioration :
1. Créez une issue avec le template "Feature Request"
2. Décrivez :
   - Le problème que cela résout
   - Comment cela améliorerait le projet
   - Des exemples ou mockups si possible

### 3. Contribuer au code 💻

#### Prérequis
- Connaissance de JavaScript/Node.js
- Git installé
- Compte GitHub

#### Processus

1. **Fork le projet**
   ```bash
   # Cliquez sur "Fork" en haut à droite du repo
   ```

2. **Clonez votre fork**
   ```bash
   git clone https://github.com/VOTRE-USERNAME/portfolio.git
   cd portfolio
   ```

3. **Créez une branche**
   ```bash
   git checkout -b feature/ma-nouvelle-fonctionnalite
   # OU
   git checkout -b fix/correction-bug
   ```

4. **Installez les dépendances**
   ```bash
   npm install
   ```

5. **Faites vos modifications**
   - Écrivez du code clair et commenté
   - Suivez les conventions du projet
   - Testez vos modifications

6. **Testez localement**
   ```bash
   npm run dev
   # Ouvrez index.html et admin.html
   ```

7. **Committez vos changements**
   ```bash
   git add .
   git commit -m "feat: Ajout de la fonctionnalité X"
   # OU
   git commit -m "fix: Correction du bug Y"
   ```

8. **Pushez vers votre fork**
   ```bash
   git push origin feature/ma-nouvelle-fonctionnalite
   ```

9. **Créez une Pull Request**
   - Allez sur GitHub
   - Cliquez sur "New Pull Request"
   - Décrivez vos changements
   - Attendez la review

---

## 📝 Conventions de code

### JavaScript
```javascript
// Utilisez des noms descriptifs
const getUserProjects = async (userId) => {
    // Code ici
};

// Utilisez const/let (pas var)
const API_URL = 'http://localhost:5000';
let currentUser = null;

// Commentez le code complexe
// Récupère tous les projets et filtre ceux qui sont featured
const featuredProjects = projects.filter(p => p.featured);
```

### CSS
```css
/* Utilisez BEM ou des noms de classes descriptifs */
.nav-item {}
.nav-item--active {}
.nav-item__icon {}

/* Groupez les propriétés logiquement */
.element {
    /* Position */
    position: relative;
    top: 0;
    
    /* Display & Box Model */
    display: flex;
    width: 100%;
    padding: 1rem;
    
    /* Typography */
    font-size: 1rem;
    color: var(--text-primary);
    
    /* Visual */
    background: var(--primary-color);
    border-radius: 8px;
    
    /* Misc */
    transition: all 0.3s;
}
```

### Commits
Suivez la convention [Conventional Commits](https://www.conventionalcommits.org/) :

```
feat: Nouvelle fonctionnalité
fix: Correction de bug
docs: Documentation
style: Formatage (sans changement de code)
refactor: Refactoring
test: Ajout de tests
chore: Maintenance
```

Exemples :
```bash
git commit -m "feat: Ajout du thème sombre"
git commit -m "fix: Correction du responsive sur mobile"
git commit -m "docs: Mise à jour du README"
```

---

## 🧪 Tests

Avant de soumettre une PR, testez :

### Tests manuels
- [ ] Le portfolio s'affiche correctement
- [ ] Le formulaire de contact fonctionne
- [ ] L'admin permet de gérer les projets
- [ ] Responsive sur mobile/tablette
- [ ] Aucune erreur dans la console

### Tests du backend
```bash
# Démarrer le serveur
npm run dev

# Tester les endpoints
curl http://localhost:5000/api
curl http://localhost:5000/api/projects
```

---

## 📚 Documentation

Si vous modifiez du code, mettez à jour la documentation :

- `README.md` : Documentation principale
- `QUICKSTART.md` : Si la procédure d'installation change
- `DEPLOIEMENT.md` : Si les étapes de déploiement changent
- `PERSONNALISATION.md` : Pour les nouvelles options
- Commentaires dans le code

---

## 🎨 Design

### Principes
- **Mobile-first** : Concevoir d'abord pour mobile
- **Accessibilité** : Contraste, taille de texte, navigation clavier
- **Performance** : Images optimisées, code minifié
- **Cohérence** : Suivre le design system existant

### Variables CSS
Utilisez les variables CSS existantes :
```css
var(--primary-color)
var(--secondary-color)
var(--text-primary)
```

---

## 🔍 Review Process

Votre PR sera reviewée selon ces critères :

1. ✅ **Fonctionnalité** : Le code fait ce qu'il est censé faire
2. ✅ **Qualité** : Code propre, lisible, bien structuré
3. ✅ **Tests** : Fonctionne sans erreurs
4. ✅ **Documentation** : Changements documentés
5. ✅ **Compatibilité** : Ne casse pas le code existant

### Temps de review
- Les PR simples sont généralement reviewées en 1-3 jours
- Les PR complexes peuvent prendre plus de temps
- N'hésitez pas à pinger si pas de réponse après une semaine

---

## 🌟 Idées de contribution

Vous ne savez pas par où commencer ? Voici des idées :

### Facile 🟢
- [ ] Corriger des fautes d'orthographe
- [ ] Améliorer la documentation
- [ ] Ajouter des commentaires dans le code
- [ ] Optimiser des images
- [ ] Corriger des bugs CSS mineurs

### Moyen 🟡
- [ ] Ajouter de nouvelles animations
- [ ] Améliorer le responsive
- [ ] Ajouter des fonctionnalités à l'admin
- [ ] Implémenter un système de recherche
- [ ] Ajouter des tests automatisés

### Difficile 🔴
- [ ] Migrer vers TypeScript
- [ ] Ajouter un système de blog
- [ ] Implémenter l'upload d'images
- [ ] Créer une version React
- [ ] Ajouter l'internationalisation (i18n)

Consultez les [Issues](../../issues) pour voir ce qui est déjà planifié !

---

## 💬 Questions ?

- **Discussions** : Utilisez les [Discussions GitHub](../../discussions)
- **Chat** : [Créez une issue](../../issues/new) avec la question
- **Email** : (ajoutez votre email si vous le souhaitez)

---

## 🏆 Contributors

Merci à tous ceux qui contribuent au projet ! 

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- Sera automatiquement rempli -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

## 📜 Code of Conduct

### Notre engagement

Nous nous engageons à faire de la participation à ce projet une expérience sans harcèlement pour tous, indépendamment :
- De l'âge, de la taille corporelle, du handicap
- De l'ethnicité, de l'identité de genre
- Du niveau d'expérience, de la nationalité
- De l'apparence personnelle, de la race, de la religion
- De l'orientation sexuelle

### Comportements attendus

- Utiliser un langage accueillant et inclusif
- Respecter les différents points de vue et expériences
- Accepter gracieusement les critiques constructives
- Se concentrer sur ce qui est le mieux pour la communauté
- Faire preuve d'empathie envers les autres membres

### Comportements inacceptables

- Commentaires insultants/désobligeants, attaques personnelles ou politiques
- Harcèlement public ou privé
- Publication d'informations privées sans permission
- Tout comportement inapproprié dans un cadre professionnel

### Application

Les mainteneurs du projet sont responsables de clarifier les standards de comportement acceptable et prendront des mesures correctives appropriées et justes en réponse à tout comportement inacceptable.

---

## 📄 Licence

En contribuant, vous acceptez que vos contributions soient sous la même licence MIT que le projet.

---

**Merci de contribuer et de rendre ce projet meilleur ! 🚀**
