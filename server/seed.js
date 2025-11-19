const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Project = require('./models/Project');

dotenv.config();

// Script pour initialiser la base de données avec des données de test

async function seedDatabase() {
    try {
        // Connexion à MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
        console.log('✅ Connecté à MongoDB');

        // Supprimer les données existantes
        await User.deleteMany({});
        await Project.deleteMany({});
        console.log('🗑️  Base de données nettoyée');

        // Créer un utilisateur admin
        const admin = new User({
            username: 'admin',
            email: 'admin@portfolio.com',
            password: 'admin123', // Sera hashé automatiquement
            role: 'admin'
        });
        await admin.save();
        console.log('👤 Utilisateur admin créé');
        console.log('   Email: admin@portfolio.com');
        console.log('   Mot de passe: admin123');

        // Créer des projets de démonstration
        const projects = [
            {
                title: 'Application E-commerce',
                description: 'Une application e-commerce complète avec panier, paiement et gestion des commandes.',
                image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600',
                technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                github: 'https://github.com/votre-username/ecommerce-app',
                demo: 'https://demo-ecommerce.com',
                featured: true,
                order: 1
            },
            {
                title: 'Dashboard Analytics',
                description: 'Dashboard interactif avec graphiques et statistiques en temps réel.',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
                technologies: ['Vue.js', 'Chart.js', 'Express', 'PostgreSQL'],
                github: 'https://github.com/votre-username/dashboard',
                demo: 'https://demo-dashboard.com',
                featured: true,
                order: 2
            },
            {
                title: 'Réseau Social',
                description: 'Plateforme de réseau social avec posts, likes, commentaires et messagerie.',
                image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600',
                technologies: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io'],
                github: 'https://github.com/votre-username/social-network',
                demo: '',
                featured: false,
                order: 3
            },
            {
                title: 'Application Mobile Fitness',
                description: 'Application mobile pour le suivi des entraînements et de la nutrition.',
                image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600',
                technologies: ['React Native', 'Firebase', 'Redux'],
                github: 'https://github.com/votre-username/fitness-app',
                demo: '',
                featured: false,
                order: 4
            }
        ];

        await Project.insertMany(projects);
        console.log(`📁 ${projects.length} projets créés`);

        console.log('\n✅ Base de données initialisée avec succès !');
        console.log('\n🚀 Vous pouvez maintenant vous connecter avec:');
        console.log('   Email: admin@portfolio.com');
        console.log('   Mot de passe: admin123');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation:', error);
        process.exit(1);
    }
}

seedDatabase();
