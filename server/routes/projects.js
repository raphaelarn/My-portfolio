const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// GET - Récupérer tous les projets (public)
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ order: -1, createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des projets' });
    }
});

// GET - Récupérer un projet par ID (public)
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Projet non trouvé' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du projet' });
    }
});

// POST - Créer un nouveau projet (admin uniquement)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json({ 
            message: 'Projet créé avec succès', 
            project 
        });
    } catch (error) {
        res.status(400).json({ 
            error: 'Erreur lors de la création du projet',
            details: error.message 
        });
    }
});

// PUT - Mettre à jour un projet (admin uniquement)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!project) {
            return res.status(404).json({ error: 'Projet non trouvé' });
        }
        
        res.json({ 
            message: 'Projet mis à jour avec succès', 
            project 
        });
    } catch (error) {
        res.status(400).json({ 
            error: 'Erreur lors de la mise à jour du projet',
            details: error.message 
        });
    }
});

// DELETE - Supprimer un projet (admin uniquement)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        
        if (!project) {
            return res.status(404).json({ error: 'Projet non trouvé' });
        }
        
        res.json({ message: 'Projet supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du projet' });
    }
});

module.exports = router;
