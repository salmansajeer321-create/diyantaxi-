document.addEventListener("DOMContentLoaded", () => {
    // 1. Preloader
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);

    // 2. Sticky Navbar & Mobile Menu
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // 3. Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // 4. Quick Booking Form to WhatsApp
    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const pickup = document.getElementById('pickup').value;
        const drop = document.getElementById('drop').value;
        const datetime = document.getElementById('datetime').value;
        const passengers = document.getElementById('passengers').value;
        const tripType = document.getElementById('tripType').value;

        const message = `*New Booking Request*%0A%0A*Trip Type:* ${tripType}%0A*Pickup:* ${pickup}%0A*Drop:* ${drop}%0A*Date & Time:* ${datetime}%0A*Passengers:* ${passengers}%0A%0APlease let me know the availability and price.`;
        
        window.open(`https://wa.me/918590150664?text=${message}`, '_blank');
    });

    // 5. Package Booking Buttons to WhatsApp
    const pkgBtns = document.querySelectorAll('.btn-book-pkg');
    pkgBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const pkgName = btn.getAttribute('data-pkg');
            const message = `Hi Diyan Taxi, I am interested in the *${pkgName}* package. Please share details and pricing.`;
            window.open(`https://wa.me/918590150664?text=${message}`, '_blank');
        });
    });

    // 6. Accordion FAQ
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                panel.style.padding = '0 20px';
            } else {
                panel.style.padding = '15px 20px';
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

    // 7. Counters Animation
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current) + "+";
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCounter();
        });
    };

    window.addEventListener('scroll', () => {
        const countersSection = document.querySelector('.counters');
        if (countersSection && !hasCounted) {
            const sectionTop = countersSection.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight) {
                startCounters();
                hasCounted = true;
            }
        }
    });
});
