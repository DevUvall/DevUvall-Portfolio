const text = 'I have worked on major projects such as Sierra Mexica, El Palenque, and more. I have contributed to several experiences, accumulating over 45,000,000 visits in total.';

let i = 0;

// Animación de escritura
function escribir() {
    if (i < text.length) {
        document.getElementById("text-typing").textContent += text.charAt(i);
        i++;
        setTimeout(escribir, 30);
    }
}

// Iniciar animación cuando carga la página
escribir();

// Navbar que se reduce al hacer scroll
document.addEventListener("scroll", () => {
    const nav = document.getElementById("navBar");

    if (window.scrollY > 150) {
        nav.classList.add("small");
    } else {
        nav.classList.remove("small");
    }
});

// Smooth scroll para los enlaces de navegación
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
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

// Animación de aparición para las tarjetas cuando entran en viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animación
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-box, .video-card, .testimonial-card');
    fadeElements.forEach(el => observer.observe(el));
});

// Efecto parallax sutil en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('#home');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// Copiar Discord al hacer click (opcional)
const discordLink = document.querySelector('.contact-link');
if (discordLink) {
    discordLink.addEventListener('click', (e) => {
        // Opcional: copiar el usuario de Discord al portapapeles
        const discordUser = 'Ivqnxd';
        
        // Crear elemento temporal para copiar
        const tempInput = document.createElement('input');
        tempInput.value = discordUser;
        document.body.appendChild(tempInput);
        tempInput.select();
        
        try {
            document.execCommand('copy');
            // Cambiar temporalmente el texto del botón
            const originalText = discordLink.querySelector('span').textContent;
            discordLink.querySelector('span').textContent = 'Discord: Copied! ✓';
            
            setTimeout(() => {
                discordLink.querySelector('span').textContent = originalText;
            }, 2000);
        } catch (err) {
            console.log('Error al copiar');
        }
        
        document.body.removeChild(tempInput);
    });
}