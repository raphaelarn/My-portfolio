#!/bin/bash
# Script de vérification avant déploiement sur Vercel

echo "🔍 Vérification du portfolio pour Vercel..."
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

errors=0
warnings=0

# 1. Vérifier la structure
echo "📁 Vérification de la structure..."
for dir in "css" "js" "data" "images"; do
  if [ -d "$dir" ]; then
    echo -e "${GREEN}✓${NC} Dossier $dir trouvé"
  else
    echo -e "${RED}✗${NC} Dossier $dir manquant"
    ((errors++))
  fi
done
echo ""

# 2. Vérifier les fichiers essentiels
echo "📄 Vérification des fichiers essentiels..."
for file in "index.html" "admin.html" "css/style.css" "css/admin.css" "js/script.js" "js/admin.js" "data/projects.json" "vercel.json"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓${NC} $file trouvé"
  else
    echo -e "${RED}✗${NC} $file manquant"
    ((errors++))
  fi
done
echo ""

# 3. Vérifier les chemins en majuscules dans HTML
echo "🔤 Vérification des chemins (case-sensitive)..."
if grep -q 'href="CSS' index.html admin.html 2>/dev/null; then
  echo -e "${RED}✗${NC} CSS en majuscules trouvé!"
  ((errors++))
fi
if grep -q 'src="JS' index.html admin.html 2>/dev/null; then
  echo -e "${RED}✗${NC} JS en majuscules trouvé!"
  ((errors++))
fi
if grep -q 'href="css/style.css"' index.html; then
  echo -e "${GREEN}✓${NC} Chemin CSS correct (minuscules)"
fi
echo ""

# 4. Vérifier vercel.json
echo "⚙️  Vérification de vercel.json..."
if [ -f "vercel.json" ]; then
  echo -e "${GREEN}✓${NC} vercel.json trouvé"
  if grep -q '"version": 2' vercel.json; then
    echo -e "${GREEN}✓${NC} Version 2 détectée"
  fi
else
  echo -e "${RED}✗${NC} vercel.json manquant"
  ((errors++))
fi
echo ""

# 5. Vérifier .vercelignore
echo "🚫 Vérification de .vercelignore..."
if [ -f ".vercelignore" ]; then
  echo -e "${GREEN}✓${NC} .vercelignore trouvé"
else
  echo -e "${YELLOW}⚠${NC} .vercelignore manquant (optionnel)"
  ((warnings++))
fi
echo ""

# 6. Vérifier Git
echo "🔗 Vérification Git..."
if [ -d ".git" ]; then
  echo -e "${GREEN}✓${NC} Repo Git détecté"
  # Vérifier les changements non commitées
  if [ -n "$(git status --short)" ]; then
    echo -e "${YELLOW}⚠${NC} Changements non commitées:"
    git status --short | head -5
    echo "Faites 'git add .' et 'git commit' avant de pousser"
  else
    echo -e "${GREEN}✓${NC} Aucun changement non comitté"
  fi
else
  echo -e "${YELLOW}⚠${NC} Pas de repo Git (optionnel)"
fi
echo ""

# 7. Résumé
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $errors -eq 0 ]; then
  echo -e "${GREEN}✓ Tous les tests passés!${NC}"
  echo ""
  echo "🚀 Vous pouvez déployer sur Vercel avec:"
  echo "   git push"
  exit 0
else
  echo -e "${RED}✗ $errors erreur(s) détectée(s)${NC}"
  if [ $warnings -gt 0 ]; then
    echo -e "${YELLOW}⚠ $warnings avertissement(s)${NC}"
  fi
  echo ""
  echo "Corrigez les erreurs avant de déployer"
  exit 1
fi
