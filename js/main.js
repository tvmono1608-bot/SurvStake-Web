// ========================================
// SURVSTAKE - SISTEMA DE CONTACTO
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // MENÚ MÓVIL
    // ========================================
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            mainNav.classList.toggle('active');
            const icon = this.querySelector('i');

            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }

            // Actualizar clase 'active' en navegación
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ========================================
    // SCROLL SUAVE
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========================================
    // FORMULARIO DE CONTACTO
    // ========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Recopilar datos del formulario
            const formData = {
                nombre: document.getElementById('name').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('phone').value,
                servicio: document.getElementById('service').value,
                mensaje: document.getElementById('message').value
            };

            // Validación básica
            if (!formData.nombre || !formData.email || !formData.telefono || !formData.mensaje) {
                alert('Por favor complete todos los campos requeridos.');
                return;
            }

            // Preparar contenido del email
            const emailSubject = encodeURIComponent(`Cotización ${formData.servicio} - ${formData.nombre}`);
            const emailBody = encodeURIComponent(
                `NUEVA SOLICITUD DE COTIZACIÓN\n` +
                `═══════════════════════════════\n\n` +
                `DATOS DEL CLIENTE:\n` +
                `Nombre/Empresa: ${formData.nombre}\n` +
                `Email: ${formData.email}\n` +
                `Teléfono: ${formData.telefono}\n\n` +
                `SERVICIO SOLICITADO:\n` +
                `${formData.servicio}\n\n` +
                `DESCRIPCIÓN DEL PROYECTO:\n` +
                `${formData.mensaje}\n\n` +
                `═══════════════════════════════\n` +
                `Enviado desde: www.survstake.com`
            );

            // Preparar mensaje de WhatsApp
            const whatsappMessage = encodeURIComponent(
                `*SOLICITUD DE COTIZACIÓN*\n\n` +
                `*Servicio:* ${formData.servicio}\n` +
                `*Nombre:* ${formData.nombre}\n` +
                `*Email:* ${formData.email}\n` +
                `*Teléfono:* ${formData.telefono}\n\n` +
                `*Descripción:*\n${formData.mensaje}`
            );

            // Crear enlaces
            const mailtoLink = `mailto:tvmono1608@gmail.com?subject=${emailSubject}&body=${emailBody}`;
            const whatsappLink = `https://wa.me/573178623774?text=${whatsappMessage}`;

            // Mostrar opciones al usuario
            const btnSubmit = contactForm.querySelector('.btn-submit');
            const originalText = btnSubmit.innerHTML;

            btnSubmit.innerHTML = '<i class="fas fa-check-circle"></i> Solicitud Preparada';
            btnSubmit.style.backgroundColor = '#27ae60';

            setTimeout(() => {
                const enviarPor = confirm(
                    '✓ Su solicitud está lista para enviar.\n\n' +
                    '¿Cómo desea contactarnos?\n\n' +
                    'Presione OK para enviar por EMAIL\n' +
                    'Presione CANCELAR para enviar por WHATSAPP'
                );

                if (enviarPor) {
                    // Enviar por Email
                    window.location.href = mailtoLink;
                } else {
                    // Enviar por WhatsApp
                    window.open(whatsappLink, '_blank');
                }

                // Resetear formulario
                contactForm.reset();
                btnSubmit.innerHTML = originalText;
                btnSubmit.style.backgroundColor = '';

                // Mostrar mensaje de éxito
                mostrarMensaje('Gracias por contactarnos. Le responderemos a la brevedad.', 'success');
            }, 800);
        });
    }

    // ========================================
    // FUNCIONES AUXILIARES
    // ========================================

    function mostrarMensaje(texto, tipo) {
        const mensaje = document.createElement('div');
        mensaje.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${tipo === 'success' ? '#27ae60' : '#e74c3c'};
            color: white;
            padding: 1.5rem 2rem;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 350px;
        `;
        mensaje.innerHTML = `<i class="fas fa-${tipo === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${texto}`;

        document.body.appendChild(mensaje);

        setTimeout(() => {
            mensaje.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => mensaje.remove(), 300);
        }, 4000);
    }

    // ========================================
    // ANIMACIONES AL HACER SCROLL
    // ========================================

    const observador = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Animar tarjetas de servicio
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observador.observe(card);
    });

    // ========================================
    // HEADER STICKY COLOR
    // ========================================

    window.addEventListener('scroll', function () {
        const header = document.querySelector('.site-header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.25)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
        }
    });

});

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);
