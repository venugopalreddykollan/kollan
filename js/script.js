// Section: Navigation
// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Section: Shared Theme
// Light/dark theme toggle
const themeToggle = document.getElementById('themeToggle');

const setThemeToggleLabel = () => {
    if (!themeToggle) {
        return;
    }

    const toggleText = themeToggle.querySelector('.theme-toggle-text');
    if (!toggleText) {
        return;
    }

    const isLightTheme = document.body.classList.contains('light-theme');
    toggleText.textContent = isLightTheme ? 'Dark Mode' : 'Light Mode';
};

if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
}

setThemeToggleLabel();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        setThemeToggleLabel();
    });
}

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when nav link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Section: Contact
// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Simple validation
        if (!(name && email && message)) {
            alert('Please fill in all fields');
            return;
        }

        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    Accept: 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Unable to send message');
            }

            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
            contactForm.reset();
        } catch (error) {
            alert('Something went wrong while sending your message. Please try again.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

// Section: Navigation
// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Section: Home
// Interactive neural-network background
const initializeInteractiveNetwork = (sectionSelector, canvasSelector, options = {}) => {
    const section = document.querySelector(sectionSelector);
    const canvas = document.querySelector(canvasSelector);

    if (!section || !canvas) {
        return;
    }

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    const mouse = { x: 0, y: 0, active: false };
    let nodes = [];
    let edges = [];

    const {
        densityDivisor = 19000,
        minNodes = 55,
        maxNodes = 95,
        horizontalPaddingRatio = 0.015,
        verticalPaddingRatio = 0.04,
        hoverRadius = 150,
        maxHoveredNodes = 6,
        maxLinksPerNode = 4,
        maxLinkDistanceFactor = 0.16,
        enableHoverInteraction = true
    } = options;

    const setCanvasSize = () => {
        width = section.clientWidth;
        height = section.clientHeight;
        canvas.width = width;
        canvas.height = height;
    };

    const createNetwork = () => {
        nodes = [];
        edges = [];

        const area = width * height;
        const nodeCount = Math.min(maxNodes, Math.max(minNodes, Math.floor(area / densityDivisor)));
        const horizontalPadding = width * horizontalPaddingRatio;
        const verticalPadding = height * verticalPaddingRatio;

        for (let i = 0; i < nodeCount; i += 1) {
            nodes.push({
                id: i,
                x: horizontalPadding + Math.random() * (width - horizontalPadding * 2),
                y: verticalPadding + Math.random() * (height - verticalPadding * 2),
                radius: 1 + Math.random() * 1.2
            });
        }

        const maxLinkDistance = Math.min(180, Math.max(120, width * maxLinkDistanceFactor));
        const maxLinkDistanceSq = maxLinkDistance * maxLinkDistance;

        for (let i = 0; i < nodes.length; i += 1) {
            const source = nodes[i];
            const neighbors = [];

            for (let j = i + 1; j < nodes.length; j += 1) {
                const target = nodes[j];
                const dx = target.x - source.x;
                const dy = target.y - source.y;
                const distanceSq = dx * dx + dy * dy;

                if (distanceSq <= maxLinkDistanceSq) {
                    neighbors.push({ target, distanceSq });
                }
            }

            neighbors
                .sort((a, b) => a.distanceSq - b.distanceSq)
                .slice(0, maxLinksPerNode)
                .forEach(({ target }) => {
                    edges.push({ source, target });
                });
        }
    };

    const getHoveredNodes = () => {
        if (!enableHoverInteraction || !mouse.active) {
            return [];
        }

        return nodes
            .map(node => ({ node, distance: Math.hypot(node.x - mouse.x, node.y - mouse.y) }))
            .filter(item => item.distance < hoverRadius)
            .sort((a, b) => a.distance - b.distance)
            .slice(0, maxHoveredNodes)
            .map(item => item.node);
    };

    const drawNetwork = () => {
        ctx.clearRect(0, 0, width, height);
        const hoveredNodes = getHoveredNodes();
        const hoveredIds = new Set(hoveredNodes.map(node => node.id));

        edges.forEach(({ source, target }) => {
            if (hoveredIds.has(source.id) || hoveredIds.has(target.id)) {
                return;
            }

            const midX = (source.x + target.x) / 2;
            const midY = (source.y + target.y) / 2;
            let glow = 0;

            if (enableHoverInteraction && mouse.active) {
                const distanceToMouse = Math.hypot(midX - mouse.x, midY - mouse.y);
                glow = Math.max(0, 1 - distanceToMouse / 250);
            }

            ctx.lineWidth = 0.7 + glow * 1.2;
            ctx.strokeStyle = `rgba(${45 + glow * 120}, ${212 + glow * 25}, ${191 + glow * 20}, ${0.12 + glow * 0.45})`;
            ctx.beginPath();
            ctx.moveTo(source.x, source.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
        });

        hoveredNodes.forEach((source, index) => {
            const strength = Math.max(0.55, 1 - index * 0.12);
            ctx.lineWidth = 1 + strength * 1.1;
            ctx.strokeStyle = `rgba(125, 211, 252, ${0.2 + strength * 0.35})`;
            ctx.beginPath();
            ctx.moveTo(source.x, source.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        });

        nodes.forEach(node => {
            let glow = 0;

            if (enableHoverInteraction && mouse.active) {
                const distanceToMouse = Math.hypot(node.x - mouse.x, node.y - mouse.y);
                glow = Math.max(0, 1 - distanceToMouse / 180);
            }

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius + glow * 1.05, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${94 + glow * 120}, ${234 + glow * 15}, ${212 + glow * 5}, ${0.44 + glow * 0.3})`;
            ctx.fill();
        });
    };

    if (enableHoverInteraction) {
        section.addEventListener('mousemove', event => {
            const rect = section.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
            mouse.active = true;
            drawNetwork();
        });

        section.addEventListener('mouseleave', () => {
            mouse.active = false;
            drawNetwork();
        });
    }

    window.addEventListener('resize', () => {
        setCanvasSize();
        createNetwork();
        drawNetwork();
    });

    setCanvasSize();
    createNetwork();
    drawNetwork();
};

initializeInteractiveNetwork('.hero', '.neural-canvas', {
    densityDivisor: 19000,
    minNodes: 55,
    maxNodes: 95,
    horizontalPaddingRatio: 0.015,
    verticalPaddingRatio: 0.04,
    hoverRadius: 150,
    maxHoveredNodes: 6,
    maxLinksPerNode: 4,
    maxLinkDistanceFactor: 0.16,
    enableHoverInteraction: false
});

initializeInteractiveNetwork('.contact', '.contact-neural-canvas', {
    densityDivisor: 26000,
    minNodes: 40,
    maxNodes: 72,
    horizontalPaddingRatio: 0.02,
    verticalPaddingRatio: 0.08,
    hoverRadius: 135,
    maxHoveredNodes: 1,
    maxLinksPerNode: 3,
    maxLinkDistanceFactor: 0.14,
    enableHoverInteraction: true
});

// Section: Shared Scroll Effects
// Animate cards on scroll into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply observer to skills and projects cards
document.querySelectorAll('.skill-card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Section: Projects
// Project video interaction
document.querySelectorAll('.project-card').forEach(card => {
    const video = card.querySelector('.project-video');

    if (!video) {
        return;
    }

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const playVideo = () => {
        video.play().catch(() => {});
    };

    const pauseVideo = () => {
        video.pause();
        video.currentTime = 0;
    };

    if (canHover) {
        card.addEventListener('mouseenter', playVideo);
        card.addEventListener('mouseleave', pauseVideo);
        video.addEventListener('ended', () => {
            video.currentTime = 0;
        });
    } else {
        video.style.cursor = 'pointer';
        video.addEventListener('click', () => {
            if (video.paused) {
                playVideo();
            } else {
                pauseVideo();
            }
        });
    }
});

// Section: Navigation
// Navbar shadow on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Active nav link highlighting while scrolling
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
            link.style.borderBottom = '2px solid var(--primary-color)';
        } else {
            link.style.borderBottom = 'none';
        }
    });
});