#!/bin/bash

# Script de test de l'installation

echo "🧪 Test de l'installation du Portfolio"
echo "====================================="
echo ""

# Vérifier Node.js
echo "1️⃣ Vérification de Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "   ✅ Node.js installé : $NODE_VERSION"
else
    echo "   ❌ Node.js n'est pas installé"
    echo "   Installez Node.js depuis : https://nodejs.org/"
    exit 1
fi

# Vérifier npm
echo ""
echo "2️⃣ Vérification de npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "   ✅ npm installé : $NPM_VERSION"
else
    echo "   ❌ npm n'est pas installé"
    exit 1
fi

# Vérifier MongoDB
echo ""
echo "3️⃣ Vérification de MongoDB..."
if command -v mongod &> /dev/null; then
    MONGO_VERSION=$(mongod --version | head -n 1)
    echo "   ✅ MongoDB installé"
    
    # Tester la connexion
    if pgrep -x "mongod" > /dev/null; then
        echo "   ✅ MongoDB est en cours d'exécution"
    else
        echo "   ⚠️  MongoDB n'est pas démarré"
        echo "   Démarrez-le avec : sudo systemctl start mongodb"
    fi
else
    echo "   ⚠️  MongoDB n'est pas installé localement"
    echo "   Vous pouvez utiliser MongoDB Atlas (cloud)"
fi

# Vérifier les dépendances
echo ""
echo "4️⃣ Vérification des dépendances..."
if [ -d "node_modules" ]; then
    echo "   ✅ Dépendances installées"
else
    echo "   ⚠️  Dépendances non installées"
    echo "   Exécutez : npm install"
fi

# Vérifier le fichier .env
echo ""
echo "5️⃣ Vérification de la configuration..."
if [ -f ".env" ]; then
    echo "   ✅ Fichier .env présent"
else
    echo "   ⚠️  Fichier .env manquant"
    echo "   Exécutez : cp .env.example .env"
fi

# Tester le serveur
echo ""
echo "6️⃣ Test du serveur..."
if [ -d "node_modules" ]; then
    echo "   Démarrage du serveur de test..."
    
    # Démarrer le serveur en arrière-plan
    npm start &
    SERVER_PID=$!
    
    # Attendre que le serveur démarre
    sleep 5
    
    # Tester l'API
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api)
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo "   ✅ Serveur opérationnel"
    else
        echo "   ❌ Le serveur ne répond pas (Code: $HTTP_CODE)"
    fi
    
    # Arrêter le serveur
    kill $SERVER_PID 2>/dev/null
else
    echo "   ⚠️  Installez d'abord les dépendances"
fi

# Résumé
echo ""
echo "📊 Résumé"
echo "=========="
echo ""
echo "Pour démarrer votre portfolio :"
echo "1. npm install          (si pas encore fait)"
echo "2. cp .env.example .env (si pas encore fait)"
echo "3. npm run seed         (initialiser la base)"
echo "4. npm run dev          (démarrer le serveur)"
echo "5. Ouvrir index.html dans le navigateur"
echo ""
echo "🔗 Ressources :"
echo "   - Guide rapide : QUICKSTART.md"
echo "   - Documentation : README.md"
echo "   - Déploiement : DEPLOIEMENT.md"
echo ""
echo "✨ Bon développement !"
