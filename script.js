// Toggle Dark Mode - Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    if (!themeToggle) {
        console.error('Botón de tema no encontrado');
        return;
    }

    // Verificar preferencia guardada o del sistema
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    if (savedTheme === 'dark') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    // Función para cambiar tema
    function toggleTheme() {
        html.classList.toggle('dark');
        const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    }

    themeToggle.addEventListener('click', toggleTheme);
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Cerrar menú móvil al hacer clic en un enlace
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Efecto de typing en el texto del hero
const typingText = document.querySelector('.typing-text');
const texts = ['Hugo', 'Futuro Ingeniero', 'Software Developer'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => {
            isDeleting = true;
        }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeText, speed);
}

// Iniciar efecto de typing
if (typingText) {
    typeText();
}

// Intersection Observer para animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar todas las secciones
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    observer.observe(section);
});

// Observar tarjetas de proyecto
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Carrusel de Habilidades - Movimiento Continuo
document.addEventListener('DOMContentLoaded', function() {
    const skillsTrack = document.getElementById('skills-track');
    
    if (!skillsTrack) return;
    
    const skillCards = document.querySelectorAll('.skill-card');
    const totalCards = skillCards.length;
    let position = 0;
    let animationId;
    
    // Duplicar las tarjetas para efecto infinito
    skillCards.forEach(card => {
        const clone = card.cloneNode(true);
        skillsTrack.appendChild(clone);
    });
    
    function getCardWidth() {
        if (window.innerWidth >= 1024) return 250 + 16; // md:min-w-[250px] + margin
        return 200 + 16; // min-w-[200px] + margin (mx-2 = 8px cada lado)
    }
    
    function animate() {
        const cardWidth = getCardWidth();
        const totalWidth = totalCards * cardWidth;
        
        // Mover continuamente
        position += 0.5; // Velocidad de movimiento (ajustable)
        
        // Resetear posición cuando llegue al final
        if (position >= totalWidth) {
            position = 0;
        }
        
        skillsTrack.style.transform = `translateX(-${position}px)`;
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Inicializar
    animate();
});

// Navegación activa al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link, .sidebar-link');
    const sectionsWithIds = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        let current = '';
        const scrollY = window.pageYOffset;

        sectionsWithIds.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            // Remover clases activas
            const icon = link.querySelector('i');
            const text = link.querySelector('span');
            const indicator = link.querySelector('.absolute.left-0');
            
            if (icon) {
                icon.classList.remove('text-blue-600', 'dark:text-blue-400');
                icon.classList.add('text-gray-600', 'dark:text-gray-400');
            }
            if (text) {
                text.classList.remove('text-blue-600', 'dark:text-blue-400');
                text.classList.add('text-gray-600', 'dark:text-gray-400');
            }
            link.classList.remove('bg-blue-50', 'dark:bg-zinc-900');
            
            if (indicator) {
                indicator.classList.remove('opacity-100');
                indicator.classList.add('opacity-0');
            }
            
            // Agregar clases activas si coincide
            if (link.getAttribute('href') === `#${current}`) {
                if (icon) {
                    icon.classList.remove('text-gray-600', 'dark:text-gray-400');
                    icon.classList.add('text-blue-600', 'dark:text-blue-400');
                }
                if (text) {
                    text.classList.remove('text-gray-600', 'dark:text-gray-400');
                    text.classList.add('text-blue-600', 'dark:text-blue-400');
                }
                link.classList.add('bg-blue-50', 'dark:bg-zinc-900');
                if (indicator) {
                    indicator.classList.remove('opacity-0');
                    indicator.classList.add('opacity-100');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Llamar una vez al cargar
});

// Manejo del formulario de contacto
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Aquí puedes agregar la lógica para enviar el formulario
        // Por ejemplo, usando Formspree, EmailJS, o tu propio backend
        
        // Simulación de envío exitoso
        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = 'Enviando...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = '¡Mensaje Enviado!';
            button.classList.remove('from-blue-600', 'to-purple-600');
            button.classList.add('from-green-600', 'to-green-500');
            contactForm.reset();
            
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('from-green-600', 'to-green-500');
                button.classList.add('from-blue-600', 'to-purple-600');
                button.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// Efecto parallax suave en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.getElementById('inicio');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 500;
    }
});

// Animación de partículas de fondo (opcional)
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 6}s`;
        particle.style.animationDuration = `${Math.random() * 3 + 3}s`;
        particlesContainer.appendChild(particle);
    }
}

// Descomentar para activar partículas
// createParticles();

// Smooth scroll para enlaces de navegación
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

// Efecto de cursor personalizado (opcional)
// Puedes descomentar esto si quieres un cursor personalizado
/*
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});
*/

// Lazy loading para imágenes (si agregas imágenes más adelante)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Botón Scroll to Top
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (!scrollToTopBtn) return;
    
    // Mostrar/ocultar botón según el scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.remove('opacity-0', 'invisible');
            scrollToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            scrollToTopBtn.classList.add('opacity-0', 'invisible');
            scrollToTopBtn.classList.remove('opacity-100', 'visible');
        }
    });
    
    // Scroll suave al hacer clic
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Actualizar año automáticamente
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Console message
console.log('%c¡Bienvenido a mi portafolio!', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%c¿Buscas algo? ¡Contáctame!', 'color: #9333ea; font-size: 14px;');
