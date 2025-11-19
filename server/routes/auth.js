const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST - Inscription (pour créer le premier compte admin)
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ 
                error: 'Tous les champs sont requis' 
            });
        }
        
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ 
            $or: [{ email }, { username }] 
        });
        
        if (existingUser) {
            return res.status(400).json({ 
                error: 'Cet email ou nom d\'utilisateur existe déjà' 
            });
        }
        
        // Créer le premier utilisateur en tant qu'admin
        const userCount = await User.countDocuments();
        const role = userCount === 0 ? 'admin' : 'user';
        
        const user = new User({
            username,
            email,
            password,
            role
        });
        
        await user.save();
        
        res.status(201).json({ 
            message: 'Utilisateur créé avec succès',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(400).json({ 
            error: 'Erreur lors de l\'inscription',
            details: error.message 
        });
    }
});

// POST - Connexion
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                error: 'Email et mot de passe requis' 
            });
        }
        
        // Trouver l'utilisateur et inclure le mot de passe
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(401).json({ 
                error: 'Email ou mot de passe incorrect' 
            });
        }
        
        // Vérifier le mot de passe
        const isPasswordValid = await user.comparePassword(password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ 
                error: 'Email ou mot de passe incorrect' 
            });
        }
        
        // Générer le token JWT
        const token = jwt.sign(
            { 
                id: user._id, 
                role: user.role 
            },
            process.env.JWT_SECRET || 'votre_secret_jwt_très_sécurisé',
            { expiresIn: '7d' }
        );
        
        res.json({
            message: 'Connexion réussie',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Erreur lors de la connexion',
            details: error.message 
        });
    }
});

// GET - Vérifier le token
router.get('/verify', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'Token manquant' });
        }
        
        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET || 'votre_secret_jwt_très_sécurisé'
        );
        
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        
        res.json({ 
            valid: true, 
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(401).json({ 
            valid: false, 
            error: 'Token invalide' 
        });
    }
});

module.exports = router;
