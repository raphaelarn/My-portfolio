# 🎨 Guide de Personnalisation

Ce guide vous aide à personnaliser votre portfolio selon vos besoins.

## 📝 Informations personnelles

### Dans `index.html`

#### 1. Texte d'en-tête
```html
<!-- Ligne 48-49 -->
<h1>Bonjour, je suis <span class="typed-text"></span></h1>
<p class="hero-description">Développeur Full Stack passionné...</p>
```

#### 2. Liens sociaux
```html
<!-- Ligne 54-57 -->
<a href="https://github.com/VOTRE-USERNAME" target="_blank">
<a href="https://linkedin.com/in/VOTRE-PROFIL" target="_blank">
<a href="https://twitter.com/VOTRE-COMPTE" target="_blank">
```

#### 3. Section À propos
```html
<!-- Ligne 69-77 -->
<h3>Développeur Full Stack</h3>
<p>Votre description personnelle...</p>
```

#### 4. Informations de contact
```html
<!-- Ligne 132-149 -->
<p>votre.email@example.com</p>
<p>+33 6 XX XX XX XX</p>
<p>Paris, France</p>
```

---

## 🎨 Design et couleurs

### Modifier les couleurs dans `css/style.css`

```css
/* Ligne 2-10 */
:root {
    --primary-color: #6366f1;      /* Couleur principale */
    --secondary-color: #8b5cf6;    /* Couleur secondaire */
    --dark-bg: #0f172a;            /* Fond sombre */
    --light-bg: #1e293b;           /* Fond clair */
    --text-primary: #f1f5f9;       /* Texte principal */
    --text-secondary: #cbd5e1;     /* Texte secondaire */
    --accent: #10b981;             /* Couleur d'accent */
}
```

### Exemples de palettes de couleurs

#### 🔵 Bleu professionnel (défaut)
```css
--primary-color: #6366f1;
--secondary-color: #8b5cf6;
```

#### 🟢 Vert tech
```css
--primary-color: #10b981;
--secondary-color: #14b8a6;
```

#### 🔴 Rouge dynamique
```css
--primary-color: #ef4444;
--secondary-color: #f97316;
```

#### 🟣 Violet créatif
```css
--primary-color: #a855f7;
--secondary-color: #ec4899;
```

#### 🟡 Orange énergique
```css
--primary-color: #f59e0b;
--secondary-color: #f97316;
```

---

## 🖼️ Images

### 1. Photo de profil

Ajoutez votre photo dans `images/profile.jpg` (recommandé : 500x500px)

### 2. Images de projets

Les images de projets peuvent être :
- Locales : `images/mon-projet.jpg`
- Externes : URL complète (recommandé)

**Sources d'images gratuites :**
- [Unsplash](https://unsplash.com)
- [Pexels](https://pexels.com)
- [Pixabay](https://pixabay.com)

---

## ⚙️ Fonctionnalités

### Modifier le texte animé

Dans `js/script.js`, ligne 22-23 :

```javascript
const texts = [
    'Développeur Full Stack', 
    'Créateur d\'Applications Web', 
    'Passionné par le Code'
];
```

Remplacez par vos propres titres !

### Modifier les compétences

Dans `index.html`, section skills (ligne 81-116) :

```html
<div class="skill-card">
    <i class="fab fa-html5"></i>
    <h3>Votre catégorie</h3>
    <p>Vos technologies</p>
</div>
```

**Icônes disponibles :** [Font Awesome Icons](https://fontawesome.com/icons)

---

## 📧 Configuration du formulaire de contact

### Option 1 : Utiliser votre backend (recommandé)

Le formulaire est déjà configuré pour utiliser votre API.

### Option 2 : Service externe

Remplacez dans `js/script.js` (ligne 126-142) pour utiliser :

#### FormSpree (gratuit)
```javascript
const response = await fetch('https://formspree.io/f/VOTRE-ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});
```

#### EmailJS (gratuit)
Suivez la documentation : https://www.emailjs.com/

---

## 🔧 Configuration de l'API

### Modifier l'URL de l'API

#### En développement
Dans `js/script.js` et `js/admin.js` :
```javascript
const API_URL = 'http://localhost:5000/api';
```

#### En production
```javascript
const API_URL = 'https://votre-api.herokuapp.com/api';
```

---

## 📱 Responsive Design

Le portfolio est déjà responsive, mais vous pouvez ajuster les breakpoints dans `css/style.css` :

```css
/* Ligne 423 - Tablettes */
@media screen and (max-width: 768px) {
    /* Vos ajustements */
}

/* Ligne 451 - Mobiles */
@media screen and (max-width: 480px) {
    /* Vos ajustements */
}
```

---

## 🚀 Optimisations

### 1. Optimiser les images

**Outils recommandés :**
- [TinyPNG](https://tinypng.com) - Compression
- [Squoosh](https://squoosh.app) - Conversion WebP
- [ImageOptim](https://imageoptim.com) - Optimisation batch

### 2. Minimiser CSS et JS

En production, utilisez :
```bash
# Installer les outils
npm install -g clean-css-cli uglify-js

# Minimiser CSS
cleancss -o css/style.min.css css/style.css

# Minimiser JS
uglifyjs js/script.js -o js/script.min.js
```

Puis modifiez `index.html` :
```html
<link rel="stylesheet" href="css/style.min.css">
<script src="js/script.min.js"></script>
```

---

## 📊 Analytics

### Ajouter Google Analytics

Avant la fermeture de `</head>` dans `index.html` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Remplacez `GA_MEASUREMENT_ID` par votre ID Google Analytics.

---

## 🔍 SEO

### 1. Balises Meta

Ajoutez dans `<head>` de `index.html` :

```html
<!-- SEO -->
<meta name="description" content="Portfolio de [Votre Nom] - Développeur Full Stack">
<meta name="keywords" content="développeur, web, portfolio, react, node.js">
<meta name="author" content="Votre Nom">

<!-- Open Graph (Facebook, LinkedIn) -->
<meta property="og:title" content="Portfolio - Votre Nom">
<meta property="og:description" content="Développeur Full Stack passionné">
<meta property="og:image" content="https://votre-site.com/images/preview.jpg">
<meta property="og:url" content="https://votre-site.com">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Portfolio - Votre Nom">
<meta name="twitter:description" content="Développeur Full Stack passionné">
<meta name="twitter:image" content="https://votre-site.com/images/preview.jpg">
```

### 2. Fichier robots.txt

Créez `robots.txt` à la racine :

```
User-agent: *
Allow: /
Disallow: /admin.html

Sitemap: https://votre-site.com/sitemap.xml
```

### 3. Sitemap.xml

Créez `sitemap.xml` :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://votre-site.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## 🎯 Checklist finale

Avant de déployer, vérifiez :

- [ ] Informations personnelles mises à jour
- [ ] Photo de profil ajoutée
- [ ] Liens sociaux corrects
- [ ] Couleurs personnalisées
- [ ] Projets ajoutés via l'admin
- [ ] URL de l'API mise à jour
- [ ] Tests sur mobile
- [ ] Analytics configuré
- [ ] Meta tags SEO ajoutés
- [ ] Images optimisées
- [ ] Mot de passe admin changé

---

## 💡 Idées d'amélioration

### Fonctionnalités avancées
- [ ] Blog intégré
- [ ] Thème clair/sombre
- [ ] Multilingue (FR/EN)
- [ ] Téléchargement de CV
- [ ] Section testimonials
- [ ] Timeline de carrière
- [ ] Certifications
- [ ] Mode de présentation

### Animations
- [ ] Parallax scrolling
- [ ] Particules JS
- [ ] Animations GSAP
- [ ] Transitions de page

### Intégrations
- [ ] Newsletter (Mailchimp)
- [ ] Chat en direct (Tawk.to)
- [ ] Blog (Ghost, WordPress)
- [ ] Calendrier de rendez-vous (Calendly)

---

## 📚 Ressources utiles

### Design
- [Dribbble](https://dribbble.com) - Inspiration
- [Behance](https://behance.net) - Portfolios
- [Awwwards](https://awwwards.com) - Sites primés

### Couleurs
- [Coolors](https://coolors.co) - Palettes
- [Color Hunt](https://colorhunt.co) - Inspiration
- [Adobe Color](https://color.adobe.com) - Roue chromatique

### Polices
- [Google Fonts](https://fonts.google.com)
- [Font Squirrel](https://fontsquirrel.com)

### Icônes
- [Font Awesome](https://fontawesome.com)
- [Heroicons](https://heroicons.com)
- [Feather Icons](https://feathericons.com)

---

**Besoin d'aide ?** Consultez la documentation ou ouvrez une issue ! 🚀
