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
function sanitizeHTML(html) {
  const allowed = ['strong', 'em', 'a', 'br', 'span'];
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const walk = (node) => {
    for (const child of [...node.childNodes]) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        if (!allowed.includes(child.tagName.toLowerCase())) {
          child.replaceWith(...child.childNodes);
        } else {
          [...child.attributes].forEach(attr => {
            if (attr.name.startsWith('on') || attr.name === 'style') child.removeAttribute(attr.name);
          });
          walk(child);
        }
      }
    }
  };
  walk(doc.body);
  return doc.body.innerHTML;
}

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
    'announce-3':      'Boka: <strong><a href="tel:052331001" class="tel-highlight">0523-31001</a></strong>',
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
    'about-h2':        'Smak av landsbygd<br />med <em class="accent-em">havets närvaro</em>',
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
    'cat-forratter':       'Förrätter & Plocka Fort',
    'cat-kott':            'Kött & Grill',
    'cat-burger':          'Hamburgare',
    'cat-smaker':          'Soliga Smaker',
    'cat-pizza':           'Pizza',
    'name-vitloksfralla':  'Vitlöksfralla',
    'name-halloumi':       'Halloumi',
    'name-wagga-fries':    'Wägga Fries',
    'name-charkbricka':    'Charkbricka <span class="menu-item-badge">Dela på 2</span>',
    'name-oxfile':         'Oxfilé <span class="menu-item-badge">200 g</span>',
    'name-entrecote':      'Entrecôte <span class="menu-item-badge">200 g</span>',
    'name-flaskfile':      'Fläskfilé',
    'name-steak-sandwich': 'Steak Sandwich',
    'name-chicken-blt':    'Chicken BLT',
    'name-cheese':         'Cheese',
    'name-waggare':        'Wäggare',
    'name-hettan':         'Hettan 🌶',
    'name-arten':          'Ärtan <span class="menu-item-badge">Vegansk</span>',
    'name-caesarsallad':   'Caesarsallad',
    'name-torskfile':      'Panerad torskfilé',
    'name-rakmacka':       'Räkmacka',
    'name-klassiker':      'Klassiker',
    'name-tropisk-vag':    'Tropisk våg',
    'name-brasan':         'Brasan',
    'name-bearnaise-bat':  'Bearnaise-båt',
    'name-havet':          'Havet är djupt',
    'name-piraten':        'Piraten',
    'name-skargard':       'Skärgård',
    'name-kompassen':      'Kompassen',
    'name-grillad-vastkust': 'Grillad västkust',
    'name-wiking':         'Wiking',
    'name-sommarbris':     'Sommarbris',
    'name-mini-puck':      'Mini Puck',
    'name-lilla-kycklingen': 'Lilla Kycklingen',
    'name-smalt-panini':   'Smält Panini',
    'name-prinsessbakelse': 'Prinsessbakelse',
    'name-lava-kaka':      'Lava Kaka <span class="menu-item-badge">Vegan · Glutenfri</span>',
    'desc-vitloksfralla':  'Skuret lantbröd fylls med färskost och toppas med vitlökssmör och persilja.',
    'desc-halloumi':       'Halloumi sticks på grillen, serveras med honungsdipp i smak av vitlök och chili.',
    'desc-wagga-fries':    'Pommes toppad med picklad rödlök, jalapeños och baconkross. Serveras med hemgjord ostsås.',
    'desc-charkbricka':    'Mild salami, parmaskinka, ölkorv, brieost, gorgonzola, cornichons, oliver, kex och fikon/aprikosmarmelad.',
    'desc-oxfile':         'Serveras med ugnsbakad potatis, morötter och sparris. Valfri sås: rödvinsås, pepparsås eller bearnaisesås.',
    'desc-entrecote':      'Serveras med ugnsbakad potatis, morötter och sparris. Valfri sås: rödvinsås, pepparsås eller bearnaisesås.',
    'desc-flaskfile':      'Serveras med ugnsbakad potatis, morötter och sparris. Valfri sås.',
    'desc-steak-sandwich': 'Grillad ryggbiff i en baguette med stekt lök, paprika, ostsås och krispig potatis.',
    'desc-chicken-blt':    'Grillad kyckling serveras mellan två toastbröd med bacon, sallad, tomat och pommes.',
    'desc-cheese-burger':  'Smashad högrevspuck på potatisbröd med dubbel cheddarost, ketchup, gul senap och picklad gurka. Serveras med krispiga pommes.',
    'desc-waggare':        'Smashad högrevspuck på potatisbröd med cheddarost, picklad rödlök, sallad och tryffelmajonäs. Serveras med krispiga pommes.',
    'desc-hettan':         'Smashad högrevspuck på potatisbröd med cheddarost, jalapeños, rödlök och chilimajonnäs. Serveras med krispiga pommes.',
    'desc-arten':          'Ärtpuck på potatisbröd med frisésallad, picklad gurka och tomatskiva. Toppas med vegansk majonnäs. Serveras med krispiga pommes.',
    'desc-caesarsallad':   'Slungad frisésallad med tomater och rödlök. Toppas med grillad kycklingfilé, krutonger, parmesanost och baconkross.',
    'desc-torskfile':      'Panerad torskfilé med delikatesspotatits och gröna ärtor. Serveras med kustens kalla dillsås.',
    'desc-rakmacka':       'Serveras på rostat lantbröd, toppad med citronmajonnäs, rucola, äggskivor, räkor och dill.',
    'desc-klassiker':      'Tomatsås, ost och skinka.',
    'desc-tropisk-vag':    'Tomatsås, ost, skinka och champinjoner eller ananas.',
    'desc-brasan':         'Tomatsås, ost, salami, honung och chiliflakes.',
    'desc-bearnaise-bat':  'Tomatsås, ost, fläskfilé, champinjoner, sparris och bearnaisesås.',
    'desc-havet':          'Tomatsås, ost, tonfisk, kräftstjärtar och räkor. Toppas med hummersås.',
    'desc-piraten':        'Tomatsås, mozzarella, tomat, salami, lufttorkad skinka, oliver, ruccola och grön pesto.',
    'desc-skargard':       'Tomatsås, ost, oxfilé, gorgonzola, mozzarella, soltorkad tomat, ruccola och grön pesto.',
    'desc-kompassen':      'Tomatsås, ost, gorgonzola, mozzarella, briéost, ruccola och balsamico.',
    'desc-grillad-vastkust': 'Tomatsås, ost, kebab, sallad, tomat, rödlök, fefferoni och kebabsås.',
    'desc-wiking':         'Tomatsås, ost, gorgonzola, champinjoner, oxfilé och bearnaisesås.',
    'desc-sommarbris':     'Crème fraiche, briéost, päron, honung, valnötter och balsamico.',
    'desc-mini-puck':      'Hamburgare med ost, senap och ketchup. Serveras med pommes.',
    'desc-lilla-kycklingen': 'Chicken nuggets serveras med pommes.',
    'desc-smalt-panini':   'Pressad toast med ost och skinka. Serveras med saltad chips.',
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
    'ev-troub-book':   'Ring för bordsbokning: <strong><a href="tel:052331001" class="tel-highlight">0523-31001</a></strong>',
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
    'footer-copy':     '© 2026 Wägga Lantkök &nbsp;·&nbsp; Skapad av <a href="#" rel="noopener noreferrer">Bozhidar Ivanov</a>',
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
    'announce-3':      'Book: <strong><a href="tel:052331001" class="tel-highlight">0523-31001</a></strong>',
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
    'about-h2':        'Taste of the countryside<br />with <em class="accent-em">the sea nearby</em>',
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
    'cat-forratter':       'Starters & Quick Bites',
    'cat-kott':            'Meat & Grill',
    'cat-burger':          'Burgers',
    'cat-smaker':          'Sunny Flavours',
    'cat-pizza':           'Pizza',
    'name-vitloksfralla':  'Garlic Roll',
    'name-halloumi':       'Halloumi',
    'name-wagga-fries':    'Wägga Fries',
    'name-charkbricka':    'Charcuterie Board <span class="menu-item-badge">Share for 2</span>',
    'name-oxfile':         'Beef Tenderloin <span class="menu-item-badge">200 g</span>',
    'name-entrecote':      'Entrecôte <span class="menu-item-badge">200 g</span>',
    'name-flaskfile':      'Pork Tenderloin',
    'name-steak-sandwich': 'Steak Sandwich',
    'name-chicken-blt':    'Chicken BLT',
    'name-cheese':         'Cheese',
    'name-waggare':        'Wäggare',
    'name-hettan':         'Hettan 🌶',
    'name-arten':          'Ärtan <span class="menu-item-badge">Vegan</span>',
    'name-caesarsallad':   'Caesar Salad',
    'name-torskfile':      'Breaded Cod',
    'name-rakmacka':       'Shrimp Toast',
    'name-klassiker':      'Classic',
    'name-tropisk-vag':    'Tropical Wave',
    'name-brasan':         'The Bonfire',
    'name-bearnaise-bat':  'Béarnaise Boat',
    'name-havet':          'The Deep Sea',
    'name-piraten':        'The Pirate',
    'name-skargard':       'Archipelago',
    'name-kompassen':      'The Compass',
    'name-grillad-vastkust': 'Grilled West Coast',
    'name-wiking':         'Viking',
    'name-sommarbris':     'Summer Breeze',
    'name-mini-puck':      'Mini Puck',
    'name-lilla-kycklingen': 'Little Chicken',
    'name-smalt-panini':   'Melted Panini',
    'name-prinsessbakelse': 'Princess Cake',
    'name-lava-kaka':      'Lava Cake <span class="menu-item-badge">Vegan · Gluten-free</span>',
    'desc-vitloksfralla':  'Country bread filled with cream cheese, topped with garlic butter and parsley.',
    'desc-halloumi':       'Grilled halloumi sticks served with honey dip flavored with garlic and chili.',
    'desc-wagga-fries':    'Fries topped with pickled red onion, jalapeños and bacon bits. Served with homemade cheese sauce.',
    'desc-charkbricka':    'Mild salami, Parma ham, beer sausage, brie, gorgonzola, cornichons, olives, crackers and fig/apricot jam.',
    'desc-oxfile':         'Served with oven-baked potato, carrots and asparagus. Choice of sauce: red wine, pepper or béarnaise.',
    'desc-entrecote':      'Served with oven-baked potato, carrots and asparagus. Choice of sauce: red wine, pepper or béarnaise.',
    'desc-flaskfile':      'Served with oven-baked potato, carrots and asparagus. Choice of sauce.',
    'desc-steak-sandwich': 'Grilled rump steak in a baguette with fried onion, pepper, cheese sauce and crispy potatoes.',
    'desc-chicken-blt':    'Grilled chicken served between two slices of toast with bacon, lettuce, tomato and fries.',
    'desc-cheese-burger':  'Smashed chuck patty on a potato bun with double cheddar, ketchup, yellow mustard and pickles. Served with crispy fries.',
    'desc-waggare':        'Smashed chuck patty on a potato bun with cheddar, pickled red onion, lettuce and truffle mayo. Served with crispy fries.',
    'desc-hettan':         'Smashed chuck patty on a potato bun with cheddar, jalapeños, red onion and chili mayo. Served with crispy fries.',
    'desc-arten':          'Pea patty on a potato bun with frisée, pickled cucumber and tomato. Topped with vegan mayo. Served with crispy fries.',
    'desc-caesarsallad':   'Tossed frisée with tomatoes and red onion. Topped with grilled chicken fillet, croutons, parmesan and bacon bits.',
    'desc-torskfile':      'Breaded cod fillet with delicatesse potatoes and green peas. Served with a cold coastal dill sauce.',
    'desc-rakmacka':       'Served on toasted country bread, topped with lemon mayo, rocket, egg slices, shrimp and dill.',
    'desc-klassiker':      'Tomato sauce, cheese and ham.',
    'desc-tropisk-vag':    'Tomato sauce, cheese, ham and mushrooms or pineapple.',
    'desc-brasan':         'Tomato sauce, cheese, salami, honey and chili flakes.',
    'desc-bearnaise-bat':  'Tomato sauce, cheese, pork tenderloin, mushrooms, asparagus and béarnaise sauce.',
    'desc-havet':          'Tomato sauce, cheese, tuna, crayfish tails and shrimp. Topped with lobster sauce.',
    'desc-piraten':        'Tomato sauce, mozzarella, tomato, salami, air-dried ham, olives, rocket and green pesto.',
    'desc-skargard':       'Tomato sauce, cheese, beef tenderloin, gorgonzola, mozzarella, sun-dried tomato, rocket and green pesto.',
    'desc-kompassen':      'Tomato sauce, cheese, gorgonzola, mozzarella, brie, rocket and balsamic.',
    'desc-grillad-vastkust': 'Tomato sauce, cheese, kebab, lettuce, tomato, red onion, pepperoni and kebab sauce.',
    'desc-wiking':         'Tomato sauce, cheese, gorgonzola, mushrooms, beef tenderloin and béarnaise sauce.',
    'desc-sommarbris':     'Crème fraîche, brie, pear, honey, walnuts and balsamic.',
    'desc-mini-puck':      'Burger with cheese, mustard and ketchup. Served with fries.',
    'desc-lilla-kycklingen': 'Chicken nuggets served with fries.',
    'desc-smalt-panini':   'Pressed toast with cheese and ham. Served with salted crisps.',
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
    'ev-troub-book':   'Call for reservations: <strong><a href="tel:052331001" class="tel-highlight">0523-31001</a></strong>',
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
    'footer-copy':     '© 2026 Wägga Lantkök &nbsp;·&nbsp; Created by <a href="#" rel="noopener noreferrer">Bozhidar Ivanov</a>',
  }
};

let currentLang = 'sv';

function setLang(lang) {
  if (lang !== 'sv' && lang !== 'en') return;
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key] !== undefined) el.textContent = translations[lang][key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (translations[lang][key] !== undefined) el.innerHTML = sanitizeHTML(translations[lang][key]);
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});
