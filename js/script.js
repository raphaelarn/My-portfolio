// Frontend local: plus de backend. Les projets sont chargés depuis `data/projects.json`
// ou depuis localStorage si l'utilisateur a personnalisé via l'admin.
const LOCAL_PROJECTS_PATH = '/data/projects.json';

// Navigation Mobile
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Fermer le menu mobile lors du clic sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Effet de défilement fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation du texte tapé
const typedTextElement = document.querySelector('.typed-text');
const texts = ['Développeur Full Stack', 'Créateur d\'Applications Web', 'Passionné par le Code'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeText, typingSpeed);
}

// Démarrer l'animation de texte tapé
typeText();

// Charger les projets depuis data/projects.json ou fallback à localStorage
async function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');

    // Récupérer projets depuis localStorage si présents (admin local)
    const local = localStorage.getItem('projects');
    if (local) {
        try {
            const projects = JSON.parse(local);
            renderProjects(projects);
            return;
        } catch (e) {
            console.warn('Projets en local corrompus, suppression du cache localStorage');
            localStorage.removeItem('projects');
        }
    }

    // Sinon charger le fichier local data/projects.json
    try {
        const resp = await fetch(LOCAL_PROJECTS_PATH);
        if (!resp.ok) throw new Error('Fichier projects.json introuvable');
        const projects = await resp.json();
        renderProjects(projects);
    } catch (error) {
        console.error('Erreur lors du chargement des projets locaux:', error);
        projectsGrid.innerHTML = '<p class="loading">Aucun projet disponible. Vous pouvez ajouter des projets via l\'admin.</p>';
    }
}

function renderProjects(projects) {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projects || projects.length === 0) {
        projectsGrid.innerHTML = '<p class="loading">Aucun projet disponible pour le moment.</p>';
        return;
    }

    projectsGrid.innerHTML = projects.map((project, idx) => `
        <div class="project-card">
            <!-- Mini browser chrome -->
            <div class="card-chrome">
                <div class="card-dots">
                    <span class="dot-r"></span>
                    <span class="dot-y"></span>
                    <span class="dot-b"></span>
                </div>
                <div class="card-url">
                    <i class="fas fa-lock"></i>
                    <span>${project.demo ? project.demo.replace('https://', '') : '—'}</span>
                </div>
            </div>

            <!-- Inline iframe preview -->
            <div class="card-preview">
                <div class="card-loader" id="loader-${project._id}">
                    <div class="loader-ring"></div>
                </div>
                ${project.demo ? `
                    <iframe
                        src="${project.demo}"
                        title="${project.title}"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-forms"
                        onload="document.getElementById('loader-${project._id}').classList.add('hidden')"
                    ></iframe>
                    <div class="card-preview-overlay">
                        <a href="${project.demo}" target="_blank" rel="noopener">
                            <i class="fas fa-external-link-alt"></i> Visiter le site
                        </a>
                    </div>
                ` : ''}
            </div>

            <!-- Info -->
            <div class="project-header">
                <h3 style="font-family:var(--font-sans);font-size:1rem;font-weight:700;color:var(--text-1);letter-spacing:-0.01em;">${project.title}</h3>
                ${project.featured ? '<span class="badge-featured">★ Featured</span>' : ''}
            </div>

            <div class="project-content">
                <p>${project.description}</p>
                <div class="project-tags">
                    ${(project.technologies || []).map(tech => `<span class="tag">${tech}</span>`).join('')}
                </div>
            </div>

            ${project.demo || project.github ? `
                <div class="project-links">
                    ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> Visiter</a>` : ''}
                    ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener"><i class="fab fa-github"></i> Code</a>` : ''}
                </div>
            ` : ''}
        </div>
    `).join('');
}

// Charger les projets au chargement de la page
document.addEventListener('DOMContentLoaded', loadProjects);

// Gérer le formulaire de contact - sauvegarde en localStorage
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        id: 'msg-' + Date.now(),
        name: contactForm.name.value,
        email: contactForm.email.value,
        message: contactForm.message.value,
        createdAt: new Date().toISOString(),
        read: false
    };

    try {
        // Sauvegarder en localStorage
        const messages = JSON.parse(localStorage.getItem('messages') || '[]');
        messages.push(formData);
        localStorage.setItem('messages', JSON.stringify(messages));

        alert('Message sauvegardé ! Vous pouvez voir votre message dans l\'admin panel.');
        contactForm.reset();
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la sauvegarde du message.');
    }
});

// Animation des éléments au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer tous les éléments à animer
document.querySelectorAll('.skill-card, .project-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Changer la couleur de la navbar au scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(30, 41, 59, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--light-bg)';
        navbar.style.backdropFilter = 'none';
    }
});
