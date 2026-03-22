// Frontend-only admin: projects stored in localStorage (no backend)
let currentUser = { username: 'local-admin', email: 'admin@local', role: 'admin' };

const projectModal = document.getElementById('project-modal');
const projectForm = document.getElementById('project-form');

document.addEventListener('DOMContentLoaded', () => {
    // Bypass login: show dashboard immediately
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'grid';
    document.getElementById('user-name').textContent = currentUser.username;
    loadProjects();
    loadMessages();
    updateSettings();
});

// Navigation entre sections
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        if (item.id === 'logout-btn') return;
        
        e.preventDefault();
        const section = item.dataset.section;
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
        document.getElementById(`${section}-section`).style.display = 'block';
        const titles = { projects: 'Gestion des Projets', messages: 'Messages de Contact', settings: 'Paramètres' };
        document.getElementById('page-title').textContent = titles[section];
        if (section === 'projects') loadProjects();
        if (section === 'messages') loadMessages();
    });
});

// UTIL helpers for localStorage projects
function getStoredProjects() {
    const raw = localStorage.getItem('projects');
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (e) { localStorage.removeItem('projects'); return null; }
}

function saveStoredProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function generateId() {
    return 'proj-' + Math.random().toString(36).slice(2, 9);
}

// Load projects from localStorage or from data/projects.json
async function loadProjects() {
    const tbody = document.getElementById('projects-table-body');
    tbody.innerHTML = '<tr><td colspan="4" class="loading">Chargement...</td></tr>';

    const stored = getStoredProjects();
    if (stored) {
        renderProjectsTable(stored);
        return;
    }

    try {
        const resp = await fetch('/data/projects.json');
        if (!resp.ok) throw new Error('projects.json introuvable');
        const projects = await resp.json();
        renderProjectsTable(projects);
    } catch (err) {
        console.error(err);
        tbody.innerHTML = '<tr><td colspan="4" class="loading">Aucun projet</td></tr>';
    }
}

function renderProjectsTable(projects) {
    const tbody = document.getElementById('projects-table-body');
    if (!projects || projects.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="loading">Aucun projet</td></tr>';
        return;
    }
    tbody.innerHTML = projects.map(project => `
        <tr>
            <td><strong>${project.title}</strong></td>
            <td>${(project.technologies||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</td>
            <td>${project.createdAt ? new Date(project.createdAt).toLocaleDateString('fr-FR') : '-'}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon" onclick="editProject('${project._id||''}')"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon delete" onclick="deleteProject('${project._id||''}')"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Modal actions
document.getElementById('add-project-btn').addEventListener('click', () => {
    document.getElementById('modal-title').textContent = 'Nouveau Projet';
    projectForm.reset();
    document.getElementById('project-id').value = '';
    projectModal.classList.add('active');
});

document.querySelectorAll('.close, #cancel-btn').forEach(btn => btn.addEventListener('click', ()=> projectModal.classList.remove('active')));

projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const projects = getStoredProjects() || [];
    const projectId = document.getElementById('project-id').value;
    const data = {
        _id: projectId || generateId(),
        title: document.getElementById('project-title').value,
        description: document.getElementById('project-description').value,
        image: document.getElementById('project-image').value,
        technologies: document.getElementById('project-technologies').value.split(',').map(t=>t.trim()).filter(Boolean),
        github: document.getElementById('project-github').value,
        demo: document.getElementById('project-demo').value,
        featured: document.getElementById('project-featured').checked,
        createdAt: projectId ? (projects.find(p=>p._id===projectId)?.createdAt) : new Date().toISOString()
    };

    if (projectId) {
        const idx = projects.findIndex(p=>p._id===projectId);
        if (idx !== -1) projects[idx] = data;
    } else {
        projects.push(data);
    }
    saveStoredProjects(projects);
    projectModal.classList.remove('active');
    loadProjects();
    alert('Projet enregistré localement.');
});

// Edit / Delete
window.editProject = function(id) {
    const projects = getStoredProjects() || [];
    const project = projects.find(p=>p._id===id);
    if (!project) return alert('Projet introuvable');
    document.getElementById('modal-title').textContent = 'Modifier le Projet';
    document.getElementById('project-id').value = project._id;
    document.getElementById('project-title').value = project.title;
    document.getElementById('project-description').value = project.description;
    document.getElementById('project-image').value = project.image || '';
    document.getElementById('project-technologies').value = (project.technologies||[]).join(', ');
    document.getElementById('project-github').value = project.github || '';
    document.getElementById('project-demo').value = project.demo || '';
    document.getElementById('project-featured').checked = !!project.featured;
    projectModal.classList.add('active');
};

window.deleteProject = function(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;
    let projects = getStoredProjects() || [];
    projects = projects.filter(p=>p._id!==id);
    saveStoredProjects(projects);
    loadProjects();
    alert('Projet supprimé localement');
};

// MESSAGES: simple local list (no backend)
function loadMessages() {
    const tbody = document.getElementById('messages-table-body');
    const messages = JSON.parse(localStorage.getItem('messages')||'[]');
    const unreadCount = messages.filter(m=>!m.read).length;
    document.getElementById('unread-count').textContent = unreadCount>0?unreadCount:'';
    if (messages.length===0) {
        tbody.innerHTML = '<tr><td colspan="5" class="loading">Aucun message</td></tr>';
        return;
    }
    tbody.innerHTML = messages.map(m=>`
        <tr class="${m.read? '':'message-unread'}">
            <td>${m.name}</td>
            <td>${m.email}</td>
            <td class="message-preview">${m.message}</td>
            <td>${new Date(m.createdAt).toLocaleDateString('fr-FR')}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon" onclick="viewMessage('${m.id}')"><i class="fas fa-eye"></i></button>
                    <button class="btn-icon delete" onclick="deleteMessage('${m.id}')"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

window.viewMessage = function(id) {
    const messages = JSON.parse(localStorage.getItem('messages')||'[]');
    const m = messages.find(x=>x.id===id);
    if (!m) return alert('Message introuvable');
    document.getElementById('message-name').textContent = m.name;
    document.getElementById('message-email').textContent = m.email;
    document.getElementById('message-email').href = `mailto:${m.email}`;
    document.getElementById('message-date').textContent = new Date(m.createdAt).toLocaleString('fr-FR');
    document.getElementById('message-text').textContent = m.message;
    document.getElementById('message-modal').classList.add('active');
    if (!m.read) {
        m.read = true;
        localStorage.setItem('messages', JSON.stringify(messages));
        loadMessages();
    }
};

window.deleteMessage = function(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return;
    let messages = JSON.parse(localStorage.getItem('messages')||'[]');
    messages = messages.filter(m=>m.id!==id);
    localStorage.setItem('messages', JSON.stringify(messages));
    loadMessages();
};

// Settings
function updateSettings() {
    document.getElementById('settings-username').textContent = currentUser.username;
    document.getElementById('settings-email').textContent = currentUser.email;
    document.getElementById('settings-role').textContent = currentUser.role;
    document.getElementById('api-url').textContent = 'Local: admin et projets en localStorage';
}

document.getElementById('test-api-btn').addEventListener('click', () => {
    const statusDiv = document.getElementById('api-status');
    statusDiv.className = 'success';
    statusDiv.textContent = '✅ Mode local: pas d\'API externe requise';
});

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
