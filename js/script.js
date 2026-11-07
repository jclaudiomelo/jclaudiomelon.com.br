document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            
            // Toggle icon
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.className = 'fi fi-rr-cross';
            } else {
                icon.className = 'fi fi-rr-menu-burger';
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                icon.className = 'fi fi-rr-menu-burger';
            });
        });
    }

    // 2. Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active from other buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    // Trigger reflow for animations
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95) translateY(10px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1) translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 3. Highlight Active Nav Link on Scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 4. Copy Email to Clipboard
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const emailAddressElement = document.getElementById('email-address');
    const tooltip = document.getElementById('copy-tooltip');

    if (copyEmailBtn && emailAddressElement && tooltip) {
        copyEmailBtn.addEventListener('click', () => {
            const email = emailAddressElement.innerText || emailAddressElement.textContent;
            
            navigator.clipboard.writeText(email).then(() => {
                tooltip.classList.add('show');
                
                setTimeout(() => {
                    tooltip.classList.remove('show');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }

    // 5. Contact Form Simulation
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Enviando... <i class="fi fi-rr-spinner animate-spin"></i>';
            
            setTimeout(() => {
                formStatus.className = 'form-status success';
                formStatus.innerHTML = 'Mensagem enviada com sucesso! Obrigado pelo contato.';
                
                contactForm.reset();
                
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 5000);
            }, 1500);
        });
    }
});
