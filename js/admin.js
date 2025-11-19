// Configuration de l'API
const API_URL = 'http://localhost:5000/api';

// Stockage du token
let authToken = localStorage.getItem('authToken');
let currentUser = null;

// Éléments DOM
const loginPage = document.getElementById('login-page');
const adminDashboard = document.getElementById('admin-dashboard');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

// Vérifier si l'utilisateur est connecté au chargement
document.addEventListener('DOMContentLoaded', () => {
    if (authToken) {
        verifyToken();
    }
});

// Connexion
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            authToken = data.token;
            currentUser = data.user;
            localStorage.setItem('authToken', authToken);
            showDashboard();
        } else {
            loginError.textContent = data.error || 'Erreur de connexion';
        }
    } catch (error) {
        loginError.textContent = 'Impossible de se connecter au serveur';
        console.error(error);
    }
});

// Vérifier le token
async function verifyToken() {
    try {
        const response = await fetch(`${API_URL}/auth/verify`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        if (response.ok) {
            const data = await response.json();
            currentUser = data.user;
            showDashboard();
        } else {
            logout();
        }
    } catch (error) {
        console.error('Erreur de vérification:', error);
        logout();
    }
}

// Afficher le dashboard
function showDashboard() {
    loginPage.style.display = 'none';
    adminDashboard.style.display = 'grid';
    document.getElementById('user-name').textContent = currentUser.username;
    
    // Charger les données initiales
    loadProjects();
    loadMessages();
    updateSettings();
}

// Déconnexion
document.getElementById('logout-btn').addEventListener('click', (e) => {
    e.preventDefault();
    logout();
});

function logout() {
    localStorage.removeItem('authToken');
    authToken = null;
    currentUser = null;
    loginPage.style.display = 'flex';
    adminDashboard.style.display = 'none';
    loginError.textContent = '';
    loginForm.reset();
}

// Navigation entre sections
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        if (item.id === 'logout-btn') return;
        
        e.preventDefault();
        const section = item.dataset.section;
        
        // Mettre à jour la navigation
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        // Afficher la section correspondante
        document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
        document.getElementById(`${section}-section`).style.display = 'block';
        
        // Mettre à jour le titre
        const titles = {
            projects: 'Gestion des Projets',
            messages: 'Messages de Contact',
            settings: 'Paramètres'
        };
        document.getElementById('page-title').textContent = titles[section];
        
        // Charger les données de la section
        if (section === 'projects') loadProjects();
        if (section === 'messages') loadMessages();
    });
});

// GESTION DES PROJETS
async function loadProjects() {
    const tbody = document.getElementById('projects-table-body');
    tbody.innerHTML = '<tr><td colspan="4" class="loading">Chargement...</td></tr>';
    
    try {
        const response = await fetch(`${API_URL}/projects`);
        const projects = await response.json();
        
        if (projects.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="loading">Aucun projet</td></tr>';
            return;
        }
        
        tbody.innerHTML = projects.map(project => `
            <tr>
                <td><strong>${project.title}</strong></td>
                <td>
                    ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                </td>
                <td>${new Date(project.createdAt).toLocaleDateString('fr-FR')}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" onclick="editProject('${project._id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon delete" onclick="deleteProject('${project._id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="4" class="loading">Erreur de chargement</td></tr>';
        console.error(error);
    }
}

// Modal de projet
const projectModal = document.getElementById('project-modal');
const projectForm = document.getElementById('project-form');

document.getElementById('add-project-btn').addEventListener('click', () => {
    document.getElementById('modal-title').textContent = 'Nouveau Projet';
    projectForm.reset();
    document.getElementById('project-id').value = '';
    projectModal.classList.add('active');
});

document.querySelectorAll('.close, #cancel-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        projectModal.classList.remove('active');
    });
});

// Soumettre le formulaire de projet
projectForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const projectData = {
        title: document.getElementById('project-title').value,
        description: document.getElementById('project-description').value,
        image: document.getElementById('project-image').value,
        technologies: document.getElementById('project-technologies').value
            .split(',').map(t => t.trim()).filter(t => t),
        github: document.getElementById('project-github').value,
        demo: document.getElementById('project-demo').value,
        featured: document.getElementById('project-featured').checked
    };
    
    const projectId = document.getElementById('project-id').value;
    const method = projectId ? 'PUT' : 'POST';
    const url = projectId ? `${API_URL}/projects/${projectId}` : `${API_URL}/projects`;
    
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(projectData)
        });
        
        if (response.ok) {
            projectModal.classList.remove('active');
            loadProjects();
            alert('Projet enregistré avec succès !');
        } else {
            const error = await response.json();
            alert('Erreur: ' + error.error);
        }
    } catch (error) {
        alert('Erreur de connexion au serveur');
        console.error(error);
    }
});

// Modifier un projet
window.editProject = async function(id) {
    try {
        const response = await fetch(`${API_URL}/projects/${id}`);
        const project = await response.json();
        
        document.getElementById('modal-title').textContent = 'Modifier le Projet';
        document.getElementById('project-id').value = project._id;
        document.getElementById('project-title').value = project.title;
        document.getElementById('project-description').value = project.description;
        document.getElementById('project-image').value = project.image || '';
        document.getElementById('project-technologies').value = project.technologies.join(', ');
        document.getElementById('project-github').value = project.github || '';
        document.getElementById('project-demo').value = project.demo || '';
        document.getElementById('project-featured').checked = project.featured;
        
        projectModal.classList.add('active');
    } catch (error) {
        alert('Erreur lors du chargement du projet');
        console.error(error);
    }
};

// Supprimer un projet
window.deleteProject = async function(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;
    
    try {
        const response = await fetch(`${API_URL}/projects/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        if (response.ok) {
            loadProjects();
            alert('Projet supprimé avec succès');
        } else {
            alert('Erreur lors de la suppression');
        }
    } catch (error) {
        alert('Erreur de connexion au serveur');
        console.error(error);
    }
};

// GESTION DES MESSAGES
async function loadMessages() {
    const tbody = document.getElementById('messages-table-body');
    tbody.innerHTML = '<tr><td colspan="5" class="loading">Chargement...</td></tr>';
    
    try {
        const response = await fetch(`${API_URL}/contact`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        const messages = await response.json();
        
        // Compter les messages non lus
        const unreadCount = messages.filter(m => !m.read).length;
        const badge = document.getElementById('unread-count');
        badge.textContent = unreadCount > 0 ? unreadCount : '';
        
        if (messages.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="loading">Aucun message</td></tr>';
            return;
        }
        
        tbody.innerHTML = messages.map(message => `
            <tr class="${message.read ? '' : 'message-unread'}">
                <td>${message.name}</td>
                <td>${message.email}</td>
                <td class="message-preview">${message.message}</td>
                <td>${new Date(message.createdAt).toLocaleDateString('fr-FR')}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" onclick="viewMessage('${message._id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon delete" onclick="deleteMessage('${message._id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="5" class="loading">Erreur de chargement</td></tr>';
        console.error(error);
    }
}

// Modal de message
const messageModal = document.getElementById('message-modal');
let currentMessageId = null;

window.viewMessage = async function(id) {
    currentMessageId = id;
    
    try {
        const response = await fetch(`${API_URL}/contact/${id}`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        const message = await response.json();
        
        document.getElementById('message-name').textContent = message.name;
        document.getElementById('message-email').textContent = message.email;
        document.getElementById('message-email').href = `mailto:${message.email}`;
        document.getElementById('message-date').textContent = 
            new Date(message.createdAt).toLocaleString('fr-FR');
        document.getElementById('message-text').textContent = message.message;
        
        messageModal.classList.add('active');
        
        // Marquer comme lu
        if (!message.read) {
            await fetch(`${API_URL}/contact/${id}/read`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            loadMessages();
        }
    } catch (error) {
        alert('Erreur lors du chargement du message');
        console.error(error);
    }
};

document.getElementById('close-message-btn').addEventListener('click', () => {
    messageModal.classList.remove('active');
});

document.getElementById('delete-message-btn').addEventListener('click', () => {
    deleteMessage(currentMessageId);
    messageModal.classList.remove('active');
});

window.deleteMessage = async function(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return;
    
    try {
        const response = await fetch(`${API_URL}/contact/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        if (response.ok) {
            loadMessages();
            alert('Message supprimé avec succès');
        } else {
            alert('Erreur lors de la suppression');
        }
    } catch (error) {
        alert('Erreur de connexion au serveur');
        console.error(error);
    }
};

// PARAMÈTRES
function updateSettings() {
    document.getElementById('settings-username').textContent = currentUser.username;
    document.getElementById('settings-email').textContent = currentUser.email;
    document.getElementById('settings-role').textContent = currentUser.role;
    document.getElementById('api-url').textContent = API_URL;
}

document.getElementById('test-api-btn').addEventListener('click', async () => {
    const statusDiv = document.getElementById('api-status');
    
    try {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        
        if (response.ok) {
            statusDiv.className = 'success';
            statusDiv.textContent = '✅ ' + data.message;
        } else {
            statusDiv.className = 'error';
            statusDiv.textContent = '❌ Erreur de connexion';
        }
    } catch (error) {
        statusDiv.className = 'error';
        statusDiv.textContent = '❌ Le serveur backend n\'est pas accessible';
    }
});

// Fermer les modals en cliquant à l'extérieur
window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove('active');
    }
    if (e.target === messageModal) {
        messageModal.classList.remove('active');
    }
});
