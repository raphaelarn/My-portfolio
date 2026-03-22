# 🔧 Guide de Troubleshooting - Vercel CSS/JS non chargés

## 🔍 Diagnostics

Si Vercel n'affiche pas la mise en forme (CSS/JS), vérifiez :

### 1. **Vérifier les erreurs en console**
- Ouvrez DevTools (F12)
- Allez à l'onglet **Console** et **Network**
- Cherchez les erreurs 404 (fichiers non trouvés)
- Note l'URL complète du fichier qui échoue

### 2. **Cas courants**

#### ❌ Erreur: `GET https://votresite.vercel.app/css/style.css 404`
**Solution**: Les chemins doivent être en minuscules et relatifs

#### ❌ Erreur: `GET https://votresite.vercel.app/CSS/style.css 404`
**Solution**: Vercel est case-sensitive. Utilisez `css/` pas `CSS/`

#### ❌ Les fichiers ne se chargent que localement
**Solution**: Vérifiez que `vercel.json` est correctement configuré

---

## 🚀 Corrections appliquées

### ✅ `vercel.json` - Configuration optimale pour site statique

```json
{
  "version": 2,
  "buildCommand": "echo 'Static site'",
  "outputDirectory": ".",
  "public": true,
  "rewrites": [...],
  "headers": [...]
}
```

**Points clés:**
- `buildCommand`: Pas de build requis (site statique)
- `outputDirectory`: `.` = racine du projet
- `public`: `true` = tous les fichiers accessibles
- `rewrites`: Gère les routes SPA
- `headers`: Cache pour les performances

### ✅ `.vercelignore` - Ignorer les fichiers inutiles

Réduit la taille du déploiement en ignorant:
- `node_modules/`
- `.git/`
- Fichiers `*.md` (documentation)
- `package-lock.json`
- Fichiers de config non-utilisés

---

## 📋 Checklist de déploiement

Avant de redéployer sur Vercel:

- [ ] Vérifier que `css/`, `js/`, `data/` existent
- [ ] Vérifier que les chemins dans HTML sont **minuscules**
  ```html
  ✅ <link rel="stylesheet" href="css/style.css">
  ❌ <link rel="stylesheet" href="CSS/style.css">
  ```
- [ ] Vérifier que `vercel.json` est présent et valide
- [ ] Vérifier que `.vercelignore` existe
- [ ] Faire `git add .` et `git commit`
- [ ] Faire `git push` (Vercel redéploie automatiquement)

---

## 🧪 Test local vs Vercel

### Local (Python server)
```bash
python3 -m http.server 8000
# Les fichiers se chargent depuis le disque
```

### Vercel (déploiement)
```bash
git push
# Vercel construit et déploie le site
# Les fichiers doivent être accessibles via HTTP
```

**Différence clé**: Vercel est case-sensitive, certains systèmes de fichiers locaux ne le sont pas.

---

## 🔗 Ressources Vercel

- **Docs**: https://vercel.com/docs
- **Static Sites**: https://vercel.com/docs/concepts/deployments/static-deployments
- **Troubleshooting**: https://vercel.com/support/articles

---

## 💡 Si ça ne marche toujours pas

1. Vérifiez en DevTools l'URL exacte des 404
2. Comparez avec votre repo local
3. Redéployez: `git push`
4. Attendez ~1min que Vercel finisse
5. Rechargez sans cache: `Ctrl+Shift+Del` puis rechargez

---

**Dernière mise à jour**: 22 mars 2026
**Status**: ✅ Configuration optimisée pour Vercel
