document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       1. HEADER SCROLL — rAF throttled + passive
       ============================================================ */
    const header = document.getElementById('main-header');
    let scrollTicking = false;

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                header.classList.toggle('scrolled', window.scrollY > 50);
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    /* ============================================================
       2. MOBILE MENU
       ============================================================ */
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('is-active');
        mobileNav.classList.toggle('is-active');
        document.body.classList.toggle('no-scroll');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('is-active');
            mobileNav.classList.remove('is-active');
            document.body.classList.remove('no-scroll');
        });
    });

    /* ============================================================
       3. COUNTERS
       ============================================================ */
    const counters = document.querySelectorAll('.counter');

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const step = Math.max(1, Math.ceil(target / 60));
            let count = 0;

            const tick = () => {
                count += step;
                if (count >= target) {
                    counter.innerText = target;
                } else {
                    counter.innerText = count;
                    requestAnimationFrame(tick);
                }
            };
            requestAnimationFrame(tick);
        });
    };

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                statsObserver.disconnect();
            }
        }, { threshold: 0.5 });
        statsObserver.observe(heroStats);
    }

    /* ============================================================
       4. PROJECT DATA — All 17 projects
       ============================================================ */
    const PROJECTS = [
        { id: '01', name: 'Festival Pink Apartments', location: 'Kisasi Dungu Zone', cat: 'Apartment Development', filter: 'apartments', img: 'images/projects/festival-pink-apartments.jpg',
          caption: 'Modern apartment development designed with functionality, comfort and investment value in mind.',
          desc: 'A contemporary residential development demonstrating TEBU\'s approach to practical planning, quality construction and modern living.' },

        { id: '02', name: 'Fifi Studio Apartments', location: 'Kyanja–Kilowoz', cat: 'Studio Apartments', filter: 'apartments', img: 'images/projects/fifi-studio-apartments.jpg',
          caption: 'Smart, modern studio apartments designed for comfortable urban living.',
          desc: 'A carefully planned studio apartment project focused on efficient use of space, modern design and comfortable accommodation.' },

        { id: '03', name: 'Reagan 3-Bedroom Apartments', location: 'Nansana–Kabulengwa', cat: 'Residential Apartments', filter: 'apartments', img: 'images/projects/reagan-apartments.jpg',
          caption: 'Contemporary 3-bedroom apartments combining comfort, functionality and modern design.',
          desc: 'Contemporary 3-bedroom apartments combining comfort, functionality and modern design.' },

        { id: '04', name: 'Festal Single-Bedroom Apartments', location: 'Kisasi Dungu Zone', cat: 'Single-Bedroom Apartments', filter: 'apartments', img: 'images/projects/festal-apartments.jpg',
          caption: 'Practical and modern apartments built for comfortable living and long-term value.',
          desc: 'Practical and modern apartments built for comfortable living and long-term value.' },

        { id: '05', name: 'Sulliam Apartments', location: 'Kisasi Ndudu', cat: 'Residential Apartments', filter: 'apartments', img: 'images/projects/sulliam-apartments.jpg',
          caption: 'A residential development featuring thoughtfully planned double and single-bedroom apartments.',
          desc: 'A residential development featuring thoughtfully planned double and single-bedroom apartments.' },

        { id: '06', name: 'Mutalya Apartments', location: 'Kisasi Central Zone', cat: 'Single-Bedroom Apartments', filter: 'apartments', img: 'images/projects/mutalya-apartments.jpg',
          caption: 'Smartly planned apartments designed for modern urban living.',
          desc: 'Smartly planned apartments designed for modern urban living.' },

        { id: '07', name: 'Namuganza Studio Apartments', location: 'Kisasi Police Area', cat: 'Studio Apartments', filter: 'apartments', img: 'images/projects/namuganza-apartments.jpg',
          caption: 'Functional studio apartments combining efficient space planning with contemporary construction.',
          desc: 'Functional studio apartments combining efficient space planning with contemporary construction.' },

        { id: '08', name: 'Kyarimpa Commercial & Studio Apartments', location: 'Kungu–Kibwa Zone', cat: 'Mixed-Use Development', filter: 'commercial', img: 'images/projects/kyarimpa-commercial.jpg',
          caption: 'A versatile development bringing together commercial spaces and modern residential accommodation.',
          desc: 'A versatile development bringing together commercial spaces and modern residential accommodation.' },

        { id: '09', name: 'Grase Studio & Single-Bedroom Apartments', location: 'Kyanja–Kevina', cat: 'Residential Apartments', filter: 'apartments', img: 'images/projects/grase-apartments.jpg',
          caption: 'Modern studio and single-bedroom apartments designed around comfort, convenience and investment value.',
          desc: 'Modern studio and single-bedroom apartments designed around comfort, convenience and investment value.' },

        { id: '10', name: 'Stuart Star Apartments', location: 'Kabulengwa–Nansana', cat: '2-Bedroom Apartments', filter: 'apartments', img: 'images/projects/stuart-star-apartments.jpg',
          caption: 'Contemporary 2-bedroom apartments designed for practical and comfortable family living.',
          desc: 'Contemporary 2-bedroom apartments designed for practical and comfortable family living.' },

        { id: '11', name: 'Kungu 4-Bedroom Apartments', location: 'Kungu', cat: 'Residential Apartments', filter: 'apartments', img: 'images/projects/kungu-4bed-apartments.jpg',
          caption: 'Spacious 4-bedroom apartments combining modern architecture with functional living spaces.',
          desc: 'Spacious 4-bedroom apartments combining modern architecture with functional living spaces.' },

        { id: '12', name: 'Kapo 4-Bedroom Apartments', location: 'Kyanja', cat: 'Residential Apartments', filter: 'apartments', img: 'images/projects/kapo-4bed-apartments.jpg',
          caption: 'Spacious modern apartments designed with comfort, functionality and quality finishes in mind.',
          desc: 'Spacious modern apartments designed with comfort, functionality and quality finishes in mind.' },

        { id: '13', name: 'Martin 3-Bedroom House', location: 'Namulonge', cat: 'Residential House', filter: 'residential', img: 'images/projects/martin-3bed-house.jpg',
          caption: 'A modern 3-bedroom family home designed for comfort, elegance and lasting value.',
          desc: 'From architectural planning to construction, the project reflects TEBU\'s commitment to creating practical and attractive family homes.' },

        { id: '14', name: 'Buso 5-Bedroom House', location: 'Buso–Namulonge', cat: 'Luxury Residential House', filter: 'residential', img: 'images/projects/buso-5bed-house.jpg',
          caption: 'A spacious 5-bedroom residence designed for modern family living.',
          desc: 'A carefully planned family residence combining generous living spaces, functionality and contemporary architectural character.' },

        { id: '15', name: 'Kids World International School', location: 'Kisasi–Kyanja', cat: 'Educational Facilities', filter: 'education', img: 'images/projects/kids-world-school.jpg',
          caption: 'Creating quality learning spaces where children can learn, grow and thrive.',
          desc: 'TEBU Construction provides practical and durable building solutions for educational environments, with attention to safety, functionality and learner experience.' },

        { id: '16', name: 'William & Susan Kids Park', location: 'Kungu', cat: 'Recreational Facility', filter: 'recreational', img: 'images/projects/william-susan-park.jpg',
          caption: 'A purpose-designed recreational environment created for fun, activity and children\'s development.',
          desc: 'Creating safe and engaging spaces where children can play, explore and grow.' },

        { id: '17', name: 'Kyanja Kids Park', location: 'Kyanja', cat: 'Children\'s Recreational Facility', filter: 'recreational', img: 'images/projects/kyanja-kids-park.jpg',
          caption: 'A purpose-designed recreational environment created for fun, activity and children\'s development.',
          desc: 'A purpose-designed recreational environment created for fun, activity and children\'s development.' }
    ];

    const INITIAL_VISIBLE = 6;

    /* ============================================================
       5. BUILD PROJECT CARDS ONCE
       ============================================================ */
    const grid = document.getElementById('projectsGrid');
    const visibleCountEl = document.getElementById('visibleCount');
    const emptyState = document.getElementById('projectsEmpty');
    const toggleBtn = document.getElementById('toggleProjectsBtn');
    const toggleLabel = document.getElementById('toggleProjectsLabel');
    const toggleIcon = document.getElementById('toggleProjectsIcon');

    (function buildProjects() {
        const fragment = document.createDocumentFragment();

        PROJECTS.forEach(project => {
            const card = document.createElement('article');
            card.className = 'project-card bg-panel';
            card.dataset.category = project.filter;

            card.innerHTML = `
                <div class="project-media">
                    <img src="${project.img}" alt="${project.name}" loading="lazy" decoding="async"
                         onerror="this.parentElement.classList.add('img-missing')">
                    <span class="project-number">${project.id}</span>
                    <span class="project-location-badge"><i class="fa-solid fa-location-dot"></i> ${project.location.split('–')[0].split(' ')[0]}</span>
                </div>
                <div class="project-info">
                    <span class="project-cat-tag">${project.cat}</span>
                    <h4 class="project-name">${project.name}</h4>
                    <p class="project-caption">${project.caption}</p>
                    <button class="project-view-btn view-project-btn"
                            data-title="${project.name}"
                            data-location="${project.location}"
                            data-cat="${project.cat}"
                            data-img="${project.img}"
                            data-desc="${project.desc}">
                        View Project <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            `;

            fragment.appendChild(card);
        });

        grid.appendChild(fragment);
    })();

    /* ============================================================
       6. FILTER STATE + VISIBILITY
       ============================================================ */
    let showAll = false;
    let activeFilter = 'all';

    function applyVisibility() {
        const cards = grid.children;
        let visible = 0;

        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            const matchesFilter = (activeFilter === 'all' || card.dataset.category === activeFilter);

            let shouldShow;
            if (activeFilter === 'all') {
                shouldShow = showAll || i < INITIAL_VISIBLE;
            } else {
                shouldShow = matchesFilter;
            }

            card.classList.toggle('hide', !shouldShow);
            if (shouldShow) visible++;
        }

        visibleCountEl.textContent = visible;
        emptyState.classList.toggle('show', visible === 0);

        if (activeFilter === 'all' && PROJECTS.length > INITIAL_VISIBLE) {
            toggleBtn.parentElement.style.display = 'flex';
            if (showAll) {
                toggleLabel.textContent = 'Show Fewer Projects';
                toggleIcon.classList.remove('fa-chevron-down');
                toggleIcon.classList.add('fa-chevron-up');
            } else {
                toggleLabel.textContent = `View All ${PROJECTS.length} Projects`;
                toggleIcon.classList.remove('fa-chevron-up');
                toggleIcon.classList.add('fa-chevron-down');
            }
        } else {
            toggleBtn.parentElement.style.display = 'none';
        }
    }

    /* ============================================================
       7. FILTER BUTTONS
       ============================================================ */
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.dataset.filter;
            showAll = false;
            applyVisibility();
        });
    });

    /* ============================================================
       8. VIEW ALL TOGGLE
       ============================================================ */
    toggleBtn.addEventListener('click', () => {
        showAll = !showAll;
        applyVisibility();
    });

    // Initial render
    applyVisibility();

    /* ============================================================
       9. MODAL — delegated listener on grid
       ============================================================ */
    const modal = document.getElementById('projectModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalLocation = document.getElementById('modalLocation');
    const modalDescription = document.getElementById('modalDescription');
    const modalImage = document.getElementById('modalImage');

    function openModal(data) {
        modalTitle.textContent = data.title;
        modalCategory.textContent = data.cat;
        modalLocation.textContent = data.location;
        modalDescription.textContent = data.desc;
        modalImage.src = data.img;
        modalImage.alt = data.title;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');
    }

    grid.addEventListener('click', (e) => {
        const btn = e.target.closest('.view-project-btn');
        if (!btn) return;
        openModal({
            title: btn.dataset.title,
            location: btn.dataset.location,
            cat: btn.dataset.cat,
            desc: btn.dataset.desc,
            img: btn.dataset.img
        });
    });

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    document.getElementById('modalCta').addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    /* ============================================================
       10. SERVICE CARD SPOTLIGHT
       ============================================================ */
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });

    /* ============================================================
       11. CONTACT FORM
       ============================================================ */
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            contactForm.querySelectorAll('input[required], select[required], textarea[required]').forEach(input => {
                const parent = input.parentElement;
                if (!input.checkValidity()) {
                    parent.classList.add('error');
                    isValid = false;
                } else {
                    parent.classList.remove('error');
                }
            });

            if (isValid) {
                formSuccess.classList.add('show');
                contactForm.reset();
                setTimeout(() => formSuccess.classList.remove('show'), 5000);
            }
        });
    }

    /* ============================================================
       12. SCROLL REVEAL
       ============================================================ */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));

/* ============================================================
   13. ACTIVE NAV LINK ON SCROLL (Scroll Spy)
   ============================================================ */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        // Offset for the fixed header height (84px) + a small buffer
        const scrollPos = window.scrollY + 120;
        let currentId = 'hero';

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            if (scrollPos >= top && scrollPos < bottom) {
                currentId = section.id;
            }
        });

        // If we've scrolled to the very bottom, force "contact" to active
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
            currentId = 'contact';
        }

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
        });
    }

    // Throttle with requestAnimationFrame for smoothness
    let navTicking = false;
    window.addEventListener('scroll', () => {
        if (!navTicking) {
            requestAnimationFrame(() => {
                updateActiveNav();
                navTicking = false;
            });
            navTicking = true;
        }
    }, { passive: true });

    // Also update on resize (layout changes)
    window.addEventListener('resize', updateActiveNav, { passive: true });

    // Run once on load so the correct link is active from the start
    updateActiveNav();

    /* ============================================================
       14. SERVICES IN ACTION — SLIDESHOWS
       ============================================================ */
    document.querySelectorAll('.action-card').forEach(card => {
        const slides = card.querySelectorAll('.slideshow-track img');
        const dots = card.querySelectorAll('.slideshow-dots .dot');

        if (slides.length < 2) return;

        let current = 0;
        let timer = null;
        const INTERVAL = 4000;

        const showSlide = (index) => {
            slides.forEach((img, i) => img.classList.toggle('active', i === index));
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
            current = index;
        };

        const nextSlide = () => showSlide((current + 1) % slides.length);

        const start = () => { if (!timer) timer = setInterval(nextSlide, INTERVAL); };
        const stop = () => { clearInterval(timer); timer = null; };

        showSlide(0);
        start();

        card.addEventListener('mouseenter', stop);
        card.addEventListener('mouseleave', start);

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stop();
            else start();
        });
    });

});