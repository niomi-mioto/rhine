function initScrollHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    function onScroll() {
        header.classList.toggle('scrolled', window.scrollY > 0);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

function initMenu() {
    const trigger = document.querySelector('.menu-trigger');
    const menu = document.getElementById('main-menu');

    if (!trigger || !menu) return;

    function openMenu() {
        trigger.setAttribute('aria-expanded', 'true');
        trigger.setAttribute('aria-label', 'Закрыть меню');
        menu.classList.add('open');
        trigger.classList.add('is-active');
    }

    function closeMenu() {
        trigger.setAttribute('aria-expanded', 'false');
        trigger.setAttribute('aria-label', 'Открыть меню');
        menu.classList.remove('open');
        trigger.classList.remove('is-active');
    }

    trigger.addEventListener('click', () => {
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
        isOpen ? closeMenu() : openMenu();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && trigger.getAttribute('aria-expanded') === 'true') {
            closeMenu();
            trigger.focus();
        }
    });

    document.addEventListener('click', (e) => {
        if (
            trigger.getAttribute('aria-expanded') === 'true' &&
            !e.target.closest('.header')
        ) {
            closeMenu();
        }
    });

    menu.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) closeMenu();
    });
}

const ANIMATE_STEP = 0.1; // seconds

function initDetectScroll() {
    const blocks = document.querySelectorAll('.js_detectScroll');

    blocks.forEach(block => {
        const items = block.querySelectorAll('.animate-this');
        items.forEach((item, i) => {
            item.style.transitionDelay = `${(i * ANIMATE_STEP).toFixed(1)}s`;
        });
    });

    function onScroll() {
        const triggerY = window.innerHeight * (2 / 3);

        blocks.forEach(block => {
            if (block.classList.contains('visible')) return;
            const rect = block.getBoundingClientRect();
            if (rect.top <= triggerY) {
                block.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    onScroll();
}

initDetectScroll();

document.addEventListener("DOMContentLoaded", function (event) {
    initMenu();
    initScrollHeader();
    initDetectScroll();
});