document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const sidebar   = document.getElementById('sidebar');
    const overlay   = document.getElementById('sidebarOverlay');
    const themeBtn  = document.getElementById('themeToggle');
    const navLinks  = document.querySelectorAll('.nav-menu a');

    // ── Sidebar open/close ──────────────────────────────────────────
    function openSidebar() {
        sidebar.classList.add('is-open');
        hamburger.classList.add('is-open');
        overlay.classList.add('visible');
        requestAnimationFrame(() => overlay.classList.add('active'));
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        overlay.classList.remove('active');
        overlay.addEventListener('transitionend', () => overlay.classList.remove('visible'), { once: true });
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        sidebar.classList.contains('is-open') ? closeSidebar() : openSidebar();
    });

    overlay.addEventListener('click', closeSidebar);

    // Close sidebar when a nav link is clicked on mobile
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 860) closeSidebar();
        });
    });

    // ── Active nav item on scroll ───────────────────────────────────
    const sections = ['top', 'web-admin', 'web-admin-monitoring', 'network', 'linux', 'iot'];

    function updateActiveNav() {
        const scrollY = document.querySelector('.center-panel')?.scrollTop ?? window.scrollY;
        let current = sections[0];

        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el && el.offsetTop - 80 <= scrollY) current = id;
        });

        navLinks.forEach(link => {
            const li = link.parentElement;
            li.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }

    const centerPanel = document.querySelector('.center-panel');
    if (centerPanel) {
        centerPanel.addEventListener('scroll', updateActiveNav);
    } else {
        window.addEventListener('scroll', updateActiveNav);
    }
    updateActiveNav();

    // ── Theme toggle ────────────────────────────────────────────────
    const body = document.body;

    function applyTheme(isLight) {
        body.classList.toggle('light-mode', isLight);
        themeBtn.textContent = isLight ? '🌙 Ночь' : '☀️ День';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    }

    // Restore saved preference; default to light
    const saved = localStorage.getItem('theme');
    applyTheme(saved !== 'dark');

    themeBtn.addEventListener('click', () => {
        applyTheme(!body.classList.contains('light-mode'));
    });
});
