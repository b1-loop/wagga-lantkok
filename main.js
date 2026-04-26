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
      cat.classList.toggle('hidden', f !== 'all' && cat.dataset.cat !== f);
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

/* Back to top */
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

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

/* ── LANGUAGE SWITCHER ───────────────────────────────────── */
const translations = {
  sv: {
    'nav-om':          'Om oss',
    'nav-oppettider':  'Öppettider',
    'nav-meny':        'Meny',
    'nav-evenemang':   'Evenemang',
    'nav-hitta':       'Hitta hit',
    'hero-h1':         'En god måltid<br />i <em>lantlig miljö</em>',
    'hero-sub':        'Vällagad mat vid Bohuskusten – där det lantliga möter det moderna.',
    'hero-btn':        'Se menyn',
    'scroll-hint':     'Scrolla',
    'announce-1':      'Öppnar <strong>2 maj 2026 kl 11:00</strong>',
    'announce-2':      'Troubadour <strong>27 jun – 8 aug · 7 datum</strong>',
    'announce-3':      'Boka: <strong><a href="tel:052331001" style="color:var(--gold-lt);text-decoration:none;">0523-31001</a></strong>',
    'feat-grill-title':'Direkt från grillen',
    'feat-grill-desc': 'Vi grillar kött och fisk med omsorg och hantverkskänsla – varje tallrik serveras med stolthet.',
    'feat-kott-title': 'Grill & Kött',
    'feat-kott-desc':  'Oxfilé, entrecôte och fläskfilé tillagade med precision.',
    'feat-raka-title': 'Räkor & Skaldjur',
    'feat-raka-desc':  'Handskalade räkor direkt från Västkusten.',
    'feat-pizza-title':'Pizza & Burgare',
    'feat-pizza-desc': 'Smashburgare och pizza inspirerade av Bohuskusten.',
    'feat-musik-title':'Livemusik',
    'feat-musik-desc': 'Troubadour under högsommaren.',
    'about-eyebrow':   'Välkommen',
    'about-h2':        'Smak av landsbygd<br />med <em style="font-style:italic;color:var(--accent)">havets närvaro</em>',
    'about-lead':      'Wägga Lantkök ligger i Johannesvik utanför Kungshamn på Bohuskusten — en plats där det lantliga möter det moderna och havet alltid finns i närheten.',
    'about-body':      'Vi är inte bara en grill. Vi är ditt smakrika strandhäng, där vågorna möter grilldoften och varje måltid serveras med omsorg och kärlek till råvarorna. Boka ett bord och upplev sommaren med oss.',
    'review-text':     'Läs recensioner på Google',
    'about-btn':       'Utforska menyn',
    'hours-eyebrow':   'Öppettider',
    'hours-h2':        'Välkommen i sommar',
    'hours-lead':      'Vi håller öppet under sommarsäsongen med mat, dryck och musik vid Bohuskusten.',
    'hours-card1-h3':  'Öppnar säsongen',
    'hours-card1-p':   'Vi öppnar dörrarna för allmänheten',
    'hours-card1-hl':  '2 maj 2026 kl 11:00',
    'hours-card2-h3':  'Öppettider',
    'hours-card2-p1':  '2 maj – 14 jun<br />Fredag–Lördag · 11:00–22:00',
    'hours-card2-p2':  '15 jun – 15 aug<br />Varje dag · 11:00–00:00',
    'hours-card3-h3':  'Boka bord',
    'hours-card3-p':   'Vi rekommenderar att boka i förväg – ring oss direkt',
    'menu-eyebrow':    'Meny',
    'menu-h2':         'Vad vi serverar',
    'menu-lead':       'Vällagad mat med råvaror från Västkusten och omgivningarna – från grillen till tallriken.',
    'filter-all':      'Alla rätter',
    'filter-forratter':'Förrätter',
    'filter-kott':     'Kött',
    'filter-burger':   'Hamburgare',
    'filter-smaker':   'Soliga Smaker',
    'filter-pizza':    'Pizza',
    'filter-efterratt':'Efterrätt',
    'filter-camping':  'Lilla Campingen',
    'burger-note':     'Alla hamburgare går att få med dubbelpuck för +40 kr',
    'ev-eyebrow':      'Evenemang',
    'ev-h2':           'Sommarens höjdpunkter',
    'ev-pizza-title':  'Pizzabuffé',
    'ev-pizza-sub':    'Varje torsdag kväll',
    'ev-pizza-desc':   'Kom som du är och ta så mycket du vill. Ett välsmakande och enkelt alternativ för hela familjen.',
    'ev-pizza-child':  'Barn under 15 år — <strong>120 kr</strong>',
    'ev-pizza-adult':  'Vuxen — <strong>185 kr</strong>',
    'ev-troub-title':  'Troubadour',
    'ev-troub-sub':    'Sommarkvällar 20:00 – 00:00',
    'ev-troub-desc':   'Livemusik under stjärnorna vid Bohuskusten. Boka bord i god tid – dessa kvällar brukar gå snabbt!',
    'ev-troub-book':   'Ring för bordsbokning: <strong><a href="tel:052331001" style="color:var(--gold-lt);text-decoration:none;">0523-31001</a></strong>',
    'ev-lineup-title': 'Spelarlista 2026',
    'ev-lineup-sub':   'Vilka spelar när',
    'lineup-d1': 'Lör 27 jun',
    'lineup-d2': 'Fre 3 jul',
    'lineup-d3': 'Lör 11 jul',
    'lineup-d4': 'Lör 18 jul',
    'lineup-d5': 'Lör 25 jul',
    'lineup-d6': 'Fre 31 jul',
    'lineup-d7': 'Lör 8 aug',
    'loc-eyebrow':     'Hitta hit',
    'loc-h2':          'Vi finns i Johannesvik',
    'loc-lead':        'Beläget på Johannesvik Camping, nära Klevekilens naturreservat och badbuktens lugna vatten.',
    'loc-addr-h4':     'Adress',
    'loc-phone-h4':    'Telefon',
    'nearby-h4':       'I närheten',
    'footer-copy':     '© 2026 Wägga Lantkök &nbsp;·&nbsp; Skapad av <a href="#" rel="noopener noreferrer" style="color:inherit;">Bozhidar Ivanov</a>',
  },
  en: {
    'nav-om':          'About',
    'nav-oppettider':  'Hours',
    'nav-meny':        'Menu',
    'nav-evenemang':   'Events',
    'nav-hitta':       'Find us',
    'hero-h1':         'A great meal<br />in a <em>rural setting</em>',
    'hero-sub':        'Great food on the Bohuslän coast – where the countryside meets the modern.',
    'hero-btn':        'See the menu',
    'scroll-hint':     'Scroll',
    'announce-1':      'Opens <strong>2 May 2026 at 11:00</strong>',
    'announce-2':      'Live music <strong>27 Jun – 8 Aug · 7 dates</strong>',
    'announce-3':      'Book: <strong><a href="tel:052331001" style="color:var(--gold-lt);text-decoration:none;">0523-31001</a></strong>',
    'feat-grill-title':'Straight from the grill',
    'feat-grill-desc': 'We grill meat and fish with care and craftsmanship – every plate is served with pride.',
    'feat-kott-title': 'Grill & Meat',
    'feat-kott-desc':  'Beef tenderloin, entrecôte and pork tenderloin cooked with precision.',
    'feat-raka-title': 'Shrimp & Seafood',
    'feat-raka-desc':  'Hand-peeled shrimp directly from the West Coast.',
    'feat-pizza-title':'Pizza & Burgers',
    'feat-pizza-desc': 'Smash burgers and pizza inspired by the Bohuslän coast.',
    'feat-musik-title':'Live music',
    'feat-musik-desc': 'Troubadour during midsummer.',
    'about-eyebrow':   'Welcome',
    'about-h2':        'Taste of the countryside<br />with <em style="font-style:italic;color:var(--accent)">the sea nearby</em>',
    'about-lead':      'Wägga Lantkök is located in Johannesvik outside Kungshamn on the Bohuslän coast — a place where the rural meets the modern and the sea is always close.',
    'about-body':      'We\'re not just a grill. We\'re your flavorful beach hangout, where the waves meet the smell of the grill and every meal is served with care. Book a table and experience the summer with us.',
    'review-text':     'Read reviews on Google',
    'about-btn':       'Explore the menu',
    'hours-eyebrow':   'Opening hours',
    'hours-h2':        'Welcome this summer',
    'hours-lead':      'We\'re open during the summer season with food, drinks and music on the Bohuslän coast.',
    'hours-card1-h3':  'Season opening',
    'hours-card1-p':   'We open our doors to the public',
    'hours-card1-hl':  '2 May 2026 at 11:00',
    'hours-card2-h3':  'Opening hours',
    'hours-card2-p1':  '2 May – 14 Jun<br />Fri–Sat · 11:00–22:00',
    'hours-card2-p2':  '15 Jun – 15 Aug<br />Every day · 11:00–00:00',
    'hours-card3-h3':  'Reserve a table',
    'hours-card3-p':   'We recommend booking in advance – call us directly',
    'menu-eyebrow':    'Menu',
    'menu-h2':         'What we serve',
    'menu-lead':       'Great food with ingredients from the West Coast and surroundings – from the grill to the plate.',
    'filter-all':      'All dishes',
    'filter-forratter':'Starters',
    'filter-kott':     'Meat',
    'filter-burger':   'Burgers',
    'filter-smaker':   'Sunny Flavours',
    'filter-pizza':    'Pizza',
    'filter-efterratt':'Dessert',
    'filter-camping':  'Little Camping',
    'burger-note':     'All burgers can be made with a double patty for +40 kr',
    'ev-eyebrow':      'Events',
    'ev-h2':           'Summer highlights',
    'ev-pizza-title':  'Pizza buffet',
    'ev-pizza-sub':    'Every Thursday evening',
    'ev-pizza-desc':   'Come as you are and eat as much as you like. A tasty and simple option for the whole family.',
    'ev-pizza-child':  'Children under 15 — <strong>120 kr</strong>',
    'ev-pizza-adult':  'Adult — <strong>185 kr</strong>',
    'ev-troub-title':  'Troubadour',
    'ev-troub-sub':    'Summer evenings 20:00 – 00:00',
    'ev-troub-desc':   'Live music under the stars on the Bohuslän coast. Book early – these evenings fill up fast!',
    'ev-troub-book':   'Call for reservations: <strong><a href="tel:052331001" style="color:var(--gold-lt);text-decoration:none;">0523-31001</a></strong>',
    'ev-lineup-title': 'Lineup 2026',
    'ev-lineup-sub':   'Who plays when',
    'lineup-d1': 'Sat 27 Jun',
    'lineup-d2': 'Fri 3 Jul',
    'lineup-d3': 'Sat 11 Jul',
    'lineup-d4': 'Sat 18 Jul',
    'lineup-d5': 'Sat 25 Jul',
    'lineup-d6': 'Fri 31 Jul',
    'lineup-d7': 'Sat 8 Aug',
    'loc-eyebrow':     'Find us',
    'loc-h2':          'We\'re in Johannesvik',
    'loc-lead':        'Located at Johannesvik Camping, near the Klevekilen nature reserve and the calm waters of the bay.',
    'loc-addr-h4':     'Address',
    'loc-phone-h4':    'Phone',
    'nearby-h4':       'Nearby',
    'footer-copy':     '© 2026 Wägga Lantkök &nbsp;·&nbsp; Created by <a href="#" rel="noopener noreferrer" style="color:inherit;">Bozhidar Ivanov</a>',
  }
};

let currentLang = 'sv';

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key] !== undefined) el.textContent = translations[lang][key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (translations[lang][key] !== undefined) el.innerHTML = translations[lang][key];
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});
