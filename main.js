/* Nav scroll effect */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });
nav.classList.toggle('scrolled', window.scrollY > 40);

/* Mobile nav */
const burger    = document.getElementById('burger');
const navMobile = document.getElementById('navMobile');

function openNav() {
  burger.classList.add('open');
  navMobile.classList.add('open');
  burger.setAttribute('aria-expanded', 'true');
  navMobile.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeNav() {
  burger.classList.remove('open');
  navMobile.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  navMobile.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
burger.addEventListener('click', () => {
  burger.classList.contains('open') ? closeNav() : openNav();
});

/* Menu filter */
const filterBtns = document.querySelectorAll('.filter-btn');
const menuCats   = document.querySelectorAll('.menu-category');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const f = btn.dataset.filter;
    menuCats.forEach(cat => {
      if (f === 'all' || cat.dataset.cat === f) {
        cat.classList.remove('hidden');
      } else {
        cat.classList.add('hidden');
      }
    });
  });
});

/* Mobile nav links — close on click */
document.querySelectorAll('.nav-mobile a').forEach(link => {
  link.addEventListener('click', closeNav);
});

/* Active nav link on scroll */
const navSections = document.querySelectorAll('section[id]');
const navAnchors  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });

navSections.forEach(s => sectionObserver.observe(s));

/* Scroll reveal */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
