const jwt = require('jsonwebtoken');

// Middleware pour vérifier le token JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ error: 'Accès refusé. Token manquant.' });
    }

    try {
        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET || 'votre_secret_jwt_très_sécurisé'
        );
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token invalide ou expiré' });
    }
};

// Middleware pour vérifier si l'utilisateur est admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ 
            error: 'Accès refusé. Privilèges administrateur requis.' 
        });
    }
    next();
};

module.exports = {
    authenticateToken,
    isAdmin
};
