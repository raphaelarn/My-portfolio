const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// POST - Envoyer un message de contact (public)
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ 
                error: 'Tous les champs sont requis' 
            });
        }
        
        const contact = new Contact({ name, email, message });
        await contact.save();
        
        res.status(201).json({ 
            message: 'Message envoyé avec succès',
            contact: {
                id: contact._id,
                name: contact.name,
                email: contact.email
            }
        });
    } catch (error) {
        res.status(400).json({ 
            error: 'Erreur lors de l\'envoi du message',
            details: error.message 
        });
    }
});

// GET - Récupérer tous les messages (admin uniquement)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
    }
});

// GET - Récupérer un message par ID (admin uniquement)
router.get('/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const message = await Contact.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ error: 'Message non trouvé' });
        }
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du message' });
    }
});

// PATCH - Marquer un message comme lu (admin uniquement)
router.patch('/:id/read', authenticateToken, isAdmin, async (req, res) => {
    try {
        const message = await Contact.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );
        
        if (!message) {
            return res.status(404).json({ error: 'Message non trouvé' });
        }
        
        res.json({ message: 'Message marqué comme lu', contact: message });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du message' });
    }
});

// DELETE - Supprimer un message (admin uniquement)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const message = await Contact.findByIdAndDelete(req.params.id);
        
        if (!message) {
            return res.status(404).json({ error: 'Message non trouvé' });
        }
        
        res.json({ message: 'Message supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du message' });
    }
});

module.exports = router;
