#!/bin/bash

# Script de déploiement automatisé

echo "🚀 Déploiement du Portfolio"
echo "=========================="
echo ""

# Vérifier si Git est installé
if ! command -v git &> /dev/null; then
    echo "❌ Git n'est pas installé"
    exit 1
fi

# Vérifier si on est dans un repo Git
if [ ! -d .git ]; then
    echo "📦 Initialisation du repository Git..."
    git init
    git add .
    git commit -m "Initial commit - Portfolio"
    echo "✅ Repository Git créé"
fi

# Demander le choix de plateforme
echo "Où souhaitez-vous déployer ?"
echo "1) Heroku (Backend)"
echo "2) GitHub Pages (Frontend)"
echo "3) Les deux"
read -p "Votre choix (1-3): " choice

case $choice in
    1)
        echo ""
        echo "📤 Déploiement sur Heroku..."
        
        # Vérifier si Heroku CLI est installé
        if ! command -v heroku &> /dev/null; then
            echo "❌ Heroku CLI n'est pas installé"
            echo "Installez-le depuis : https://devcenter.heroku.com/articles/heroku-cli"
            exit 1
        fi
        
        read -p "Nom de votre app Heroku: " app_name
        
        heroku create $app_name
        
        read -p "URI MongoDB Atlas: " mongo_uri
        read -p "Secret JWT: " jwt_secret
        
        heroku config:set MONGODB_URI="$mongo_uri" -a $app_name
        heroku config:set JWT_SECRET="$jwt_secret" -a $app_name
        heroku config:set NODE_ENV="production" -a $app_name
        
        git push heroku main
        
        echo "✅ Backend déployé sur Heroku!"
        echo "🔗 URL: https://$app_name.herokuapp.com"
        ;;
        
    2)
        echo ""
        echo "📤 Déploiement sur GitHub Pages..."
        
        read -p "URL de votre repository GitHub: " repo_url
        
        git remote add origin $repo_url
        git branch -M main
        git push -u origin main
        
        echo "✅ Code poussé sur GitHub!"
        echo "👉 Allez dans Settings > Pages de votre repo pour activer GitHub Pages"
        ;;
        
    3)
        echo ""
        echo "📤 Déploiement complet..."
        
        # Backend
        if ! command -v heroku &> /dev/null; then
            echo "❌ Heroku CLI n'est pas installé pour le backend"
            exit 1
        fi
        
        read -p "Nom de votre app Heroku: " app_name
        heroku create $app_name
        
        read -p "URI MongoDB Atlas: " mongo_uri
        read -p "Secret JWT: " jwt_secret
        
        heroku config:set MONGODB_URI="$mongo_uri" -a $app_name
        heroku config:set JWT_SECRET="$jwt_secret" -a $app_name
        heroku config:set NODE_ENV="production" -a $app_name
        
        # Frontend
        read -p "URL de votre repository GitHub: " repo_url
        git remote add origin $repo_url
        
        git push heroku main
        git push -u origin main
        
        echo "✅ Déploiement complet!"
        echo "🔗 Backend: https://$app_name.herokuapp.com"
        echo "👉 Activez GitHub Pages pour le frontend"
        ;;
        
    *)
        echo "❌ Choix invalide"
        exit 1
        ;;
esac

echo ""
echo "🎉 Déploiement terminé!"
